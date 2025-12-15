import { getApprovedComments } from "@/utils/db/supabase"
import { PublicComment } from "@data/interfaces/Comments"
import CommentForm from "./CommentForm"

interface CommentsProps {
  postSlug: string
}

export default async function Comments({ postSlug }: CommentsProps) {
  const comments: PublicComment[] = await getApprovedComments(postSlug)

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4 pb-12">
        {!comments || comments.length === 0 ? (
          <p>This post has no comments yet. How about you start the conversation?</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="font-semibold">{comment.author_name}</span>
                <span className="text-gray-400 text-sm ml-3">
                  {new Date(comment.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>
      <hr />
      <CommentForm postSlug={postSlug} />
    </div>
  )
}