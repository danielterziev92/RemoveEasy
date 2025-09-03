import type {OrderApiData, OrderApiResponse} from "@/infrastructure/types";

export interface UseCreateOrderResult {
    createOrder: (orderData: OrderApiData) => Promise<OrderApiResponse>;
    isLoading: boolean;
    error: string | null;
}