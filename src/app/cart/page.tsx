// src/app/cart/page.tsx

'use client';
import { useCart, CartItem } from '@/app/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <div className="container mx-auto px-6 py-20 animate-fade-in">
            <h1 className="text-4xl font-bold matrix-gradient text-glow mb-10">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-xl text-[hsl(var(--muted-foreground))]">Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-8">
                        {cart.map((item) => (
                            <div key={item.variantId} className="flex items-center space-x-4 py-4 border-b border-[hsl(var(--border))]">
                                <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-sm" />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-[hsl(var(--muted-foreground))]">${item.price}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                                        className="btn-secondary"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                        className="btn-secondary"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.variantId)}
                                    className="btn-secondary"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-right">
                        <p className="text-2xl font-semibold">Total: ${total.toFixed(2)}</p>
                        <Link href="/checkout" className="btn-primary mt-4 inline-block">
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}