'use client';  // Add this at the top of the file

import { useEffect, useState } from 'react';
import ProductCard from '@/app/components/ProductCard';
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

    if (isLoading) return <div className="text-center py-24 animate-pulse matrix-gradient text-4xl">Loading products from the Matrix...</div>;
    if (error) return <div className="text-center py-24 text-[hsl(var(--accent))] animate-fade-in text-3xl">Error: {error}</div>;
    if (products.length === 0) return <div className="text-center py-24 animate-fade-in text-[hsl(var(--muted-foreground))] text-3xl">No products found in the Matrix</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}