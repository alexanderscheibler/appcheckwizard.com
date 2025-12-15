"use client"

import type React from "react"
import { useState } from "react"
import { submitCommentAction } from "@actions/comments"

interface CommentFormProps {
  postSlug: string
}

interface FormData {
  name: string
  email: string
  comment: string
  phone: string
}

export default function CommentForm({ postSlug }: CommentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    comment: "",
    phone: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [commentLength, setCommentLength] = useState(0)

  const validateForm = (data: FormData): string | null => {
    if (!data.name.trim() || data.name.length < 2) {
      return "Name must be at least 2 characters long"
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return "Please enter a valid email address"
    }
    if (!data.comment.trim() || data.comment.length < 10) {
      return "Comment must be at least 10 characters long"
    }
    if (data.comment.length > 1024) {
      return "Comment must be less than 1024 characters"
    }
    return null
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === "comment") {
      setCommentLength(value.length)
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (submitStatus === "error") {
      setSubmitStatus("idle")
      setErrorMessage("")
    }
  }

  async function handleSubmitComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isSubmitting) return

    // Basic Client-Side Validation
    const validationError = validateForm(formData)
    if (validationError) {
      setErrorMessage(validationError)
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    // Create FormData for server action
    const serverFormData = new FormData()
    serverFormData.append("name", formData.name)
    serverFormData.append("email", formData.email)
    serverFormData.append("comment", formData.comment)
    serverFormData.append("phone", formData.phone)
    serverFormData.append("postSlug", postSlug)

    try {
      const result = await submitCommentAction(serverFormData)

      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", comment: "", phone: "" })
        setCommentLength(0)
      } else {
        setErrorMessage(result.error || "Unable to submit your comment at this time")
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
      setErrorMessage("Unable to submit your comment at this time. Please try again later.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If successfully submitted, replace the form with a success message
  if (submitStatus === "success") {
    return (
      <div>
        <h2 className="text-2xl font-bold pt-12 mb-4">Add your comment</h2>
        <div className="mb-4 p-6 rounded bg-green-800 text-green-100">
          <p className="font-semibold mb-2">Thank you for your comment!</p>
          <p>Thank you for your thoughts! Your comment has been received and is awaiting moderation. It will appear once approved.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold pt-12 mb-4">Add your comment</h2>

      {submitStatus === "error" && (
        <div className="mb-4 p-4 rounded bg-red-800 text-red-100">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmitComment} className="mb-8 pt-4 space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded bg-gray-700"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            maxLength={100}
            disabled={isSubmitting}
            required
          />
        </div>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
        />

        <div>
          <label htmlFor="email" className="block mb-2">
            Email * <small>(will not be shared or displayed)</small>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded bg-gray-700"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            maxLength={255}
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="comment" className="block">
              Your Comment *
            </label>
            <span className="text-sm text-gray-400" aria-live="polite">
              {commentLength} / 1024
            </span>
          </div>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            className="w-full px-4 py-2 rounded bg-gray-700"
            placeholder="Your Comment"
            value={formData.comment}
            onChange={(e) => handleInputChange("comment", e.target.value)}
            maxLength={2000}
            disabled={isSubmitting}
            required
          ></textarea>
        </div>

        <small>* Denotes required field.</small>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full outline hover:bg-blue-300 hover:text-black text-white font-bold py-2 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </div>
  )
}