// src/app/product/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/app/types/product';

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await fetch(`/api/printful-products/${params.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        loadProduct();
    }, [params.id]);

    if (isLoading) return <div className="text-center py-10">Loading product...</div>;
    if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
    if (!product) return <div className="text-center py-10">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-square">
                    {product.thumbnail_url ? (
                        <Image
                            src={product.thumbnail_url}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            No image
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl mb-4">
                        {product.sync_variants && product.sync_variants.length > 0
                            ? `From $${Math.min(...product.sync_variants.map(v => parseFloat(v.retail_price))).toFixed(2)}`
                            : 'Price not available'}
                    </p>
                    <p className="mb-4">{product.variants} variants available</p>
                    {/* Add more product details here */}
                </div>
            </div>
        </div>
    );
}