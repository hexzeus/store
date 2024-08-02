// src/app/api/cart/add/route.ts

import { NextResponse } from 'next/server';
import printfulApi from '@/app/utils/printful';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sync_variant_id, quantity } = body;

        // Fetch the product details from Printful
        const response = await printfulApi.get(`/store/variants/${sync_variant_id}`, {
            params: { store_id: process.env.PRINTFUL_STORE_ID }
        });

        const variantData = response.data.result;

        // Create a cart item
        const cartItem = {
            id: variantData.product.id,
            variantId: variantData.id,
            name: variantData.product.name,
            price: variantData.retail_price,
            image: variantData.files.find((f: any) => f.type === 'preview')?.preview_url || '',
            quantity: quantity
        };

        return NextResponse.json({ success: true, message: 'Item added to cart', item: cartItem });
    } catch (error: any) {
        console.error('Error adding item to cart:', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to add item to cart', details: error.response?.data || error.message }, { status: 500 });
    }
}