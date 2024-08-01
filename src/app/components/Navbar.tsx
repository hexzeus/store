'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex flex-wrap items-center justify-between py-4 sm:py-5 md:py-6">
            <Link href="/" className="text-2xl sm:text-3xl md:text-4xl font-bold matrix-gradient text-glow hover:scale-105 transition-transform duration-300 font-orbitron">
                IVES HUB MERCH
            </Link>
            <button
                className="lg:hidden text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:items-center mt-4 lg:mt-0`}>
                <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                    <li><Link href="/" className="text-base sm:text-lg md:text-xl text-[hsl(var(--foreground))] hover:matrix-gradient hover:text-glow transition-all duration-300">Home</Link></li>
                    <li><Link href="/products" className="text-base sm:text-lg md:text-xl text-[hsl(var(--foreground))] hover:matrix-gradient hover:text-glow transition-all duration-300">Products</Link></li>
                    <li><Link href="/about" className="text-base sm:text-lg md:text-xl text-[hsl(var(--foreground))] hover:matrix-gradient hover:text-glow transition-all duration-300">About</Link></li>
                    <li><Link href="/contact" className="text-base sm:text-lg md:text-xl text-[hsl(var(--foreground))] hover:matrix-gradient hover:text-glow transition-all duration-300">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
}