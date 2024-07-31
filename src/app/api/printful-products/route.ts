import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        console.log('API route hit');
        const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
        console.log('Printful API Key:', PRINTFUL_API_KEY);  // Log the API key
        const PRINTFUL_API_URL = 'https://api.printful.com/store/products';

        if (!PRINTFUL_API_KEY) {
            console.error('Printful API key is missing');
            return NextResponse.json({ error: 'Printful API key is missing' }, { status: 500 });
        }

        console.log('Fetching products from Printful');
        const response = await axios.get(PRINTFUL_API_URL, {
            headers: {
                'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
            },
        });

        console.log('Printful response status:', response.status);
        if (response.status !== 200) {
            console.error('Failed to fetch products:', response.statusText);
            return NextResponse.json({ error: 'Failed to fetch products' }, { status: response.status });
        }

        const data = response.data;
        console.log('Fetched products:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Printful products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
