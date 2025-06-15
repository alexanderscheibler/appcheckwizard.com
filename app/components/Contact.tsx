"use client"

import type React from "react"

import { useState } from "react"
import { supabase, isSupabaseAvailable } from "@utils/db/supabase"

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Check if Supabase is available
  if (!isSupabaseAvailable()) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gray-900 text-gray-100  mb-2">Contact Form</h2>
          <p className="text-red-600">
            Contact form is currently unavailable. Please check back later or contact me directly.
          </p>
        </div>
      </div>
    )
  }

  const validateForm = (data: FormData): string | null => {
    if (!data.name.trim() || data.name.length < 2) {
      return "Name must be at least 2 characters long"
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return "Please enter a valid email address"
    }
    if (!data.message.trim() || data.message.length < 10) {
      return "Message must be at least 10 characters long"
    }
    if (data.message.length > 1024) {
      return "Message must be less than 1024 characters"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const validationError = validateForm(formData)
    if (validationError) {
      setErrorMessage(validationError)
      setSubmitStatus("error")
      return
    }

    // Double-check Supabase availability before submitting
    if (!supabase) {
      setErrorMessage("Database connection is not available")
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Insert data into Supabase
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          message: formData.message.trim(),
          submitted_at: new Date().toISOString(),
          user_agent: navigator.userAgent,
        },
      ])

      if (error) {
        throw error
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error: unknown) {
      console.error("Error submitting form:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form. Please try again."
      setErrorMessage(errorMessage)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (submitStatus === "error") {
      setSubmitStatus("idle")
      setErrorMessage("")
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Contact Me</h2>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 rounded bg-gray-700"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                maxLength={100}
                disabled={isSubmitting}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded bg-gray-700"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                maxLength={255}
                disabled={isSubmitting}
                required
              />
            </div>
            <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />
            <div>
              <label htmlFor="message" className="block mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 rounded bg-gray-700"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                maxLength={1024}
                disabled={isSubmitting}
                required>
              </textarea>
            </div>
            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-800">Thank you for your message! I&apos;ll get back to you soon.</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}