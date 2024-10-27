import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Help() {

    const items = [
        {
            title: "Is my app always on?",
            description: "Adding monitoring and alerts so your team can catch critical issues and quickly resolve them before they affect your customers.",
        },
        {
            title: "Is my app working?",
            description: "How about we do some functional testing on the most important parts to ensure they are doing what they are supposed to be doing?",
        },
        {
            title: "Will my app keep working if I change things?",
            description: "Setting up automated tests allows you to verify that core functionality still works every time an update is made.",
        },
        {
            title: "Can my app scale as my business grows?",
            description: "Running performance tests will offer you some answers about how many users your app can safely handle.",
        },
        {
            title: "Is my data safe and secure?",
            description: "Analysis and security questionnaires tailored to your business needs, ensuring compliance with standards, including for LGPD in Brazil.",
        },
        {
            title: "What happened with my app?!",
            description: "With expertise in investigation and Root Cause Analysis (RCA), together we can identify what happened in an incident, why it happened, and the steps to prevent it in the future.",
        }
    ]

    return (
    <section id="help" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-12">How can I help?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <div key={index}
                         className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-300 mb-4">{item.description}</p>
                        </div>
                    </div>
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