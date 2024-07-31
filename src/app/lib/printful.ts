import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
        const PRINTFUL_API_URL = 'https://api.printful.com/store/products';

        const response = await fetch(PRINTFUL_API_URL, {
            headers: {
                'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Printful products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
