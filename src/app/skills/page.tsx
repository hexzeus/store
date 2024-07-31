import Link from 'next/link';

const expertise = [
    {
        category: "Advanced Front-End Development",
        items: ["React", "Next.js", "Vue.js", "WebGL", "Progressive Web Apps", "Micro Frontends"],
    },
    {
        category: "Scalable Back-End Architecture",
        items: ["Node.js", "GraphQL", "Microservices", "Event-Driven Architecture", "Serverless Computing"],
    },
    {
        category: "Cloud & DevOps",
        items: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform", "CI/CD Pipelines"],
    },
    {
        category: "Data Engineering & Analytics",
        items: ["Big Data Processing", "Machine Learning Pipelines", "Real-time Analytics", "Data Warehousing"],
    },
    {
        category: "Emerging Technologies",
        items: ["Quantum Computing", "Blockchain", "Edge Computing", "5G Networks", "Artificial Intelligence"],
    },
];

export default function Skills() {
    return (
        <div className="space-y-20 py-12">
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
                    Technical Expertise
                </h1>
                <p className="text-lg md:text-xl text-[rgba(var(--foreground-rgb),0.8)]">
                    Mastering advanced technologies to drive innovation and efficiency.
                </p>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {expertise.map((skillSet, index) => (
                    <div key={index} className="bg-[rgba(var(--background-end-rgb),0.8)] rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-[rgba(var(--primary-color),1)]">{skillSet.category}</h2>
                        <ul className="space-y-2 md:space-y-3">
                            {skillSet.items.map((skill, skillIndex) => (
                                <li key={skillIndex} className="flex items-center text-sm md:text-base">
                                    <svg className="w-4 h-4 mr-2 text-[rgba(var(--primary-color),1)]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <section className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[rgba(var(--primary-color),1)]">Continuous Advancement</h2>
                <p className="text-lg md:text-xl mb-8 text-[rgba(var(--foreground-rgb),0.8)]">
                    Committed to staying at the forefront of technological advancements.
                </p>
                <Link href="/projects" className="inline-block px-8 py-3 bg-[rgba(var(--primary-color),0.1)] text-[rgba(var(--primary-color),1)] rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[rgba(var(--primary-color),0.2)] transition-all duration-300">
                    View Our Innovations
                </Link>
            </section>
        </div>
    );
}