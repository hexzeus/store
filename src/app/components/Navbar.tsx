'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex flex-wrap items-center justify-between py-6">
            <Link href="/" className="text-3xl md:text-4xl font-bold matrix-gradient text-glow hover:scale-105 transition-transform duration-300">
                IVES_HUB
            </Link>
            <button
                className="lg:hidden text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:items-center mt-6 lg:mt-0`}>
                <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                    <li><Link href="/" className="text-xl text-[hsl(var(--foreground))] hover:matrix-gradient hover:text-glow transition-all duration-300">Home</Link></li>
                    <li><Link href="/services" className="text-xl text-[hsl(var(--foreground))] hover:matrix-gradient hover:text-glow transition-all duration-300">Services</Link></li>
                    <li><Link href="/about" className="text-xl text-[hsl(var(--foreground))] hover:matrix-gradient hover:text-glow transition-all duration-300">About</Link></li>
                    <li><Link href="/contact" className="text-xl text-[hsl(var(--foreground))] hover:matrix-gradient hover:text-glow transition-all duration-300">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
}