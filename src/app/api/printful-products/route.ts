import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiKey = process.env.PRINTFUL_API_KEY;
        const storeId = process.env.PRINTFUL_STORE_ID;

        if (!apiKey) {
            throw new Error('Printful API key is not set');
        }
        if (!storeId) {
            throw new Error('Printful Store ID is not set');
        }

        const response = await fetch(`https://api.printful.com/store/products?store_id=${storeId}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Printful API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data.result)) {
            return NextResponse.json(data.result);
        } else {
            throw new Error('Unexpected data structure from Printful API');
        }
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}