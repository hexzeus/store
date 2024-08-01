import { NextResponse } from 'next/server';
import printfulApi from '@/app/utils/printful';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const response = await printfulApi.get(`/sync/products/${id}`);
        return NextResponse.json(response.data.result);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}