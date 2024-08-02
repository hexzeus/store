'use client';
import { useCart } from '@/app/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:py-20 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold matrix-gradient text-glow mb-6 sm:mb-10 text-center">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-xl text-[hsl(var(--muted-foreground))] text-center">Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-6">
                        {cart.map((item) => (
                            <div key={item.variantId} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 py-4 border-b border-[hsl(var(--border))]">
                                <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-sm" />
                                <div className="flex-grow text-center sm:text-left">
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-[hsl(var(--muted-foreground))]">${item.price}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                                        className="btn-secondary w-10 h-10"
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl w-10 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                        className="btn-secondary w-10 h-10"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.variantId)}
                                    className="btn-secondary w-full sm:w-auto"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 sm:mt-10 text-center sm:text-right">
                        <p className="text-2xl font-semibold mb-4">Total: ${total.toFixed(2)}</p>
                        <Link href="/checkout" className="btn-primary w-full sm:w-auto inline-block">
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}