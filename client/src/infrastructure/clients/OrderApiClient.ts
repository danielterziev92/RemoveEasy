import type {IOrderApiErrorMessages} from "@/presentation/types/messages";
import type {ITranslationService} from "@/shared/localization/types";
import type {OrderApiData, OrderApiResponse} from "@/infrastructure/types";
import {API_CONFIG} from "@/shared/constants/api.ts";
import {ApiException, ClientErrorException, ServerErrorException} from "@/infrastructure/exceptions";

export class OrderApiClient {
    private readonly baseUrl: string;
    private readonly errorMessages: IOrderApiErrorMessages;
    private readonly translationService: ITranslationService;

    constructor(
        baseUrl: string,
        errorMessages: IOrderApiErrorMessages,
        translationService: ITranslationService
    ) {
        this.baseUrl = baseUrl;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
    }

    async createOrder(orderData: OrderApiData): Promise<OrderApiResponse> {
        try {
            this.validateOrderData(orderData);

            const response = await this.fetchWithTimeout(
                `${this.baseUrl}${API_CONFIG.ENDPOINTS.CREATE_ORDER}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                }
            );

            if (!response.ok) {
                if (response.status >= 500) {
                    throw new ServerErrorException(response.status, response);
                } else if (response.status >= 400) {
                    throw new ClientErrorException(response.status, response);
                } else {
                    throw new ApiException(
                        this.translationService.t(this.errorMessages.serverError),
                        response.status,
                        response
                    );
                }
            }

            const data: unknown = await response.json();
            this.validateOrderResponse(data);
            return data as OrderApiResponse;

        } catch (error) {
            if (error instanceof ApiException) {
                throw error;
            }
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error(this.translationService.t(this.errorMessages.networkError));
            }
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error(this.translationService.t(this.errorMessages.requestTimeout));
            }
            throw error instanceof Error ? error : new Error(this.translationService.t(this.errorMessages.unknownError));
        }
    }

    private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

        try {
            return await fetch(url, {...options, signal: controller.signal});
        } finally {
            clearTimeout(timeoutId);
        }
    }

    private validateOrderData(data: OrderApiData): void {
        if (!data || typeof data !== 'object') {
            throw new Error(this.translationService.t(this.errorMessages.validationError));
        }

        const requiredFields: (keyof OrderApiData)[] = [
            'customer_full_name',
            'phone_number',
            'email',
            'loading_town',
            'loading_street',
            'unloading_town',
            'unloading_street'
        ];

        for (const field of requiredFields) {
            if (!data[field] || (typeof data[field] === 'string' && (data[field] as string).trim().length === 0)) {
                throw new Error(this.translationService.t(this.errorMessages.validationError));
            }
        }

        if (!Array.isArray(data.items) || data.items.length === 0) {
            throw new Error(this.translationService.t(this.errorMessages.validationError));
        }

        data.items.forEach((item, index) => {
            if (!item || typeof item !== 'object' || item.itemId < 1 || item.quantity < 1) {
                throw new Error(`${this.translationService.t(this.errorMessages.validationError)} - item ${index}`);
            }
        });
    }

    private validateOrderResponse(data: unknown): asserts data is OrderApiResponse {
        if (!data || typeof data !== 'object') {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }

        const response = data as Record<string, unknown>;

        if (typeof response.success !== 'boolean') {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }

        if (typeof response.message !== 'string') {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }

        if (response.orderId !== undefined && typeof response.orderId !== 'string') {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }
    }
}