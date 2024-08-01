export interface Product {
    id: string;
    external_id: string;
    name: string;
    custom_name?: string;
    thumbnail_url: string;
    description?: string; // Add this line
    variants?: Array<{
        id: number;
        name: string;
        size: string;
        color: string;
        price: string;
    }>;
}