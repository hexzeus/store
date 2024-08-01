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

    if (isLoading) return <div className="text-center py-24 animate-pulse matrix-gradient text-4xl">Decrypting service data...</div>;
    if (error) return <div className="text-center py-24 text-[hsl(var(--accent))] animate-fade-in text-3xl">Error: {error}</div>;
    if (!product) return <div className="text-center py-24 animate-fade-in text-[hsl(var(--muted-foreground))] text-3xl">Service not found in the Matrix</div>;

    return (
        <div className="container mx-auto px-6 py-20 animate-fade-in">
            <Link href="/" className="btn-secondary mb-10 inline-block matrix-hover">← Back to Services</Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="relative aspect-square rounded-sm overflow-hidden matrix-border matrix-hover">
                    {product.thumbnail_url ? (
                        <Image
                            src={product.thumbnail_url}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="transition-transform duration-500 hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-[hsl(var(--secondary))] flex items-center justify-center text-2xl">
                            No image available
                        </div>
                    )}
                </div>
                <div className="space-y-10">
                    <h1 className="text-5xl font-bold matrix-gradient text-glow">{product.name}</h1>
                    <p className="text-4xl font-semibold text-[hsl(var(--foreground))]">
                        {product.sync_variants && product.sync_variants.length > 0
                            ? `From $${Math.min(...product.sync_variants.map(v => parseFloat(v.retail_price))).toFixed(2)}`
                            : 'Custom Pricing'}
                    </p>
                    <p className="text-2xl text-[hsl(var(--muted-foreground))]">{product.variants} service options available</p>
                    <button className="btn-primary text-xl matrix-hover">Request Quote</button>
                    <div className="matrix-card p-8 space-y-6 matrix-hover">
                        <h2 className="text-3xl font-semibold matrix-gradient">Service Details</h2>
                        <p className="text-xl text-[hsl(var(--muted-foreground))]">
                            Elevate your digital presence with our cutting-edge web development solutions.
                            Crafted with precision and innovation, this service embodies the perfect blend of
                            functionality and futuristic design.
                        </p>
                        <ul className="text-xl text-[hsl(var(--muted-foreground))] space-y-2">
                            <li className="flex items-center space-x-2">
                                <span className="text-[hsl(var(--primary))]">▶</span>
                                <span>Responsive and mobile-first design</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-[hsl(var(--primary))]">▶</span>
                                <span>SEO optimization for maximum visibility</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-[hsl(var(--primary))]">▶</span>
                                <span>Integration with cutting-edge technologies</span>
                            </li>
                            {/* Add more service features here */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}