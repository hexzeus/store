'use client';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/app/types/product';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await fetch('/api/printful-products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        loadProducts();
    }, []);

    if (isLoading) return <div className="text-center py-8 sm:py-12 md:py-16 animate-pulse matrix-gradient text-xl sm:text-2xl md:text-3xl">Loading digital solutions...</div>;
    if (error) return <div className="text-center py-8 sm:py-12 md:py-16 text-[hsl(var(--accent))] animate-fade-in text-lg sm:text-xl md:text-2xl">Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {products.length > 0 ? (
                products.map((product, index) => (
                    <div key={product.id} className="animate-slide-up matrix-hover" style={{ animationDelay: `${index * 0.1}s` }}>
                        <ProductCard product={product} />
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center py-8 sm:py-12 md:py-16 animate-fade-in text-[hsl(var(--muted-foreground))] text-lg sm:text-xl md:text-2xl">No digital solutions found in the Matrix.</div>
            )}
        </div>
    );
}