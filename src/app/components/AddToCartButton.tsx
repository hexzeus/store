'use client';
import { useState } from 'react';
import { useCart } from '@/app/hooks/useCart';

interface AddToCartButtonProps {
    variantId: number | undefined;
}

export default function AddToCartButton({ variantId }: AddToCartButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        if (!variantId) return;
        setIsAdding(true);
        setError(null);
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sync_variant_id: variantId, quantity: 1 }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add to cart');
            }
            const data = await response.json();
            console.log(data.message);
            addToCart(data.item);
            // TODO: Show success message to user
        } catch (error: any) {
            console.error('Error adding to cart:', error);
            setError(error.message || 'An error occurred while adding to cart');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleAddToCart}
                disabled={isAdding || !variantId}
                className="btn-primary text-xl matrix-hover"
            >
                {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
