import Link from 'next/link';
import Image from 'next/image';

interface Product {
    id: string;
    external_id: string;
    name: string;
    thumbnail_url: string;
    variants?: Array<{
        name: string;
        price: string;
    }>;
}

export default function ProductCard({ product }: { product: Product }) {
    if (!product) {
        return null;
    }

    const lowestPrice = product.variants && product.variants.length > 0
        ? product.variants.reduce((min, variant) =>
            parseFloat(variant.price) < min ? parseFloat(variant.price) : min,
            parseFloat(product.variants[0].price)
        )
        : null;

    return (
        <Link href={`/product/${product.external_id}`} className="group">
            <div className="card p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <div className="relative w-full aspect-square mb-4">
                    <Image
                        src={product.thumbnail_url}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                </div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition duration-300 ease-in-out">{product.name}</h2>
                {lowestPrice !== null ? (
                    <p className="text-sm text-muted-foreground mt-2">From ${lowestPrice.toFixed(2)}</p>
                ) : (
                    <p className="text-sm text-muted-foreground mt-2">Price not available</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                    {product.variants ? `${product.variants.length} variants available` : 'No variants available'}
                </p>
            </div>
        </Link>
    );
}