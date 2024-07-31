// src/pages/api/printful-products.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
        const PRINTFUL_API_URL = 'https://api.printful.com';

        const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
            headers: {
                'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching Printful products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}