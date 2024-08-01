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

    if (isLoading) return <div className="text-center py-10 animate-pulse gold-gradient text-2xl">Loading exquisite products...</div>;
    if (error) return <div className="text-center py-10 text-[hsl(var(--accent))] animate-fade-in text-xl">Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
                products.map((product, index) => (
                    <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <ProductCard product={product} />
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center py-10 animate-fade-in text-[hsl(var(--muted-foreground))] text-xl">No premium products found.</div>
            )}
        </div>
    );
}