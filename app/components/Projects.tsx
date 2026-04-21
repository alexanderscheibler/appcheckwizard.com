"use client";

import { ChevronDown } from 'lucide-react'
import Link from "next/link";
import { useState } from "react";
import { projects } from "@data/Projects";
import CustomImage from "@components/CustomImage";
import Modal from "@components/Modal";

export default function Projects() {

  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-12 text-white">What have I worked on?</h2>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          { projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-all hover:shadow-lg hover:shadow-black/40 text-left h-full"
            >
              {/* Main Clickable Area for Modal */}
              <div
                className="cursor-pointer flex-grow flex flex-col"
                onClick={() => setOpenModal(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenModal(project.id);
                  }
                }}
                aria-label={`View details for ${project.title}`}
              >
                <CustomImage
                  src={project.imgSrc}
                  alt={project.imgAlt}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover object-top group-hover:opacity-80 transition-opacity border-b border-gray-700/50"
                />

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
                  {project.description && (
                    <p className="mt-2 text-sm text-gray-300 leading-relaxed">{project.description}</p>
                  )}

                  <p className="text-gray-400 text-sm mt-auto pt-4 font-mono">Made with {project.tech}</p>
                </div>
              </div>

              {/* Card Footer for Links */}
              <div className="px-4 py-3 mt-auto flex items-center justify-between border-t border-gray-700/50 bg-gray-800/50">
                <button
                  onClick={() => setOpenModal(project.id)}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Read more
                </button>

                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()} // Prevents the modal from opening when clicking the link
                  >
                    View Source ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        { projects.map((project) => (
          <Modal
            key={project.id}
            isOpen={openModal === project.id}
            onClose={() => setOpenModal(null)}
            {...project}
          />
        ))}

        <div className="container mx-auto px-6 text-center mt-16">
          <p className="text-gray-400">Work in Progress...</p>
          <p className="text-gray-400">More projects to come!</p>
        </div>
        <div className="flex items-center justify-center">
          <Link href="#contact" aria-label="Contact" className="pt-10 inline-block animate-bounce text-gray-400 hover:text-white transition-colors">
            <ChevronDown size={32}/>
          </Link>
        </div>
      </div>
    </section>
  )
}