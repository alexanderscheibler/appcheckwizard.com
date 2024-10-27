import {ChevronDown} from "lucide-react";

export default function Skills() {
    const skills = [
        { name: 'Exploratory Testing', level: 95 },
        { name: 'Mobile QA (iOS/Android)', level: 90 },
        { name: 'Automated Testing', level: 75 },
        { name: 'Test Planning', level: 85 },
        { name: 'Bug Reporting', level: 92 },
        { name: 'Performance Testing', level: 80 },
    ]

    return (
        <section id="skills" className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-semibold text-center mb-12">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((skill) => (
                        <div key={skill.name}
                             className="bg-gray-700 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-semibold mb-4">{skill.name}</h3>
                            <div className="w-full bg-gray-600 rounded-full h-2.5">
                                <div
                                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                                    style={{width: `${skill.level}%`}}
                                ></div>
                            </div>
                            <p className="mt-2 text-right">{skill.level}%</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center">
                <a href="#projects" className="pt-14 inline-block animate-bounce">
                    <ChevronDown size={32}/>
                </a>
            </div>
        </section>
    )
}