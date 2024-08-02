import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/types/product';

export default function ProductCard({ product }: { product: Product }) {
    const lowestPrice = product.sync_variants && product.sync_variants.length > 0
        ? Math.min(...product.sync_variants.map(v => parseFloat(v.retail_price)))
        : null;

    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="matrix-card p-4 sm:p-6 md:p-8 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-[0_0_30px_rgba(32,255,77,0.3)] h-full flex flex-col">
                <div className="relative w-full aspect-square mb-4 sm:mb-6 md:mb-8 overflow-hidden rounded-sm matrix-border flex-shrink-0">
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
                        <div className="w-full h-full bg-[hsl(var(--secondary))] flex items-center justify-center text-base sm:text-lg md:text-xl">
                            No image
                        </div>
                    )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:matrix-gradient transition duration-300 ease-in-out font-orbitron line-clamp-2">
                        {product.name}
                    </h2>
                    <div>
                        {lowestPrice !== null ? (
                            <p className="text-sm sm:text-base md:text-lg text-[hsl(var(--muted-foreground))] mb-2 sm:mb-3">
                                From ${lowestPrice.toFixed(2)}
                            </p>
                        ) : (
                            <p className="text-sm sm:text-base md:text-lg text-[hsl(var(--muted-foreground))] mb-2 sm:mb-3">
                                Price on request
                            </p>
                        )}
                        <p className="text-xs sm:text-sm md:text-base text-[hsl(var(--muted-foreground))]">
                            {product.sync_variants ? `${product.sync_variants.length} digital variants` : 'Exclusive solution'}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}