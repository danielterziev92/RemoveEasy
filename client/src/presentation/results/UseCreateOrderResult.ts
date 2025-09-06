import {OrderId} from "@/domain/value-objects";
import type {OrderApiData} from "@/infrastructure/types";

export interface UseCreateOrderResult {
    createOrder: (orderData: OrderApiData) => Promise<OrderId>;
    isLoading: boolean;
    error: string | null;
}