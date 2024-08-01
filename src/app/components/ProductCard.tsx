import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    thumbnail_url: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.id}`} className="group">
            <div className="card p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <img src={product.thumbnail_url} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                <h2 className="text-xl font-semibold group-hover:text-primary transition duration-300 ease-in-out">{product.name}</h2>
            </div>
        </Link>
    );
}