import { NextRequest, NextResponse } from 'next/server';
import printfulApi from '@/app/utils/printful';

export async function POST(req: NextRequest) {
    try {
        const { recipient, items } = await req.json();

        const order = {
            recipient,
            items: items.map((item: any) => ({
                sync_variant_id: item.variantId,
                quantity: item.quantity,
                retail_price: item.price,
            })),
        };

        const response = await printfulApi.post('/orders', order);

        return NextResponse.json({ orderId: response.data.result.id }, { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'This endpoint only accepts POST requests' }, { status: 405 });
}