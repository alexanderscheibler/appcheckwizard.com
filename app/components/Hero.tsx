import { ChevronDown } from 'lucide-react'
import Link from "next/link";

export default function Hero() {
  return (
      <section id="home" className="pt-28 flex items-center justify-center min-h-[calc(100vh)] bg-gradient-to-b from-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 animate-fade-in break-words">
            AppCheckWizard
          </h1>
          <p className="text-2xl lg:text-2xl mb-8 animate-slide-in">
            Backend Developer <br />+<br /> QA Tester
          </p>
          <p className="text-base lg:text-2xl sm:text-2xl mb-12 animate-fade-in">
            Coding, testing, monitoring, and improving processes to keep your business moving forward.
            Expertise in JavaScript, Python, and Exploratory Testing for mobile applications.
          </p>
          <p className="text-base">Certified Tester Foundation Level (CTFL) by ASTQB - ISTQB in the U.S.</p>
          <Link href="#help" aria-label="Help. What can I do" className="pt-14 inline-block animate-bounce">
            <ChevronDown size={32} />
          </Link>
        </div>
      </section>
  )
}