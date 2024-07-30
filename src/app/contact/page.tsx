import React from 'react';

export default function Contact() {
    return (
        <div className="max-w-2xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Get in Touch</h1>

            <p className="mb-8 text-lg">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>

            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                </div>

                <button type="submit" className="btn">
                    Send Message
                </button>
            </form>

            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Other Ways to Connect</h2>
                <ul className="space-y-2">
                    <li>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="mailto:your.email@example.com" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                            your.email@example.com
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}