'use client';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface Product {
    id: string;
    name: string;
    thumbnail_url: string;
}

async function fetchPrintfulProducts() {
    const response = await fetch('/api/printful-products');
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return response.json();
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                const fetchedProducts = await fetchPrintfulProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        loadProducts();
    }, []);

    if (isLoading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="text-center py-10 text-accent">
            <p className="text-xl font-semibold">Error</p>
            <p className="mt-2">{error}</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                    <p className="text-xl font-semibold">No products found</p>
                    <p className="mt-2">Check back later for new arrivals!</p>
                </div>
            )}
        </div>
    );
}