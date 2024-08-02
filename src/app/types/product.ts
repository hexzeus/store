// src/app/types/product.ts

export interface Product {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
    sync_product: {
        id: number;
        external_id: string;
        name: string;
        variants: number;
        synced: number;
        thumbnail_url: string;
        is_ignored: boolean;
    };
    sync_variants: Array<{
        id: number;
        external_id: string;
        sync_product_id: number;
        name: string;
        synced: boolean;
        variant_id: number;
        retail_price: string;
        sku: string;
        currency: string;
        product: {
            variant_id: number;
            product_id: number;
            image: string;
            name: string;
        };
        files: Array<{
            id: number;
            type: string;
            hash: string;
            url: string;
            filename: string;
            mime_type: string;
            size: number;
            width: number;
            height: number;
            dpi: number | null;
            status: string;
            created: number;
            thumbnail_url: string;
            preview_url: string;
            visible: boolean;
        }>;
    }>;
}