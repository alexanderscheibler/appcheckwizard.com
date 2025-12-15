import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { ContactSubmission } from "@data/interfaces/Contact";
import { CommentSubmission } from "@data/interfaces/Comments";

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

/**
 * Insert a comment into the database
 * Comments are set to 'approved: false' by default and require moderation
 */
export async function insertComment(data: CommentSubmission) {
  const supabase = getSupabaseClient()

  const { error } = await supabase.from("comments").insert([
    {
      created_at: new Date().toISOString(),
      post_slug: data.post_slug,
      author_name: data.author_name.trim(),
      author_email: data.author_email.trim().toLowerCase(),
      content: data.content.trim(),
      approved: false
    },
  ])

  if (error) {
    console.error("Database insertion error:", {
      code: error.code,
      message: error.message,
      details: error.details,
    })

    throw new SupabaseDatabaseError("Failed to save comment", error)
  }

  return { success: true }
}

/**
 * Fetch approved comments for a specific post
 * This runs server-side at build/revalidation time
 */
export async function getApprovedComments(postSlug: string): Promise<PublicComment[]> {
  const supabase = getSupabaseClient() // <-- Using the Anon Key client now

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_slug", postSlug)
    // We keep this .eq as a good practice, even though RLS strictly enforces it now
    .eq("approved", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching comments:", {
      code: error.code,
      message: error.message,
      postSlug,
    })
    return []
  }

  return data || []
}
