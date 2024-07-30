import React from 'react';

export default function Contact() {
    return (
        <div className="max-w-2xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-8 gradient-text matrix-glow">Initiate Connection</h1>

            <p className="mb-8 text-lg matrix-glow">
                I&apos;m always open to new opportunities and collaborations. Feel free to reach out!
            </p>

            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium matrix-glow">Name</label>
                    <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-[rgba(var(--primary-color),0.3)] bg-[rgba(var(--background-start-rgb),0.8)] shadow-sm focus:border-[rgba(var(--primary-color),1)] focus:ring focus:ring-[rgba(var(--primary-color),0.3)] focus:ring-opacity-50" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium matrix-glow">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-[rgba(var(--primary-color),0.3)] bg-[rgba(var(--background-start-rgb),0.8)] shadow-sm focus:border-[rgba(var(--primary-color),1)] focus:ring focus:ring-[rgba(var(--primary-color),0.3)] focus:ring-opacity-50" />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium matrix-glow">Message</label>
                    <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-[rgba(var(--primary-color),0.3)] bg-[rgba(var(--background-start-rgb),0.8)] shadow-sm focus:border-[rgba(var(--primary-color),1)] focus:ring focus:ring-[rgba(var(--primary-color),0.3)] focus:ring-opacity-50"></textarea>
                </div>

                <button type="submit" className="btn">
                    Transmit Message
                </button>
            </form>

            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4 matrix-glow">Alternative Channels</h2>
                <ul className="space-y-2">
                    <li>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="matrix-glow">
                            LinkedIn Nexus
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="matrix-glow">
                            GitHub Repository
                        </a>
                    </li>
                    <li>
                        <a href="mailto:your.email@example.com" className="matrix-glow">
                            Digital Mail: your.email@example.com
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}