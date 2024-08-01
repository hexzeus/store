'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex flex-wrap items-center justify-between">
            <Link href="/" className="text-2xl md:text-3xl font-bold gold-gradient text-shadow-glow hover:scale-105 transition-transform duration-300">
                IVES_HUB
            </Link>
            <button
                className="lg:hidden text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:items-center mt-4 lg:mt-0`}>
                <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6">
                    <li><Link href="/" className="text-[hsl(var(--foreground))] hover:gold-gradient transition-all duration-300">Home</Link></li>
                    <li><Link href="/products" className="text-[hsl(var(--foreground))] hover:gold-gradient transition-all duration-300">Products</Link></li>
                    <li><Link href="/about" className="text-[hsl(var(--foreground))] hover:gold-gradient transition-all duration-300">About</Link></li>
                    <li><Link href="/contact" className="text-[hsl(var(--foreground))] hover:gold-gradient transition-all duration-300">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
}