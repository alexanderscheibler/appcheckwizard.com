import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { ContactSubmission } from "@data/interfaces/Contact";

const supabaseUrl = process.env.SUPABASE_URL
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY

let serverSupabaseInstance: SupabaseClient | null = null

// Custom error classes for better error handling
export class SupabaseConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "SupabaseConfigurationError"
  }
}

export class SupabaseDatabaseError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = "SupabaseDatabaseError"
  }
}

/**
 * Get or create the Supabase client using the Publishable Key (singleton pattern)
 * Relies on RLS policies for security instead of service role
 */
export const getSupabaseClient = () => {
  if (serverSupabaseInstance) return serverSupabaseInstance

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new SupabaseConfigurationError("Supabase URL and Publishable Key environment variables are required")
  }

  // Initialize with the Publishable Key
  serverSupabaseInstance = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: false,
    },
  })

  return serverSupabaseInstance
}

/**
 * Insert a contact form submission into the database
 */
export async function insertContactSubmission(data: ContactSubmission) {
  const supabase = getSupabaseClient()

  const { error } = await supabase.from("contact_submissions").insert([
    {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      user_agent: data.user_agent || "unknown",
    },
  ])

  if (error) {
    console.error("Database insertion error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    })

    throw new SupabaseDatabaseError("Failed to save contact submission", { cause: error })
  }

  return { success: true }
}