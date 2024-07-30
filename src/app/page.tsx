import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="mb-6 matrix-glow">Welcome to Ives Hub</h1>
        <p className="text-xl md:text-2xl matrix-glow">Crafting digital experiences that transcend the ordinary.</p>
      </section>

      <section>
        <h2 className="mb-8 text-center">Core Competencies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"].map((skill) => (
            <div key={skill} className="card matrix-box p-6 text-center">
              <p className="font-bold text-lg matrix-glow">{skill}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Quantum Nexus", description: "A revolutionary blockchain-based social platform" },
            { title: "NeoSynth", description: "AI-powered music composition and visualization tool" },
          ].map((project, index) => (
            <div key={index} className="card matrix-box p-6">
              <h3 className="mb-4">{project.title}</h3>
              <p className="mb-4">{project.description}</p>
              <Link href="/projects" className="btn inline-block">Explore Project</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="mb-6">Ready to Innovate?</h2>
        <p className="mb-8 text-xl matrix-glow">Let's collaborate and bring your digital vision to life.</p>
        <Link href="/contact" className="btn">Initiate Contact</Link>
      </section>
    </div>
  );
}