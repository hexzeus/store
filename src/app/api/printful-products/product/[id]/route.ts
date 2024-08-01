import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const apiKey = process.env.PRINTFUL_API_KEY;
        const { id } = params;

        if (!apiKey) {
            throw new Error('Printful API key is not set');
        }

        const response = await fetch(`https://api.printful.com/store/products/${id}`, {
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
        console.log('Fetched product data:', data);
        return NextResponse.json(data.result);
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}