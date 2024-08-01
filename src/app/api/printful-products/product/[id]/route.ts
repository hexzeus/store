import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const apiKey = process.env.PRINTFUL_API_KEY;
        const storeId = process.env.PRINTFUL_STORE_ID;

        if (!apiKey) {
            throw new Error('Printful API key is not set');
        }

        if (!storeId) {
            throw new Error('Printful Store ID is not set');
        }

        if (!id) {
            return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
        }

        console.log(`Fetching product with ID: ${id}`);

        const response = await fetch(`https://api.printful.com/store/products/${id}?store_id=${storeId}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (response.status === 404) {
            console.log(`Product with ID ${id} not found`);
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Printful API error:', errorText);
            throw new Error(`Printful API responded with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched product data:', JSON.stringify(data, null, 2));

        return NextResponse.json(data.result);
    } catch (error: unknown) {
        console.error('Error in API route:', error);

        let errorMessage: string;
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else {
            errorMessage = 'An unknown error occurred';
        }

        return NextResponse.json({ error: 'Failed to fetch product', details: errorMessage }, { status: 500 });
    }
}