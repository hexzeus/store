'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
    id: string;
    external_id: string;
    name: string;
    thumbnail_url: string;
    description: string;
    variants: Array<{
        id: number;
        name: string;
        size: string;
        color: string;
        price: string;
        files: Array<{
            id: number;
            type: string;
            url: string;
        }>;
    }>;
}

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/product/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
                setSelectedVariant(data.variants[0].id);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (isLoading) return <div className="text-center py-10">Loading product...</div>;
    if (error) return <div className="text-center py-10 text-accent">Error: {error}</div>;
    if (!product) return <div className="text-center py-10">Product not found</div>;

    const selectedVariantData = product.variants.find(v => v.id === selectedVariant);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link href="/" className="text-primary hover:text-primary-foreground mb-4 inline-block">&larr; Back to Products</Link>
            <div className="bg-secondary/30 shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img className="h-48 w-full object-cover md:w-48" src={product.thumbnail_url} alt={product.name} />
                    </div>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
                        <p className="mt-2 text-muted-foreground">{product.description}</p>
                        <div className="mt-4">
                            <label htmlFor="variant" className="block text-sm font-medium text-muted-foreground">Select Variant</label>
                            <select
                                id="variant"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-muted rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                value={selectedVariant || ''}
                                onChange={(e) => setSelectedVariant(Number(e.target.value))}
                            >
                                {product.variants.map((variant) => (
                                    <option key={variant.id} value={variant.id}>
                                        {variant.name} - ${variant.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedVariantData && (
                            <div className="mt-4">
                                <p className="text-lg font-semibold text-foreground">Price: ${selectedVariantData.price}</p>
                                <p className="text-sm text-muted-foreground">Size: {selectedVariantData.size}</p>
                                <p className="text-sm text-muted-foreground">Color: {selectedVariantData.color}</p>
                            </div>
                        )}
                        <button className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition duration-300 ease-in-out">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}