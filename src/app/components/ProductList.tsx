'use client';

import { useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    thumbnail_url: string;
}

async function fetchPrintfulProducts() {
    try {
        const response = await fetch('/api/printful-products');
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API response not OK:', response.status, errorText);
            throw new Error(`Failed to fetch products: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            setIsLoading(true);
            try {
                const fetchedProducts = await fetchPrintfulProducts();
                if (Array.isArray(fetchedProducts)) {
                    setProducts(fetchedProducts);
                } else {
                    throw new Error('Fetched data is not an array');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        loadProducts();
    }, []);

    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg">
                        <img src={product.thumbnail_url} alt={product.name} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                    </div>
                ))
            ) : (
                <div>No products found.</div>
            )}
        </div>
    );
}