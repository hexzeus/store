// src/app/product/[id]/page.tsx

'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, SyncVariant } from '@/app/types/product';
import AddToCartButton from '@/app/components/AddToCartButton';
import { useSpring, animated } from 'react-spring';

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>(undefined);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const pageAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 500 },
    });

    const imageAnimation = useSpring({
        from: { opacity: 0, transform: 'scale(0.95)' },
        to: { opacity: 1, transform: 'scale(1)' },
        config: { duration: 500 },
    });

    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await fetch(`/api/printful-products/${params.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Product = await response.json();
                setProduct(data);
                if (data.sync_variants && data.sync_variants.length > 0) {
                    setSelectedVariantId(data.sync_variants[0].id);
                    setSelectedImage(data.sync_variants[0].files.find(file => file.type === 'preview')?.preview_url || data.thumbnail_url);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        loadProduct();
    }, [params.id]);

    const handleVariantChange = (variantId: number) => {
        setSelectedVariantId(variantId);
        const selectedVariant = product?.sync_variants.find(v => v.id === variantId);
        if (selectedVariant) {
            setSelectedImage(selectedVariant.files.find(file => file.type === 'preview')?.preview_url || product?.thumbnail_url || null);
        } else {
            setSelectedImage(null);
        }
    };

    if (isLoading) return <animated.div style={pageAnimation} className="text-center py-24 animate-pulse matrix-gradient text-4xl">Loading product data...</animated.div>;
    if (error) return <animated.div style={pageAnimation} className="text-center py-24 text-[hsl(var(--accent))] animate-fade-in text-3xl">Error: {error}</animated.div>;
    if (!product) return <animated.div style={pageAnimation} className="text-center py-24 animate-fade-in text-[hsl(var(--muted-foreground))] text-3xl">Product not found</animated.div>;

    return (
        <animated.div style={pageAnimation} className="container mx-auto px-6 py-20">
            <Link href="/" className="btn-secondary mb-10 inline-block matrix-hover">← Back to Products</Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <animated.div style={imageAnimation} className="relative aspect-square rounded-sm overflow-hidden matrix-border matrix-hover">
                    {selectedImage ? (
                        <Image
                            src={selectedImage}
                            alt={`Product image of ${product.name}`}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-[hsl(var(--secondary))] flex items-center justify-center text-2xl">
                            No image available
                        </div>
                    )}
                </animated.div>
                <div className="space-y-10">
                    {product && (
                        <>
                            <animated.h1
                                style={imageAnimation}
                                className="text-5xl font-bold matrix-gradient text-glow"
                            >
                                {product.name}
                            </animated.h1>
                            <animated.p
                                style={imageAnimation}
                                className="text-4xl font-semibold text-[hsl(var(--foreground))]"
                            >
                                {product.sync_variants && product.sync_variants.length > 0
                                    ? `From $${Math.min(...product.sync_variants.map(v => parseFloat(v.retail_price))).toFixed(2)}`
                                    : 'Custom Pricing'}
                            </animated.p>
                            <animated.p
                                style={imageAnimation}
                                className="text-2xl text-[hsl(var(--muted-foreground))]"
                            >
                                {product.sync_variants?.length || 0} options available
                            </animated.p>

                            {product.sync_variants && product.sync_variants.length > 0 && (
                                <animated.div
                                    style={imageAnimation}
                                    className="w-full p-2 text-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded cyber-button-3d"
                                >
                                    <label htmlFor="variant-select" className="block text-xl mb-2">
                                        Select Option:
                                    </label>
                                    <select
                                        id="variant-select"
                                        className="w-full p-2 text-xl bg-[hsl(var(--background))] border-0 rounded"
                                        onChange={(e) => handleVariantChange(Number(e.target.value))}
                                        value={selectedVariantId}
                                    >
                                        {product.sync_variants.map((variant: SyncVariant) => (
                                            <option key={variant.id} value={variant.id}>
                                                {variant.name} - ${variant.retail_price}
                                            </option>
                                        ))}
                                    </select>
                                </animated.div>
                            )}

                            <animated.div
                                style={imageAnimation}
                                className="matrix-card p-8 space-y-6 matrix-hover"
                            >
                                <AddToCartButton productId={product.id} variantId={selectedVariantId} />
                            </animated.div>

                            <animated.div
                                style={imageAnimation}
                                className="matrix-card p-8 space-y-6 matrix-hover"
                            >
                                <h2 className="text-3xl font-semibold matrix-gradient">Product Details</h2>
                                <p className="text-xl text-[hsl(var(--muted-foreground))]">
                                    {product.description || "No description available."}
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
                            </animated.div>
                        </>
                    )}
                </div>
            </div>
        </animated.div>
    );
}