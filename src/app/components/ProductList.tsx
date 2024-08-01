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

    if (isLoading) return <div className="text-center py-10">Loading products...</div>;
    if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="col-span-full text-center py-10">No products found.</div>
            )}
        </div>
    );
}