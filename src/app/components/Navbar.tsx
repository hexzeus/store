'use client';

import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/skills', label: 'Expertise' },
        { href: '/merch', label: 'Merch' },
        { href: '/contact', label: 'Contact', isButton: true },
    ];

    return (
        <header className="bg-[rgba(var(--background-start-rgb),0.9)] backdrop-blur-md shadow-lg">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold gradient-text">
                        IvesHub
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${item.isButton
                                        ? "btn"
                                        : "hover:text-[rgba(var(--primary-color),1)] transition-colors duration-300"
                                    } ${pathname === item.href ? 'text-[rgba(var(--primary-color),1)]' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <button
                        className="md:hidden text-[rgba(var(--foreground-rgb),1)]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden bg-[rgba(var(--background-end-rgb),0.95)] backdrop-blur-md">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block py-2 px-4 hover:bg-[rgba(var(--primary-color),0.1)] ${pathname === item.href ? 'bg-[rgba(var(--primary-color),0.1)]' : ''
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}