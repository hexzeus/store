// src/app/api/orders/create/route.ts

import { NextResponse } from 'next/server';
import printfulApi from '@/app/utils/printful';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { recipient, items } = body;

        const order = {
            recipient,
            items: items.map((item: any) => ({
                sync_variant_id: item.variantId,
                quantity: item.quantity,
                retail_price: item.price,
            })),
        };

        const response = await printfulApi.post('/orders', order);

        return NextResponse.json({ success: true, orderId: response.data.result.id });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}