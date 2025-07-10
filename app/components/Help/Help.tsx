import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { HelpCard, HelpCardProps } from '@data/HelpCards';

const Help = ({ skills }: HelpCardProps) => {
  return (
    <section id="help" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">How can I help?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((card: HelpCard, index: number) => (
            <article data-testid={('article' + index)} key={card.title}
                 className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-300 mb-4">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Link href="#projects" aria-label="Projects. What have I done" className="pt-14 inline-block animate-bounce">
            <ChevronDown size={32}/>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Help