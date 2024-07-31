export default function Contact() {
    return (
        <div className="max-w-2xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Connect</h1>
            <p className="mb-12 text-lg">
                For inquiries about collaborations or consultations, please reach out.
            </p>
            <form className="space-y-8">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input type="text" id="name" name="name" className="w-full" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea id="message" name="message" rows={4} className="w-full"></textarea>
                </div>
                <button type="submit" className="btn w-full">
                    Send Message
                </button>
            </form>
            <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">Professional Networks</h2>
                <ul className="space-y-4">
                    <li>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-[rgba(var(--primary-color),1)] transition-colors duration-300">
                            LinkedIn Profile
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-[rgba(var(--primary-color),1)] transition-colors duration-300">
                            GitHub Repository
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
