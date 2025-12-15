import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { CommentSubmission, PublicComment } from "@data/interfaces/Comments";
import { ContactSubmission } from "@data/interfaces/Contact";

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let serverSupabaseInstance: SupabaseClient | null = null

// Custom error classes for better error handling
export class SupabaseConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "SupabaseConfigurationError"
  }
}

export class SupabaseDatabaseError extends Error {
  constructor(
    message: string,
    public readonly originalError?: unknown,
  ) {
    super(message)
    this.name = "SupabaseDatabaseError"
  }
}

/**
 * Get or create the server-side Supabase client (singleton pattern)
 * Use service role key for elevated permissions
 */
export const getServerSupabase = () => {
  if (serverSupabaseInstance) {
    return serverSupabaseInstance
  }

  if (!supabaseUrl) {
    throw new SupabaseConfigurationError("SUPABASE_URL environment variable is required")
  }

  if (!supabaseServiceKey) {
    throw new SupabaseConfigurationError(
      "SUPABASE_SERVICE_ROLE_KEY environment variable is required for server operations",
    )
  }

  serverSupabaseInstance = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return serverSupabaseInstance
}

/**
 * Insert a contact form submission into the database
 */
export async function insertContactSubmission(data: ContactSubmission) {
  const serverSupabase = getServerSupabase()

  const { error } = await serverSupabase.from("contact_submissions").insert([
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

    throw new SupabaseDatabaseError("Failed to save contact submission", error)
  }

  return { success: true }
}

/**
 * Insert a comment into the database
 * Comments are set to 'approved: false' by default and require moderation
 */
export async function insertComment(data: CommentSubmission) {
  const serverSupabase = getServerSupabase()

  const { error } = await serverSupabase.from("comments").insert([
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
      hint: error.hint,
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
  const serverSupabase = getServerSupabase()

  const { data, error } = await serverSupabase
    .from("comments")
    .select("*")
    .eq("post_slug", postSlug)
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
