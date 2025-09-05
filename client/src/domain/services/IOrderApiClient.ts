import type {OrderData} from "@/domain/types";
import {OrderId} from "@/domain/value-objects";

export interface IOrderApiClient {
    createOrder(orderData: OrderData): OrderId;
}