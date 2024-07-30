import Image from 'next/image';

const projects = [
    {
        title: "Quantum Nexus",
        description: "A revolutionary blockchain-based social platform that redefines digital interactions.",
        image: "/quantum-nexus.jpg",
        technologies: ["React", "Solidity", "GraphQL", "Node.js"],
    },
    {
        title: "NeoSynth",
        description: "AI-powered music composition and visualization tool that transforms ideas into auditory experiences.",
        image: "/neosynth.jpg",
        technologies: ["TensorFlow.js", "Web Audio API", "Three.js", "Next.js"],
    },
    {
        title: "CyberSecure",
        description: "Advanced cybersecurity solution utilizing machine learning for real-time threat detection and prevention.",
        image: "/cybersecure.jpg",
        technologies: ["Python", "TensorFlow", "Kubernetes", "Elasticsearch"],
    },
];

export default function Projects() {
    return (
        <div className="space-y-16">
            <section className="text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text matrix-glow">
                    Digital Innovations
                </h1>
                <p className="text-xl matrix-glow">
                    Exploring the boundaries of technology to create impactful solutions.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div key={index} className="card matrix-box overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={300}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 matrix-glow">{project.title}</h3>
                            <p className="mb-4 matrix-glow">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="bg-[rgba(var(--primary-color),0.2)] text-[rgba(var(--primary-color),1)] text-xs font-semibold px-2.5 py-0.5 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}