import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { type, data } = body;

    if (type === 'product_synced') {
        console.log('New product synced:', data.sync_product);
        // Implement your logic here (e.g., update database, send notifications)
    }

    return NextResponse.json({ received: true });
}