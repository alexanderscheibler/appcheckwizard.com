import { z } from "zod"

const CommentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must not exceed 100 characters").trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(255, "Email must not exceed 255 characters")
    .trim()
    .toLowerCase(),
  content: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(2000, "Comment must not exceed 2000 characters")
    .trim(),
  postSlug: z
    .string()
    .min(1, "Post slug is required")
    .max(200, "Post slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid post slug format"),
  phone: z.string().optional(), // Honeypot field
})

export default CommentSchema
