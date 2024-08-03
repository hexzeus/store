'use client';
import { useState } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

function CheckoutForm() {
    const { cart, clearCart } = useCart();
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        country: '',
        zipCode: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/stripe/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: total * 100, // Amount in cents
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment intent');
            }

            const { clientSecret } = await response.json();

            if (!stripe || !elements) {
                throw new Error('Stripe has not loaded yet');
            }

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error('Card Element not found');
            }

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: formData.name,
                        email: formData.email,
                        address: {
                            line1: formData.address,
                            city: formData.city,
                            country: formData.country,
                            postal_code: formData.zipCode,
                        },
                    },
                },
            });

            if (paymentResult.error) {
                throw new Error(paymentResult.error.message || 'Payment failed');
            }

            if (paymentResult.paymentIntent?.status !== 'succeeded') {
                throw new Error('Payment not successful');
            }

            const orderResponse = await fetch('/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipient: {
                        name: formData.name,
                        email: formData.email,
                        address1: formData.address,
                        city: formData.city,
                        country_code: formData.country,
                        zip: formData.zipCode,
                    },
                    items: cart,
                }),
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }

            const { orderId } = await orderResponse.json();
            console.log('Order created:', orderId);

            clearCart();
            router.push('/order-confirmation');
        } catch (err) {
            console.error('Error submitting order:', err);
            setError('An error occurred while placing your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-6 py-20 animate-fade-in text-center">
                <h1 className="text-4xl font-bold matrix-gradient text-glow mb-10">Your Cart is Empty</h1>
                <p className="text-xl mb-8">Add some products to your cart before checking out.</p>
                <Link href="/products" className="btn-primary">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-20 animate-fade-in">
            <h1 className="text-4xl font-bold matrix-gradient text-glow mb-10">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    {cart.map((item) => (
                        <div key={item.variantId} className="flex justify-between items-center mb-2">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="text-xl font-semibold mt-4">Total: ${total.toFixed(2)}</div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-[hsl(var(--border))] rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-[hsl(var(--border))] rounded"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-[hsl(var(--border))] rounded"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-[hsl(var(--border))] rounded"
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-[hsl(var(--border))] rounded"
                    />
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-[hsl(var(--border))] rounded"
                    />
                    <div className="border border-[hsl(var(--border))] rounded p-4">
                        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const CheckoutPageWrapper = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default CheckoutPageWrapper;
