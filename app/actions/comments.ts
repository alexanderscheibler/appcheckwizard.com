"use server"

import { z } from "zod"
import { headers } from "next/headers"
import { insertComment } from "@utils/db/supabase"
import CommentSchema from "@utils/schemas/CommentSchema"

interface SubmitCommentResult {
  success: boolean
  error?: string
}

export async function submitCommentAction(formData: FormData): Promise<SubmitCommentResult> {
  try {
    const rawData = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      content: (formData.get("comment") as string) || "",
      postSlug: (formData.get("postSlug") as string) || "",
      phone: (formData.get("phone") as string) || "", // Honeypot
    }

    // Validate Data with Zod schema
    const validatedData = CommentSchema.parse(rawData)

    // Honeypot check
    if (validatedData.phone && validatedData.phone.trim() !== "") {
      console.warn("Honeypot triggered - potential bot submission")
      return { success: true } // Fake success for bots
    }

    // Get headers for basic security checks
    const headersList = await headers()
    const userAgent = headersList.get("user-agent") || "unknown"
    const origin = headersList.get("origin")

    // Origin validation
    const allowedOrigins = [
      "http://localhost:3000",
      "https://www.appcheckwizard.com",
      "https://appcheckwizard.com"
    ]

    if (origin && !allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
      console.warn("Blocked request from unauthorized origin:", origin)
      return { success: false, error: "Unauthorized origin" }
    }

    // User agent validation
    if (!userAgent || userAgent === "unknown") {
      console.warn("Blocked request - missing user agent")
      return { success: false, error: "Invalid request" }
    }

    // Save comment to database
    await insertComment({
      post_slug: validatedData.postSlug,
      author_name: validatedData.name,
      author_email: validatedData.email,
      content: validatedData.content,
      user_agent: userAgent,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors)
      return { success: false, error: "Invalid submission data" }
    }

    console.error("Unexpected error in submitCommentAction:", error)
    return { success: false, error: "Submission failed" }
  }
}