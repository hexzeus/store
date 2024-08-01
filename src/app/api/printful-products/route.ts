import { NextResponse } from 'next/server';
import { customProducts } from '@/config/products';

interface PrintfulProduct {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
}

interface CustomProduct {
    external_id: string;
    name: string;
}

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
        const response = await fetch(`https://api.printful.com/store/products?status=all&limit=100&store_id=${storeId}`, {
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
            // Merge Printful data with custom product data
            const mergedProducts = customProducts.map((customProduct: CustomProduct) => {
                const printfulProduct = data.result.find((p: PrintfulProduct) => p.external_id === customProduct.external_id);
                return {
                    ...customProduct,
                    ...printfulProduct,
                    name: customProduct.name || printfulProduct?.name,
                };
            });
            return NextResponse.json(mergedProducts);
        } else {
            console.error('Unexpected data structure:', data);
            throw new Error('Unexpected data structure from Printful API');
        }
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}