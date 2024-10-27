import {ChevronDown} from 'lucide-react'
import Link from "next/link";

export default function Projects() {

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-12">What have I worked on?</h2>
        <div className="container mx-auto px-6 text-center">
          <p>Work in Progress...</p>
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