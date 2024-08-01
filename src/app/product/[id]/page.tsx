'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    thumbnail_url: string;
    description: string;
}

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/product/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (isLoading) return <div className="text-center py-10">Loading product...</div>;
    if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
    if (!product) return <div className="text-center py-10">Product not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; Back to Products</Link>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img className="h-48 w-full object-cover md:w-48" src={product.thumbnail_url} alt={product.name} />
                    </div>
                    <div className="p-8">
                        <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{product.name}</h2>
                        <p className="mt-2 text-gray-500">{product.description}</p>
                        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300 ease-in-out">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}