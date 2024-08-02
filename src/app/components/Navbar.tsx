// src/app/components/Navbar.tsx

'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/app/hooks/useCart';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const { cart } = useCart();

    useEffect(() => {
        setCartItemsCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    }, [cart]);

    return (
        <nav className="flex flex-wrap items-center justify-between py-4 sm:py-5 md:py-6">
            <Link href="/" className="text-2xl sm:text-3xl md:text-4xl font-bold matrix-gradient text-glow hover:scale-105 transition-transform duration-300 font-orbitron">
                IVES_HUB MERCH
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
                    <li><Link href="/" className="nav-link">Home</Link></li>
                    <li><Link href="/products" className="nav-link">Products</Link></li>
                    <li><Link href="/about" className="nav-link">About</Link></li>
                    <li><Link href="/contact" className="nav-link">Contact</Link></li>
                    <li>
                        <Link href="/cart" className="nav-link relative">
                            Cart
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}