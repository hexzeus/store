'use client';

import { useEffect } from 'react';

export default function MobileMenu() {
    useEffect(() => {
        const toggleMenu = () => {
            const menu = document.getElementById('mobile-menu');
            menu?.classList.toggle('hidden');
        };

        const button = document.querySelector('button');
        button?.addEventListener('click', toggleMenu);

        return () => button?.removeEventListener('click', toggleMenu);
    }, []);

    return null;
}