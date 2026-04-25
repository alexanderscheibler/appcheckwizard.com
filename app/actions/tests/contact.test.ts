/**
 * Test Suite: submitContactAction (contact.ts) - AI-assisted
 *
 * Coverage:
 *  - Happy path: valid submission reaches the DB with correct sanitized data
 *  - Sanitization: name and message are sanitized; email and phone are NOT
 *  - phone is hardcoded to "" regardless of form input
 *  - user_agent is read from security headers, falls back to "unknown"
 *  - ContactSchema validation boundaries (min/max lengths, email format)
 *  - Security gating: blocked requests never reach the DB
 *  - App stability: DB errors produce a generic failure response
 */

import * as securityUtils from "@utils/functions/security";
import * as supabase from "@utils/db/supabase";
import { submitContactAction } from "@actions/contact";
import type { ActionResult } from "@data/interfaces/ActionResult"

jest.mock("@utils/functions/security", () => ({
  verifySecurityPipeline: jest.fn(),
  sanitize: jest.fn((val: string) => `sanitized_${val}`),
}));

jest.mock("@utils/db/supabase", () => ({
  insertContactSubmission: jest.fn().mockResolvedValue(undefined),
}));

// ─── Shared fixtures ────────────────────────────────────────────────────────

const passSecurity = () =>
  (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({
    pass: true,
    headersList: new Map([["user-agent", "contact-agent/1.0"]]),
  });

const validFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  fd.append("name", overrides.name ?? "Jane Doe");
  fd.append("email", overrides.email ?? "jane@example.com");
  fd.append("message", overrides.message ?? "This is a valid message body.");
  return fd;
};

// ────────────────────────────────────────────────────────────────────────────

describe("submitContactAction (contact.ts)", () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {}); // suppress debug log
    (securityUtils.sanitize as jest.Mock).mockImplementation(
      (val: string) => `sanitized_${val}`
    );
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  // ── Happy Path ────────────────────────────────────────────────────────────

  describe("Happy Path", () => {
    it("returns { success: true } for a fully valid submission", async () => {
      passSecurity();
      const result = await submitContactAction(validFormData());
      expect(result).toEqual({ success: true });
    });

    it("calls insertContactSubmission with sanitized name and message, raw email", async () => {
      passSecurity();

      await submitContactAction(
        validFormData({ name: "Jane", email: "jane@example.com", message: "Hello there, I need help." })
      );

      expect(supabase.insertContactSubmission).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "sanitized_Jane",
          message: "sanitized_Hello there, I need help.",
          email: "jane@example.com", // must NOT be sanitized
        })
      );
    });

    it("populates user_agent from security headers", async () => {
      passSecurity();
      await submitContactAction(validFormData());

      expect(supabase.insertContactSubmission).toHaveBeenCalledWith(
        expect.objectContaining({ user_agent: "contact-agent/1.0" })
      );
    });

    it("falls back to 'unknown' user_agent when the header is absent", async () => {
      (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({
        pass: true,
        headersList: new Map(), // no user-agent
      });

      await submitContactAction(validFormData());

      expect(supabase.insertContactSubmission).toHaveBeenCalledWith(
        expect.objectContaining({ user_agent: "unknown" })
      );
    });

    it("ignores any phone value appended to FormData (hardcoded to empty string in mapper)", async () => {
      passSecurity();
      const fd = validFormData();
      fd.append("phone", "+19025550100");

      await submitContactAction(fd);

      expect(supabase.insertContactSubmission).not.toHaveBeenCalledWith(
        expect.objectContaining({ phone: "+19025550100" })
      );
    });
  });

  // ── Validation Boundaries ─────────────────────────────────────────────────

  describe("Validation Boundaries", () => {
    beforeEach(() => passSecurity());

    it("rejects when name is below min length (2 chars)", async () => {
      const result = await submitContactAction(validFormData({ name: "A" }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects when name exceeds max length (100 chars)", async () => {
      const result = await submitContactAction(validFormData({ name: "A".repeat(101) }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects when message is below min length (10 chars)", async () => {
      const result = await submitContactAction(validFormData({ message: "Too short" }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects when message exceeds max length (1024 chars)", async () => {
      const result = await submitContactAction(validFormData({ message: "A".repeat(1025) }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects a malformed email address", async () => {
      const result = await submitContactAction(validFormData({ email: "not-valid" }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("rejects an email missing a domain (RFC-5322 violation)", async () => {
      const result = await submitContactAction(validFormData({ email: "user@" }));
      expect(result).toEqual({ success: false, error: "Invalid submission data" });
    });

    it("accepts boundary minimum values: name exactly 2 chars, message exactly 10 chars", async () => {
      const result = await submitContactAction(
        validFormData({ name: "Jo", message: "1234567890" })
      );
      expect(result).toEqual({ success: true });
    });

    it("does not call insertContactSubmission when validation fails", async () => {
      await submitContactAction(validFormData({ name: "A" }));
      expect(supabase.insertContactSubmission).not.toHaveBeenCalled();
    });
  });

  // ── Security Gating ───────────────────────────────────────────────────────

  describe("Security Gating", () => {
    it("returns the pipeline's response and skips the DB when security fails", async () => {
      const blockResponse = { success: false, error: "Too many requests" };
      (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({
        pass: false,
        response: blockResponse,
      });

      const result = await submitContactAction(validFormData());

      expect(result).toEqual(blockResponse);
      expect(supabase.insertContactSubmission).not.toHaveBeenCalled();
    });
  });

  // ── App Stability ─────────────────────────────────────────────────────────

  describe("App Stability", () => {
    beforeEach(() => passSecurity());

    it("returns a generic failure when insertContactSubmission throws", async () => {
      (supabase.insertContactSubmission as jest.Mock).mockRejectedValueOnce(
        new Error("SUPABASE_TIMEOUT")
      );

      const result = await submitContactAction(validFormData());

      expect(result).toEqual({
        success: false,
        error: "Submission failed. Please try again.",
      });
    });
  });
});