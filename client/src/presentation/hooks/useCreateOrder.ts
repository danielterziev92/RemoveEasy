import {useState} from "react";

import type {OrderApiData, OrderApiResponse} from "@/infrastructure/types";

import type {UseCreateOrderResult} from "@/presentation/results";

import {createOrderUseCase} from "@/shared/di/container.ts";

export default function useCreateOrder(): UseCreateOrderResult {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const createOrder = async (orderData: OrderApiData): Promise<OrderApiResponse> => {
        setIsLoading(true);
        setError("");

        try {
            return await createOrderUseCase.execute(orderData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {createOrder, isLoading, error};
}