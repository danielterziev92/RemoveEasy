import {OrderId} from "@/domain/value-objects";
import type {OrderApiData} from "@/infrastructure/types";

export interface IOrderApiClient {
    createOrder(orderApiData: OrderApiData): Promise<OrderId>;
}