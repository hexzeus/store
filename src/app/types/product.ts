// product.types.ts
export interface PrintfulFile {
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
}

export interface SyncVariant {
    id: number;
    product_id: number;
    name: string;
    size: string;
    color: string;
    color_code: string;
    color_code2: string | null;
    image: string;
    price: string;
    in_stock: boolean;
    availability_status: string;
    retail_price: string;
    files: PrintfulFile[];
}

export interface Product {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
    description: string;
    currency: string;
    sync_product: {
        id: number;
        external_id: string;
        name: string;
        variants: number;
        synced: number;
        thumbnail_url: string;
        is_ignored: boolean;
    };
    sync_variants: SyncVariant[];
}