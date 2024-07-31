'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PrintfulProduct {
    id: number;
    name: string;
    variants: {
        id: number;
        retail_price: string;
        product: {
            image: string;
        };
    }[];
}

export default function MerchPage() {
    const [products, setProducts] = useState<PrintfulProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await fetch('/api/printful-products');
                console.log('Fetch response:', response);
                if (!response.ok) {
                    throw new Error(`Failed to load products: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetch data:', data);
                setProducts(data);
            } catch (err) {
                console.error('Error loading products:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to load products. Please try again later.');
                }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center gradient-text">
                IvesHub Merchandise
            </h1>
            <p className="text-lg md:text-xl text-center mb-12">
                Wear your passion for innovation with our exclusive tech-inspired apparel.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-[rgba(var(--background-end-rgb),0.8)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative h-64">
                            <Image
                                src={product.variants[0].product.image}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-[rgba(var(--primary-color),1)] font-bold mb-4">
                                ${product.variants[0].retail_price}
                            </p>
                            <button className="w-full bg-[rgba(var(--primary-color),0.1)] text-[rgba(var(--primary-color),1)] py-2 px-4 rounded-full hover:bg-[rgba(var(--primary-color),0.2)] transition-colors duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}