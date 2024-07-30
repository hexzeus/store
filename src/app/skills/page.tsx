const skills = [
    {
        category: "Frontend Mastery",
        items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript", "WebGL"],
    },
    {
        category: "Backend Prowess",
        items: ["Node.js", "Python", "GraphQL", "RESTful APIs", "Microservices", "Serverless"],
    },
    {
        category: "Data Management",
        items: ["MongoDB", "PostgreSQL", "Redis", "Elasticsearch", "Data Modeling", "ORM/ODM"],
    },
    {
        category: "DevOps & Cloud",
        items: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "GCP"],
    },
    {
        category: "Emerging Technologies",
        items: ["Machine Learning", "Blockchain", "IoT", "AR/VR", "Edge Computing", "Quantum Computing"],
    },
];

export default function Skills() {
    return (
        <div className="space-y-16">
            <section className="text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text matrix-glow">
                    Technological Arsenal
                </h1>
                <p className="text-xl matrix-glow">
                    Harnessing cutting-edge tools to architect the future of web development.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skills.map((skillSet, index) => (
                    <div key={index} className="card matrix-box p-6">
                        <h2 className="text-2xl font-bold mb-4 gradient-text matrix-glow">{skillSet.category}</h2>
                        <ul className="space-y-2">
                            {skillSet.items.map((skill, skillIndex) => (
                                <li key={skillIndex} className="flex items-center matrix-glow">
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
                <h2 className="text-3xl font-bold mb-6 matrix-glow">Continuous Evolution</h2>
                <p className="text-xl matrix-glow mb-8">
                    In the ever-changing landscape of technology, I&apos;m committed to constant learning and adaptation.
                </p>
                <a href="/projects" className="btn">Explore My Innovations</a>
            </section>
        </div>
    );
}