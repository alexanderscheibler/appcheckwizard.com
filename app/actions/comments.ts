"use server"

import { z } from "zod"
import { insertComment } from "@/utils/db/supabase"
import { COMMENTS_RATE_LIMIT } from "@utils/functions/security";
import { createSafeAction } from "@actions/createSafeAction";

const CommentSchema = z.object({
  post_slug: z.string().min(1),
  author_name: z.string().min(2).max(100),
  author_email: z.string().regex(z.regexes.rfc5322Email),
  content: z.string().min(10).max(1024),
  phone: z.string(),
});

export const submitCommentAction = createSafeAction(
  CommentSchema,
  COMMENTS_RATE_LIMIT,
  "comment",
  "Invalid submission data",
  ["author_name", "content"], // Only sanitize these two
  (fd) => ({
    post_slug: (fd.get("post_slug") as string) ?? "",
    author_name: (fd.get("name") as string) ?? "",
    author_email: (fd.get("email") as string) ?? "",
    content: (fd.get("comment") as string) ?? "",
    phone: "",
  }),
  async (data, security) => {
    await insertComment({
      ...data,
      user_agent: security.headersList.get("user-agent") ?? "unknown",
    });
    return { success: true };
  }
);