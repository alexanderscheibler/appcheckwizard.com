import { z } from "zod";
import { verifySecurityPipeline, sanitize, RateLimitConfig } from "@utils/functions/security";

type ActionLogic<T, R> = (data: T, security: any) => Promise<R>;

// A proper Type Guard to satisfy the compiler
function isString(val: unknown): val is string {
  return typeof val === "string";
}

export function createSafeAction<Schema extends z.ZodTypeAny, Result>(
  schema: Schema,
  rateLimit: RateLimitConfig,
  actionType: string,
  validationErrorMessage: string,
  // Which keys need sanitization
  fieldsToSanitize: Array<keyof z.infer<Schema>>,
  // Mapper to handle the custom FormData-to-Schema keys
  mapFormData: (formData: FormData) => Record<string, unknown>,
  logic: ActionLogic<z.infer<Schema>, Result>
) {
  return async (formData: FormData) => {
    try {
      // 1. Run the security checks
      const security = await verifySecurityPipeline(formData, actionType, rateLimit);

      // 2. If it failed any check, return the specific abort response immediately
      if (!security.pass) return security.response;

      // 3. Schema validation
      const rawData = mapFormData(formData);
      const validatedData = schema.parse(rawData);

      // Clone to avoid mutating the original parsed object directly
      const safeData = Object.assign({}, validatedData) as z.infer<Schema>;

      // Use a Record view for the mutation to avoid the 'typeof' narrowing error
      const mutableData = safeData as Record<string, unknown>;

      fieldsToSanitize.forEach((key) => {
        const k = key as string;
        const value = mutableData[k];

        if (isString(value)) {
          mutableData[k] = sanitize(value);
        }
      });

      // Final check: We MUST check mutableData (the safe, sanitized version)
      const allSanitizedPresent = fieldsToSanitize.every(key => {
        const val = mutableData[key as string]; // Use mutableData here!
        return typeof val === "string" && val.trim().length > 0;
      });

      if (!allSanitizedPresent) {
        return { success: false, error: validationErrorMessage };
      }

      return await logic(safeData, security);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const flattened = z.flattenError(error);
        console.error(`[${actionType}] Validation error:`, flattened.fieldErrors);
        return { success: false, error: validationErrorMessage };
      }
      console.error(`[${actionType}] Unexpected error:`, error);
      return { success: false, error: "Submission failed. Please try again." };
    }
  };
}