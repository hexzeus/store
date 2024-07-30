import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="text-center">
        <h1 className="mb-6 text-5xl md:text-7xl font-bold gradient-text">IvesHub</h1>
        <p className="text-xl md:text-2xl">Crafting sophisticated digital solutions for the modern era.</p>
      </section>
      <section>
        <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold">Core Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "AWS"].map((tech) => (
            <div key={tech} className="card p-6 text-center">
              <p className="font-bold text-lg">{tech}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title: "Quantum Analytics Platform", description: "Advanced data analysis using quantum computing principles" },
            { title: "Neural Interface System", description: "Bridging human cognition with AI for enhanced productivity" },
          ].map((project, index) => (
            <div key={index} className="card p-8">
              <h3 className="mb-4 text-2xl font-bold">{project.title}</h3>
              <p className="mb-6">{project.description}</p>
              <Link href="/projects" className="btn">View Details</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center">
        <h2 className="mb-6 text-3xl md:text-4xl font-bold">Ready to Innovate?</h2>
        <p className="mb-8 text-xl">Let's collaborate on your next groundbreaking project.</p>
        <Link href="/contact" className="btn">Initiate Consultation</Link>
      </section>
    </div>
  );
}