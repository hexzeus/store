// src/lib/printful.ts

const PRINTFUL_API_KEY = process.env.NEXT_PUBLIC_PRINTFUL_API_KEY;
const PRINTFUL_API_URL = 'https://api.printful.com';

export async function fetchPrintfulProducts() {
    try {
        const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
            headers: {
                'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data.result.map((item: any) => ({
            id: item.id,
            name: item.name,
            retail_price: item.retail_price,
            image: item.thumbnail_url,
        }));
    } catch (error) {
        console.error('Error fetching Printful products:', error);
        return [];
    }
}