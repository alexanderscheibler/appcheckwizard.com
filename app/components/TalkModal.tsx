"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, MonitorPlay, Video } from "lucide-react";
import type { Talk } from "@data/talks/talks";

interface TalkModalProps {
  talk: Talk;
  isOpen: boolean;
  onClose: () => void;
}

export default function TalkModal({ talk, isOpen, onClose }: TalkModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Panel — stop click propagation so clicking inside doesn't close */}
      <div
        className="relative bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-6 pt-5">
          {/* Event + date */}
          <p className="text-sm text-gray-300 mb-1">
            {talk.event}{talk.date ? ` · ${talk.date}` : ""}
          </p>

          {/* Title */}
          <h2 className="text-xl font-semibold text-white mb-4 pr-6">
            {talk.title}
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {talk.long_description}
          </p>

          <div className="pb-2">
            {talk.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={talk.slidesUrl}
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <MonitorPlay size={16} />
              View Slides
            </Link>

            {talk.videoUrl && (
              <a
                href={talk.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Video size={16} />
                Watch Video
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}