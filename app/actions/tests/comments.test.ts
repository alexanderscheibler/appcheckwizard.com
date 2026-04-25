/**
 * Test Suite: submitCommentAction (comments.ts) - AI-assisted
 *
 * Coverage:
 *  - Happy path: valid comment reaches the DB with correctly mapped and sanitized data
 *  - Field aliasing: mapper reads "name"→author_name, "email"→author_email, "comment"→content
 *    These are regression-guarded explicitly because using the wrong form key silently
 *    sends empty strings to the DB — a latent footgun.
 *  - Sanitization: author_name and content are sanitized; author_email and phone are NOT
 *  - phone is hardcoded to "" regardless of form input
 *  - user_agent is read from security headers, falls back to "unknown"
 *  - CommentSchema validation boundaries (min/max lengths, email format, post_slug required)
 *  - Security gating: blocked requests never reach the DB
 *  - App stability: DB errors produce a generic failure response
 */

import * as securityUtils from "@utils/functions/security";
import * as supabase from "@utils/db/supabase";
import { submitCommentAction } from "@actions/comments";
import type { ActionResult } from "@data/interfaces/ActionResult"

jest.mock("@utils/functions/security", () => ({
  verifySecurityPipeline: jest.fn(),
  sanitize: jest.fn((val: string) => `sanitized_${val}`),
}));

jest.mock("@utils/db/supabase", () => ({
  insertComment: jest.fn().mockResolvedValue(undefined),
}));

// ─── Shared fixtures ────────────────────────────────────────────────────────

const passSecurity = () =>
  (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({
    pass: true,
    headersList: new Map([["user-agent", "comment-agent/1.0"]]),
  });

/**
 * Field names here match what the MAPPER reads from FormData, not the schema keys:
 *   "name"    → author_name
 *   "email"   → author_email
 *   "comment" → content
 */
const validFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  fd.append("post_slug", overrides.post_slug ?? "my-first-post");
  fd.append("name", overrides.name ?? "Bob Smith");
  fd.append("email", overrides.email ?? "bob@example.com");
  fd.append("comment", overrides.comment ?? "This is a great and insightful article!");
  return fd;
};

// ────────────────────────────────────────────────────────────────────────────

describe("submitCommentAction (comments.ts)", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    (securityUtils.sanitize as jest.Mock).mockImplementation(
      (val: string) => `sanitized_${val}`
    );
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  // ── Happy Path ────────────────────────────────────────────────────────────

  describe("Happy Path", () => {
    it("returns { success: true } for a fully valid comment submission", async () => {
      passSecurity();
      const result = await submitCommentAction(validFormData());
      expect(result).toEqual({ success: true });
    });

    it("calls insertComment with sanitized author_name and content, raw author_email", async () => {
      passSecurity();

      await submitCommentAction(
        validFormData({ name: "Bob", email: "bob@example.com", comment: "Nice article indeed!" })
      );

      expect(supabase.insertComment).toHaveBeenCalledWith(
        expect.objectContaining({
          author_name: "sanitized_Bob",
          content: "sanitized_Nice article indeed!",
          author_email: "bob@example.com", // must NOT be sanitized
        })
      );
    });

    it("populates user_agent from security headers", async () => {
      passSecurity();
      await submitCommentAction(validFormData());

      expect(supabase.insertComment).toHaveBeenCalledWith(
        expect.objectContaining({ user_agent: "comment-agent/1.0" })
      );
    });

    it("falls back to 'unknown' user_agent when the header is absent", async () => {
      (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({
        pass: true,
        headersList: new Map(),
      });

      await submitCommentAction(validFormData());

      expect(supabase.insertComment).toHaveBeenCalledWith(
        expect.objectContaining({ user_agent: "unknown" })
      );
    });

    it("always sends phone as empty string, ignoring any value in FormData", async () => {
      passSecurity();
      const fd = validFormData();
      fd.append("phone", "+15551234567");

      await submitCommentAction(fd);

      expect(supabase.insertComment).toHaveBeenCalledWith(
        expect.objectContaining({ phone: "" })
      );
      expect(supabase.insertComment).not.toHaveBeenCalledWith(
        expect.objectContaining({ phone: "+15551234567" })
      );
    });
  });

  // ── Field Aliasing Regression Guard ──────────────────────────────────────
  //
  // The mapper uses non-obvious field names (e.g. fd.get("comment") for the
  // `content` schema field). These tests document and protect that contract so
  // a form refactor that renames fields silently breaks tests rather than
  // silently sending empty strings to the database.

  describe("Field Aliasing Regression Guard", () => {
    beforeEach(() => passSecurity());

    it("fails validation when form sends 'author_name' instead of 'name'", async () => {
      const fd = new FormData();
      fd.append("post_slug", "test");
      fd.append("author_name", "Alice"); // ← wrong key; mapper reads fd.get("name")
      fd.append("email", "alice@example.com");
      fd.append("comment", "A sufficiently long comment here.");

      const result = await submitCommentAction(fd);

      // mapper produces author_name: "" → fails schema min(2)
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
      expect(supabase.insertComment).not.toHaveBeenCalled();
    });

    it("fails validation when form sends 'content' instead of 'comment'", async () => {
      const fd = new FormData();
      fd.append("post_slug", "test");
      fd.append("name", "Alice");
      fd.append("email", "alice@example.com");
      fd.append("content", "This looks right but uses the wrong key."); // ← wrong key

      const result = await submitCommentAction(fd);

      // mapper produces content: "" → fails schema min(10)
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
      expect(supabase.insertComment).not.toHaveBeenCalled();
    });
  });

  // ── Validation Boundaries ─────────────────────────────────────────────────

  describe("Validation Boundaries", () => {
    beforeEach(() => passSecurity());

    it("rejects when author_name is below min length (2 chars)", async () => {
      const result = await submitCommentAction(validFormData({ name: "X" }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects when author_name exceeds max length (100 chars)", async () => {
      const result = await submitCommentAction(validFormData({ name: "A".repeat(101) }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects when comment (content) is below min length (10 chars)", async () => {
      const result = await submitCommentAction(validFormData({ comment: "Short" }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects when comment (content) exceeds max length (1024 chars)", async () => {
      const result = await submitCommentAction(validFormData({ comment: "A".repeat(1025) }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects a malformed author_email", async () => {
      const result = await submitCommentAction(validFormData({ email: "bad-email" }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects when post_slug is empty", async () => {
      const result = await submitCommentAction(validFormData({ post_slug: "" }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("accepts boundary minimum values: name 2 chars, comment exactly 10 chars", async () => {
      const result = await submitCommentAction(
        validFormData({ name: "Bo", comment: "1234567890" })
      );
      expect(result).toEqual({ success: true });
    });

    it("does not call insertComment when validation fails", async () => {
      await submitCommentAction(validFormData({ name: "X" }));
      expect(supabase.insertComment).not.toHaveBeenCalled();
    });
  });

  // ── Security Gating ───────────────────────────────────────────────────────

  describe("Security Gating", () => {
    it("returns the pipeline's response and skips the DB when security fails", async () => {
      const blockResponse = { success: false, error: "Spam detected" };
      (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({
        pass: false,
        response: blockResponse,
      });

      const result = await submitCommentAction(validFormData());

      expect(result).toEqual(blockResponse);
      expect(supabase.insertComment).not.toHaveBeenCalled();
    });
  });

  // ── App Stability ─────────────────────────────────────────────────────────

  describe("App Stability", () => {
    beforeEach(() => passSecurity());

    it("returns a generic failure when insertComment throws", async () => {
      (supabase.insertComment as jest.Mock).mockRejectedValueOnce(
        new Error("FOREIGN_KEY_VIOLATION")
      );

      const result = await submitCommentAction(validFormData());

      expect(result).toEqual({
        success: false,
        error: "Submission failed. Please try again.",
      });
    });
  });
});