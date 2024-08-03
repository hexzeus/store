import { NextApiRequest, NextApiResponse } from 'next';
import printfulApi from '@/app/utils/printful';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        return;
    }

    try {
        const { recipient, items } = req.body;

        const order = {
            recipient,
            items: items.map((item: any) => ({
                sync_variant_id: item.variantId,
                quantity: item.quantity,
                retail_price: item.price,
            })),
        };

        const response = await printfulApi.post('/orders', order);

        res.status(200).json({ orderId: response.data.result.id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
