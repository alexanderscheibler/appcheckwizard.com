'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Comment {
  id: string
  author_name: string
  content: string
  created_at: string
}

interface CommentsProps {
  postSlug: string
}

export default function Comments({ postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '', phone: ''})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [postSlug])

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_slug', postSlug)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching comments:', error)
    } else {
      setComments(data || [])
    }
  }

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    if (newComment.phone.trim() != '') {
      setNewComment({phone: '', name: '', email: '', content: '' })
      setIsSubmitting(false)
      return;
    }

    const { error } = await supabase.from('comments').insert({
      post_slug: postSlug,
      author_name: newComment.name,
      author_email: newComment.email,
      content: newComment.content,
    })

    if (error) {
      console.error('Error inserting comment:', error)
      alert('Failed to submit comment. Please try again.')
    } else {
      setNewComment({phone: "", name: '', email: '', content: '' })
      fetchComments()
    }

    setIsSubmitting(false)
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4 pb-12">
        { !comments || comments.length == 0 ?
          <p>This post has no comments yet. How about you start the conversation?</p>
          : ""
        }
        { comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="font-semibold">{comment.author_name}</span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <hr/>
      <h2 className="text-2xl font-bold pt-12 mb-4">Add your comment</h2>
      <form onSubmit={handleSubmitComment} className="mb-8 pt-4 space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">Name *</label>
          <input type="text"
                 id="name"
                 name="name"
                 placeholder="Your Name"
                 value={newComment.name}
                 onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                 className="w-full px-4 py-2 rounded bg-gray-700"
                 autoComplete="name"
                 required/>
        </div>
        <input type="text" name="phone" className="hidden" value={newComment.phone}
               onChange={(e) => setNewComment({...newComment, phone: e.target.value})}/>
        <div>
          <label htmlFor="email" className="block mb-2">Email * <small>(will not be shared or displayed)</small></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={newComment.email}
            className="w-full px-4 py-2 rounded bg-gray-700"
            autoComplete="email"
            onChange={(e) => setNewComment({...newComment, email: e.target.value})}
            required/>
        </div>
        <div>
          <label htmlFor="message" className="block mb-2">Comment *</label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            className="w-full px-4 py-2 rounded bg-gray-700"
            placeholder="Your Comment"
            value={newComment.content}
            onChange={(e) => setNewComment({...newComment, content: e.target.value})}
            required></textarea>
        </div>
        <small>* Denotes required field.</small>
        <button type="submit"
                disabled={isSubmitting}
                className="w-full outline hover:bg-blue-300 hover:text-black text-white font-bold py-2 px-4 transition-colors">
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  )
}