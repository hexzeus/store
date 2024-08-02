'use client';
import { useState } from 'react';

interface AddToCartButtonProps {
    productId: number;  // Changed from string to number
    variantId: number | undefined;
}

export default function AddToCartButton({ productId, variantId }: AddToCartButtonProps) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        if (!variantId) return;
        setIsAdding(true);
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sync_variant_id: variantId, quantity: 1 }),
            });
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            const data = await response.json();
            console.log(data.message);
            // TODO: Update UI to show item added to cart
        } catch (error) {
            console.error('Error adding to cart:', error);
            // TODO: Show error message to user
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding || !variantId}
            className="btn-primary"
        >
            {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
    );
}