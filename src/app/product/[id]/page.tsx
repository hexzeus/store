// src/app/product/[id]/page.tsx

'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/types/product';
import AddToCartButton from '@/app/components/AddToCartButton';

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>(undefined);

    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await fetch(`/api/printful-products/${params.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
                if (data.sync_variants && data.sync_variants.length > 0) {
                    setSelectedVariantId(data.sync_variants[0].id);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        loadProduct();
    }, [params.id]);

    if (isLoading) return <div className="text-center py-24 animate-pulse matrix-gradient text-4xl">Loading product data...</div>;
    if (error) return <div className="text-center py-24 text-[hsl(var(--accent))] animate-fade-in text-3xl">Error: {error}</div>;
    if (!product) return <div className="text-center py-24 animate-fade-in text-[hsl(var(--muted-foreground))] text-3xl">Product not found</div>;

    const productImage = product.sync_variants[0]?.files.find(file => file.type === 'preview')?.preview_url || product.thumbnail_url;

    return (
        <div className="container mx-auto px-6 py-20 animate-fade-in">
            <Link href="/product" className="btn-secondary mb-10 inline-block matrix-hover">← Back to Products</Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="relative aspect-square rounded-sm overflow-hidden matrix-border matrix-hover">
                    {productImage ? (
                        <Image
                            src={productImage}
                            alt={`Product image of ${product.name}`}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
                    <p className="text-2xl text-[hsl(var(--muted-foreground))]">{product.sync_variants?.length || 0} options available</p>

                    {product.sync_variants && product.sync_variants.length > 0 && (
                        <div>
                            <label htmlFor="variant-select" className="block text-xl mb-2">Select Option:</label>
                            <select
                                id="variant-select"
                                className="w-full p-2 text-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded"
                                onChange={(e) => setSelectedVariantId(Number(e.target.value))}
                                value={selectedVariantId}
                            >
                                {product.sync_variants.map((variant) => (
                                    <option key={variant.id} value={variant.id}>
                                        {variant.name} - ${variant.retail_price}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <AddToCartButton productId={product.id} variantId={selectedVariantId} />

                    <div className="matrix-card p-8 space-y-6 matrix-hover">
                        <h2 className="text-3xl font-semibold matrix-gradient">Product Details</h2>
                        <p className="text-xl text-[hsl(var(--muted-foreground))]">
                            Show off your love for cutting-edge web design with our exclusive IVES_HUB MERCH.
                            Each item is crafted with the same attention to detail and innovation that we bring to our digital creations.
                        </p>
                        <ul className="text-xl text-[hsl(var(--muted-foreground))] space-y-2">
                            <li className="flex items-center space-x-2">
                                <span className="text-[hsl(var(--primary))]">▶</span>
                                <span>High-quality, durable materials</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-[hsl(var(--primary))]">▶</span>
                                <span>Unique, eye-catching designs</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-[hsl(var(--primary))]">▶</span>
                                <span>Comfortable fit for all-day wear</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}