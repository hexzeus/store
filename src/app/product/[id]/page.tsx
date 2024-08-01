'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/types/product';

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await fetch(`/api/printful-products/${params.id}`);
                if (response.status === 404) {
                    setError('Product not found');
                } else if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    const data = await response.json();
                    setProduct(data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        loadProduct();
    }, [params.id]);

    if (isLoading) return <div className="text-center py-20 animate-pulse gold-gradient text-3xl">Loading exquisite product...</div>;
    if (error) return <div className="text-center py-20 text-[hsl(var(--accent))] animate-fade-in text-2xl">Error: {error}</div>;
    if (!product) return <div className="text-center py-20 animate-fade-in text-[hsl(var(--muted-foreground))] text-2xl">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
            <Link href="/" className="btn-secondary mb-8 inline-block">← Back to Products</Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(var(--gold),0.3)] luxury-border">
                    {product.thumbnail_url ? (
                        <Image
                            src={product.thumbnail_url}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="transition-transform duration-300 hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-[hsl(var(--secondary))] flex items-center justify-center">
                            No image available
                        </div>
                    )}
                </div>
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold gold-gradient text-shadow-lg">{product.name}</h1>
                    <p className="text-3xl font-semibold text-[hsl(var(--foreground))]">
                        {product.sync_variants && product.sync_variants.length > 0
                            ? `From $${Math.min(...product.sync_variants.map(v => parseFloat(v.retail_price))).toFixed(2)}`
                            : 'Price on request'}
                    </p>
                    <p className="text-xl text-[hsl(var(--muted-foreground))]">{product.variants} exclusive variants available</p>
                    <button className="btn-primary gold-gradient text-lg">Add to Cart</button>
                    <div className="card luxury-border p-6 space-y-4">
                        <h2 className="text-2xl font-semibold gold-gradient">Product Details</h2>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Indulge in luxury with this exquisite piece. Crafted with the utmost attention to detail,
                            this product embodies sophistication and style.
                        </p>
                        {/* Add more product details here */}
                    </div>
                </div>
            </div>
        </div>
    );
}