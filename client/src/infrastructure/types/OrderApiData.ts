export interface OrderApiData {
    customer_full_name: string;
    phone_number: string;
    email: string;
    loading_town: string;
    loading_postal_code: string;
    loading_street: string;
    loading_house_number: string;
    loading_address: string;
    unloading_town: string;
    unloading_postal_code: string;
    unloading_street: string;
    unloading_house_number: string;
    unloading_address: string;
    description: string;
    items: Array<{ itemId: number; quantity: number }>;
}