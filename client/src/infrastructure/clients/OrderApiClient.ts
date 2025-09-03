import type {ILocalizationService} from "@/domain/services";

import type {IOrderApiErrorMessages, OrderApiData, OrderApiResponse, ServerOrderResponse} from "@/infrastructure/types";
import {ApiException, ClientErrorException, ServerErrorException} from "@/infrastructure/exceptions";

import type {ITranslationService} from "@/shared/localization/types";
import {API_CONFIG} from "@/shared/constants/api.ts";

export class OrderApiClient {
    private readonly baseUrl: string;
    private readonly errorMessages: IOrderApiErrorMessages;
    private readonly translationService: ITranslationService;
    private readonly localizationService: ILocalizationService;

    constructor(
        baseUrl: string,
        errorMessages: IOrderApiErrorMessages,
        translationService: ITranslationService,
        localizationService: ILocalizationService,
    ) {
        this.baseUrl = baseUrl;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
        this.localizationService = localizationService;
    }

    async createOrder(orderData: OrderApiData): Promise<OrderApiResponse> {
        try {
            this.validateOrderData(orderData);

            const currentLang = this.localizationService.getCurrentLocale();
            const url = new URL(`${this.baseUrl}${API_CONFIG.ENDPOINTS.CREATE_ORDER}`);
            url.searchParams.append('lang', currentLang);

            const response = await this.fetchWithTimeout(
                url.toString(),
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

            const serverResponse: ServerOrderResponse = await response.json();

            this.validateServerResponse(serverResponse);

            return {
                id: serverResponse.id,
                success: true,
                message: 'Order created successfully'
            };
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

    private validateServerResponse(data: ServerOrderResponse): void {
        if (!data || typeof data !== 'object') {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }

        if (data.id.trim().length === 0) {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }
    }
}