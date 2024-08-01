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

        console.log('Fetching products from Printful...');
        const response = await fetch(`https://api.printful.com/store/products?store_id=${storeId}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Printful API error:', errorText);
            throw new Error(`Printful API responded with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched products data:', JSON.stringify(data, null, 2));

        if (Array.isArray(data.result)) {
            return NextResponse.json(data.result);
        } else {
            console.error('Unexpected data structure:', data);
            throw new Error('Unexpected data structure from Printful API');
        }
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}