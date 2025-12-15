// Restrict what is being sent to the client - no sensitive data
export interface PublicComment {
  id: string
  author_name: string
  content: string
  created_at: string
}

export interface CommentSubmission {
  post_slug: string
  author_name: string
  author_email: string
  content: string
  user_agent?: string
}