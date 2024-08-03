import { NextResponse, NextRequest } from 'next/server';
import printfulApi from '@/app/utils/printful';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const storeId = process.env.PRINTFUL_STORE_ID;

        if (!storeId) {
            throw new Error('PRINTFUL_STORE_ID is not set in environment variables');
        }

        if (!id) {
            throw new Error('Product ID is missing');
        }

        const response = await printfulApi.get(`/store/products/${id}`, {
            params: { store_id: storeId }
        });

        return NextResponse.json(response.data.result);
    } catch (error: any) {
        console.error('Error fetching product:', error);
        if (error.response && error.response.status === 404) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
