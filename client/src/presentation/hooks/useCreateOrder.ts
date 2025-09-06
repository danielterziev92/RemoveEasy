import {useState} from "react";

import type {OrderApiData} from "@/infrastructure/types";

import type {UseCreateOrderResult} from "@/presentation/results";

import {createOrderUseCase} from "@/shared/di/container.ts";
import {OrderId} from "@/domain/value-objects";

export default function useCreateOrder(): UseCreateOrderResult {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const createOrder = async (orderApiData: OrderApiData): Promise<OrderId> => {
        setIsLoading(true);
        setError("");

        try {
            return await createOrderUseCase.execute(orderApiData);
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