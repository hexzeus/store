// src/app/merch/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    retail_price: string;
    image: string;
}

export default function MerchPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await fetch('/api/printful-products');
                const data = await response.json();
                setProducts(
                    data.result.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        retail_price: item.retail_price,
                        image: item.thumbnail_url,
                    }))
                );
            } catch (err) {
                setError('Failed to load products. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
        loadProducts();
    }, []);

    if (isLoading) {
        return <div className="text-center py-20">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Your existing code for rendering the products */}
        </div>
    );
}