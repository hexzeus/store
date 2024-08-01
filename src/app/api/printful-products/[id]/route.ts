// src/app/api/printful-products/[id]/route.ts

import { NextResponse } from 'next/server';
import printfulApi from '@/app/utils/printful';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const storeId = process.env.PRINTFUL_STORE_ID;

        if (!storeId) {
            throw new Error('PRINTFUL_STORE_ID is not set in environment variables');
        }

        const response = await printfulApi.get(`/store/products/${params.id}`, {
            params: { store_id: storeId }
        });

        return NextResponse.json(response.data.result);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}