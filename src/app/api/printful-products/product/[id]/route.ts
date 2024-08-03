import { NextResponse } from 'next/server';
import printfulApi from '@/app/utils/printful';

export async function GET(
    { params }: { params: { id: string } }
) {
    try {
        const storeId = process.env.PRINTFUL_STORE_ID;
        if (!storeId) {
            throw new Error('PRINTFUL_STORE_ID is not set in environment variables');
        }
        const response = await printfulApi.get(`/sync/products/${params.id}`, {
            params: { store_id: storeId }
        });
        return NextResponse.json(response.data.result);
    } catch (error: any) {
        console.error('Error fetching sync product:', error);
        if (error.response && error.response.status === 404) {
            return NextResponse.json({ error: 'Sync product not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to fetch sync product' }, { status: 500 });
    }
}
