import { NextResponse } from 'next/server';
import printfulApi from '@/app/utils/printful';

export async function GET() {
    try {
        const storeId = process.env.PRINTFUL_STORE_ID;
        if (!storeId) {
            throw new Error('PRINTFUL_STORE_ID is not set in environment variables');
        }
        const response = await printfulApi.get('/sync/products', {
            params: { store_id: storeId }
        });
        return NextResponse.json(response.data.result);
    } catch (error) {
        console.error('Error fetching sync products:', error);
        return NextResponse.json({ error: 'Failed to fetch sync products' }, { status: 500 });
    }
}