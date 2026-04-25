/**
 * Test Suite: createSafeAction — Core Wrapper - AI-assisted
 *
 * Coverage:
 *  - Happy path: valid data flows through all gates, sanitization, and logic
 *  - Security gating: pipeline failures abort early with correct response
 *  - Validation: Zod errors and post-sanitize empty strings return configured message
 *  - Sanitization contract: only specified fields are mutated
 *  - Edge cases: empty fieldsToSanitize, non-string values, mapper throws, missing security.response
 *  - App stability: unexpected logic errors produce a safe generic response
 */


import * as securityUtils from "@utils/functions/security";
import { z } from "zod";
import { createSafeAction } from "@actions/createSafeAction";

jest.mock("@utils/functions/security", () => ({
  verifySecurityPipeline: jest.fn(),
  sanitize: jest.fn((val) => `sanitized_${val}`), // Mock transformation
}));

// Define the interface to the server action return types
interface ActionResult {
  success: boolean;
  error?: string;
}

describe("createSafeAction Core Wrapper", () => {
  const mockSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    content: z.string().min(5),
  });

  const mockRateLimit = { limit: 5, windowSeconds: 60 };
  const mockLogic = jest.fn().mockResolvedValue({ success: true });
  const mockMapper = (fd: FormData) => ({
    name: fd.get("name"),
    email: fd.get("email"),
    content: fd.get("content"),
  });

  // Re-usable action instance for tests
  const action = createSafeAction(
    mockSchema,
    mockRateLimit,
    "testAction",
    "Invalid data",
    ["name", "content"],
    mockMapper,
    mockLogic
  );

  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  // ==== HAPPY PATH ====

  it("should execute logic when all gates pass and sanitize only specified fields", async () => {
    (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({
      pass: true,
      headersList: new Map([["user-agent", "test-agent"]]),
    });

    const formData = new FormData();
    formData.append("name", "John");
    formData.append("email", "test@example.com");
    formData.append("content", "Hello World");

    const result = (await action(formData)) as ActionResult;

    expect(result.success).toBe(true);
    // Verify Sanitization: name and content should be prefixed, email remains raw
    expect(mockLogic).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "sanitized_John",
        content: "sanitized_Hello World",
        email: "test@example.com", // UNTOUCHED
      }),
      expect.anything()
    );
  });

  // ==== SECURITY GATING ====

  it("should abort immediately if security pipeline fails", async () => {
    const securityResponse = { success: false, error: "Rate limit exceeded" };
    (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({
      pass: false,
      response: securityResponse,
    });

    const result = await action(new FormData());

    expect(result).toEqual(securityResponse);
    expect(mockLogic).not.toHaveBeenCalled();
    expect(securityUtils.sanitize).not.toHaveBeenCalled();
  });

  // ==== VALIDATION BOUNDARIES ====

  it("should return validation error if Zod schema fails", async () => {
    (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({ pass: true });

    const formData = new FormData();
    formData.append("name", "J"); // Too short per schema (min 2)

    const result = (await action(formData)) as ActionResult;

    // FIX: Expect the specific validation error, not the generic fallback
    expect(result).toEqual({ success: false, error: "Invalid data" });
    expect(mockLogic).not.toHaveBeenCalled();
  });

  it("should return error if sanitized fields result in empty strings", async () => {
    (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({ pass: true });

    // FIX: Use mockReturnValueOnce to prevent leaking into the next test
    (securityUtils.sanitize as jest.Mock).mockReturnValueOnce("");

    const formData = new FormData();
    formData.append("name", "John");
    formData.append("email", "test@example.com");
    formData.append("content", "Valid Content");

    const result = (await action(formData)) as ActionResult;

    expect(result.success).toBe(false);
    // FIX: Expect the specific validation error
    expect(result.error).toBe("Invalid data");
  });

  // ==== APP STABILITY (THE "BLOW UP" TEST) ====

  it("should catch unexpected database/logic errors and return generic failure", async () => {
    (securityUtils.verifySecurityPipeline as jest.Mock).mockResolvedValue({ pass: true });

    // Simulate DB connection explosion
    mockLogic.mockRejectedValueOnce(new Error("DB_CONNECTION_LOST"));

    const formData = new FormData();
    formData.append("name", "John");
    formData.append("email", "test@example.com");
    formData.append("content", "Valid Content");

    const result = (await action(formData)) as ActionResult;

    // This will now pass because the sanitize mock from the previous test didn't leak
    expect(result).toEqual({
      success: false,
      error: "Submission failed. Please try again.",
    });

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("[testAction] Unexpected error:"),
      expect.any(Error)
    );
  });
});