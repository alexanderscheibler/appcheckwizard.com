"use server"

import { z } from "zod"
import { insertContactSubmission } from "@utils/db/supabase"
import { CONTACT_RATE_LIMIT } from "@utils/functions/security";
import { createSafeAction } from "./createSafeAction";

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string().regex(z.regexes.rfc5322Email, {
      message: "Please enter a valid email address"
    }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1024, "Message must be less than 1024 characters"),
  phone: z.string().optional(),
})

export interface SubmitContactResult {
  success: boolean
  error?: string
}

export const submitContactAction = createSafeAction(
  ContactSchema,
  CONTACT_RATE_LIMIT,
  "contact",
  "Invalid submission data",
  ["name", "message"], // Only sanitize these two
  (fd) => ({
    name: (fd.get("name") as string) ?? "",
    email: (fd.get("email") as string) ?? "",
    message: (fd.get("message") as string) ?? "",
    phone: "", // Hardcoded per your original logic
  }),
  async (data, security) => {
    // Preserving your specific debug log
    console.log("server function submitContactAction called");

    await insertContactSubmission({
      name: data.name,
      email: data.email,
      message: data.message,
      user_agent: security.headersList.get("user-agent") ?? "unknown",
    });

    return { success: true };
  }
);