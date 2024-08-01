import { NextResponse } from 'next/server';
import { customProducts, CustomProduct } from '@/config/products';

interface PrintfulProduct {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
}

interface MergedProduct extends PrintfulProduct {
    custom_name?: string;
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
            // Create a map of custom products for easy lookup
            const customProductMap = new Map(customProducts.map(p => [p.external_id, p]));

            // Merge Printful data with custom product data
            const mergedProducts: MergedProduct[] = data.result.map((printfulProduct: PrintfulProduct) => {
                const customProduct = customProductMap.get(printfulProduct.external_id);
                return {
                    ...printfulProduct,
                    custom_name: customProduct?.name,
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