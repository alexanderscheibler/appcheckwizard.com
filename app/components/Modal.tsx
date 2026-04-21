"use client"

import { X } from "lucide-react"
import CustomImage from "@components/CustomImage";
import { renderDescription } from "@utils/functions/textUtils";

interface Project {
  id: string
  title: string
  href: string
  imgSrc: string
  imgAlt: string
  description: string
  long_description: string
  tech: string
}

interface ModalProps extends Project {
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ isOpen, onClose, title, href, imgSrc, imgAlt, description, long_description, tech }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-lg mx-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 flex-shrink-0">
          <h4 id="modal-title" className="text-lg font-semibold text-white">
            {title}
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <CustomImage
              className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity mb-6"
              src={imgSrc}
              alt={imgAlt}
              width={600}
              height={400}
            />
          </a>

          {/* Parsed Description */}
          <div className="text-sm leading-relaxed mb-6">
            {renderDescription(long_description)}
          </div>

          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              onClick={(e) => e.stopPropagation()} // Prevents the modal from opening when clicking the link
            >
              View Source ↗
            </a>
          )}
          <p className="text-center text-gray-400 mt-4 text-sm font-mono border-t border-gray-700 pt-4">
            Made with {tech}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-700 flex-shrink-0 bg-gray-800/50 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}