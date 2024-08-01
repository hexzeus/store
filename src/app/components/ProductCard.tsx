import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/types/product';

export default function ProductCard({ product }: { product: Product }) {
    if (!product.external_id) {
        console.error('Product is missing external_id:', product);
        return null;
    }

    const lowestPrice = product.sync_variants && product.sync_variants.length > 0
        ? Math.min(...product.sync_variants.map(v => parseFloat(v.retail_price)))
        : null;

    return (
        <Link href={`/product/${product.external_id}`} className="group">
            <div className="matrix-card p-8 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-[0_0_30px_rgba(32,255,77,0.3)]">
                <div className="relative w-full aspect-square mb-8 overflow-hidden rounded-sm matrix-border">
                    {product.thumbnail_url ? (
                        <Image
                            src={product.thumbnail_url}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-[hsl(var(--secondary))] flex items-center justify-center text-xl">
                            No image
                        </div>
                    )}
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:matrix-gradient transition duration-300 ease-in-out">
                    {product.name}
                </h2>
                {lowestPrice !== null ? (
                    <p className="text-xl text-[hsl(var(--muted-foreground))] mb-3">From ${lowestPrice.toFixed(2)}</p>
                ) : (
                    <p className="text-xl text-[hsl(var(--muted-foreground))] mb-3">Price on request</p>
                )}
                <p className="text-md text-[hsl(var(--muted-foreground))]">
                    {product.variants ? `${product.variants} digital variants` : 'Exclusive solution'}
                </p>
            </div>
        </Link>
    );
}