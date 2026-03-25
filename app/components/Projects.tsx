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
        <h2 className="text-3xl font-semibold text-center mb-12">What have I worked on?</h2>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          { projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setOpenModal(project.id)}
              className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-all hover:shadow-lg hover:shadow-black/40 text-left"
            >
              <CustomImage
                src={project.imgSrc}
                alt={project.imgAlt}
                width={600}
                height={400}
                className="w-full h-48 object-cover object-top group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-white font-medium">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-1">Made with {project.tech}</p>
              </div>
            </button>
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

        <div className="container mx-auto px-6 text-center mt-12">
          <p>Work in Progress...</p>
          <p>More projects to come!</p>
        </div>
        <div className="flex items-center justify-center">
          <Link href="#contact" aria-label="Contact" className="pt-14 inline-block animate-bounce">
            <ChevronDown size={32}/>
          </Link>
        </div>
      </div>
    </section>
  )
}