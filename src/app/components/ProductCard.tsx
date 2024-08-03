import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/types/product';

export default function ProductCard({ product }: { product: Product }) {
    const price = product.sync_variants && product.sync_variants.length > 0
        ? product.sync_variants[0].retail_price
        : null;

    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="matrix-card p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-[0_0_30px_rgba(32,255,77,0.3)] h-full flex flex-col">
                <div className="relative w-full aspect-square mb-4 sm:mb-6 lg:mb-8 overflow-hidden rounded-md matrix-border flex-shrink-0">
                    {product.thumbnail_url ? (
                        <Image
                            src={product.thumbnail_url}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            quality={75}
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-[hsl(var(--secondary))] flex items-center justify-center text-base sm:text-lg lg:text-xl">
                            No image
                        </div>
                    )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 group-hover:matrix-gradient transition duration-300 ease-in-out font-orbitron line-clamp-2">
                        {product.name}
                    </h2>
                    <div>
                        <p className="text-sm sm:text-base lg:text-lg text-[hsl(var(--muted-foreground))] mb-1 sm:mb-2">
                            {price ? `$${price}` : 'Price not available'}
                        </p>
                        <p className="text-xs sm:text-sm lg:text-base text-[hsl(var(--muted-foreground))]">
                            {product.sync_variants ? `${product.sync_variants.length} options available` : 'No options available'}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
