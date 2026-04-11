"use client";

import { useState } from "react";
import { ChevronDown, Info, MonitorPlay, Video } from "lucide-react";
import Link from "next/link";
import { getTalksByYear } from "@data/talks/talks";
import type { Talk } from "@data/talks/talks";
import CustomImage from "@components/CustomImage";
import TalkModal from "@components/TalkModal";

export default function Talks() {
  const talks = getTalksByYear();
  const [activeTalk, setActiveTalk] = useState<Talk | null>(null);

  return (
    <section id="talks" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-12">Where have I spoken?</h2>

        {talks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {talks.map((talk) => (
              <div
                key={talk.id}
                className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-all hover:shadow-lg hover:shadow-black/40 flex flex-col"
              >
                {/* Thumbnail - navigates to the slides page */}
                <Link
                  href={talk.slidesUrl}
                  aria-label={`Open slides for ${talk.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CustomImage
                    src={talk.imgSrc}
                    alt={talk.imgAlt}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover object-top group-hover:opacity-80 transition-opacity"
                  />
                </Link>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-white font-medium">{talk.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{talk.event}</p>
                  {talk.date && (
                    <p className="text-gray-500 text-xs mt-1">{talk.date}</p>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {/* About — opens modal */}
                    <button
                      onClick={() => setActiveTalk(talk)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-medium rounded-lg transition-colors"
                    >
                      <Info size={13} />
                      About
                    </button>

                    {/* Slides — navigates to the presentation */}
                    <Link
                      href={talk.slidesUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <MonitorPlay size={13} />
                      Slides
                    </Link>

                    {/* Video — only shown when videoUrl is set */}
                    {talk.videoUrl && (
                      <a
                        href={talk.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-medium rounded-lg transition-colors"
                      >
                        <Video size={13} />
                        Video
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No talks yet this year — check back soon!</p>
        )}

        {/* Talk modal */}
        {activeTalk && (
          <TalkModal
            talk={activeTalk}
            isOpen={activeTalk !== null}
            onClose={() => setActiveTalk(null)}
          />
        )}

        <div className="container mx-auto px-6 text-center mt-12">
          <p>More talks to come!</p>
        </div>
        <div className="flex items-center justify-center">
          <Link href="#contact" aria-label="Contact" className="pt-14 inline-block animate-bounce">
            <ChevronDown size={32} />
          </Link>
        </div>
      </div>
    </section>
  );
}