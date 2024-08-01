import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const apiKey = process.env.PRINTFUL_API_KEY;

        if (!apiKey) {
            throw new Error('Printful API key is not set');
        }

        if (!id) {
            return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
        }

        const response = await fetch(`https://api.printful.com/store/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Printful API error:', errorText);
            return NextResponse.json({ error: `Printful API responded with status ${response.status}` }, { status: 500 });
        }

        const data = await response.json();
        console.log('Fetched product data:', data);
        return NextResponse.json(data.result);
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}