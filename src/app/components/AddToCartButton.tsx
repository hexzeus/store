'use client';
import { useState } from 'react';


interface AddToCartButtonProps {
    productId: string;
    variantId: number | null;
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
                body: JSON.stringify({ productId, variantId }),
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            // You can add a success message or update the UI here
            console.log('Added to cart successfully');
        } catch (error) {
            console.error('Error adding to cart:', error);
            // You can show an error message to the user here
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding || !variantId}
            className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition duration-300 ease-in-out disabled:opacity-50"
        >
            {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
    );
}