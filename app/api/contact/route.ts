import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { insertContactSubmission } from "@/utils/db/supabase"
import ContactFormSchema from "@utils/schemas/ContactFormSchema";

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body with Zod
    const body = await req.json()
    const validatedData = ContactFormSchema.parse(body)

    // Perform minimum verifications
    const userAgent = req.headers.get("user-agent")
    const origin = req.headers.get("origin")
    const allowedOrigins = ["http://localhost:3000", "https://www.appcheckwizard.com", "https://appcheckwizard.com"]

    if (origin && !allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
      console.warn("Blocked request from unauthorized origin:", origin)
      return NextResponse.json({ status: 403 })
    }

    if (userAgent === undefined) {
      console.warn("Blocked request from unauthorized userAgent:", userAgent)
      return NextResponse.json({ status: 403 })
    }

    // Save contact
    await insertContactSubmission({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      user_agent: userAgent || "unknown",
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Log validation errors to block bots
      console.error(`ERROR 400 submitting form:\n`, req)
      return NextResponse.json({ status: 400 })
    }

    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}