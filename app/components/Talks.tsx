import { ChevronDown } from 'lucide-react'
import Link from "next/link";
import { getTalksByYear } from "@data/talks/talks";
import CustomImage from "@components/CustomImage";

export default function Talks() {
  const talks = getTalksByYear(); // current year, no async needed

  return (
    <section id="talks" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-12">Where have I spoken?</h2>

        {talks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {talks.map((talk) => (
              <Link
                key={talk.id}
                href={talk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-all hover:shadow-lg hover:shadow-black/40"
              >
                <CustomImage
                  src={talk.imgSrc}
                  alt={talk.imgAlt}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover object-top group-hover:opacity-80 transition-opacity"
                />
                <div className="p-4">
                  <h3 className="text-white font-medium">{talk.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{talk.event}</p>
                  {talk.date && (
                    <p className="text-gray-500 text-xs mt-1">{talk.date}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No talks yet this year — check back soon!</p>
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