import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { withCors } from '@/app/lib/cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
});

async function createPaymentIntent(amount: number): Promise<string> {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: { source: 'IVES_HUB MERCH' },
    });
    return paymentIntent.client_secret as string;
}

async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'POST');
            return res.status(405).json({ error: 'Method Not Allowed' });
        }

        const { amount } = req.body;
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const clientSecret = await createPaymentIntent(amount);
        res.status(200).json({ clientSecret });
    } catch (error) {
        console.error('Error in payment intent creation:', error);
        if (error instanceof Stripe.errors.StripeError) {
            return res.status(error.statusCode || 500).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    await handleRequest(req, res);
}

export default withCors(handler);

export const config = {
    api: {
        bodyParser: true,
    },
};