// src/app/components/ProductCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/types/product';

export default function ProductCard({ product }: { product: Product }) {
    console.log('Product in ProductCard:', JSON.stringify(product, null, 2));

    if (!product.external_id) {
        console.error('Product is missing external_id:', product);
        return null;
    }

    const lowestPrice = product.sync_variants && product.sync_variants.length > 0
        ? Math.min(...product.sync_variants.map(v => parseFloat(v.retail_price)))
        : null;

    return (
        <Link href={`/product/${product.external_id}`} className="group">
            <div className="card p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <div className="relative w-full aspect-square mb-4">
                    {product.thumbnail_url ? (
                        <Image
                            src={product.thumbnail_url}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            No image
                        </div>
                    )}
                </div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition duration-300 ease-in-out">
                    {product.name}
                </h2>
                {lowestPrice !== null ? (
                    <p className="text-sm text-muted-foreground mt-2">From ${lowestPrice.toFixed(2)}</p>
                ) : (
                    <p className="text-sm text-muted-foreground mt-2">Price not available</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                    {product.variants ? `${product.variants} variants available` : 'No variants available'}
                </p>
            </div>
        </Link>
    );
}