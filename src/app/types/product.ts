// src/app/types/product.ts

export interface Product {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
    sync_variants?: SyncVariant[];
}

export interface SyncVariant {
    id: number;
    sync_product_id: number;
    name: string;
    retail_price: string;
    // Add other fields as needed
}