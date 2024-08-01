import { NextResponse } from 'next/server';
import printfulApi from '@/app/utils/printful';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sync_variant_id, quantity } = body;

        // Here you would typically add the item to your cart system
        // For this example, we'll just return a success response
        return NextResponse.json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
    }
}