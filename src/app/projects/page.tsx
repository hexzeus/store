import Image from 'next/image';

const projects = [
    {
        title: "Quantum Analytics Platform",
        description: "Leveraging quantum computing for unprecedented data analysis capabilities.",
        image: "/quantum-analytics.jpg",
        technologies: ["Qiskit", "Python", "TensorFlow", "AWS Braket"],
    },
    {
        title: "Neural Interface System",
        description: "Advanced brain-computer interface for seamless human-AI collaboration.",
        image: "/neural-interface.jpg",
        technologies: ["Neuromorphic Computing", "FPGA", "C++", "TensorFlow"],
    },
    {
        title: "Distributed Ledger Protocol",
        description: "Next-generation blockchain solution for secure, scalable transactions.",
        image: "/distributed-ledger.jpg",
        technologies: ["Rust", "WebAssembly", "Zero-Knowledge Proofs", "Substrate"],
    },
];

export default function Projects() {
    return (
        <div className="space-y-20">
            <section className="text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                    Innovation Portfolio
                </h1>
                <p className="text-xl">
                    Pioneering solutions at the intersection of emerging technologies.
                </p>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {projects.map((project, index) => (
                    <div key={index} className="card overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={300}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                            <p className="mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="bg-[rgba(var(--primary-color),0.1)] text-[rgba(var(--primary-color),1)] text-xs font-semibold px-2.5 py-0.5 rounded">
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
