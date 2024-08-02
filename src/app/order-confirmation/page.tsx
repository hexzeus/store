// src/app/order-confirmation/page.tsx

import Link from 'next/link';

export default function OrderConfirmationPage() {
    return (
        <div className="container mx-auto px-6 py-20 animate-fade-in text-center">
            <h1 className="text-4xl font-bold matrix-gradient text-glow mb-10">Order Confirmed</h1>
            <p className="text-xl mb-8">Thank you for your order! We'll send you an email with the order details and tracking information once it's shipped.</p>
            <Link href="/" className="btn-primary">
                Continue Shopping
            </Link>
        </div>
    );
}