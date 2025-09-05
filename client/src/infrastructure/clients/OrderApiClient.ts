import type {OrderData} from "@/domain/types";
import {OrderId} from "@/domain/value-objects";
import type {IOrderApiClient} from "@/domain/services";

import type {ILocalizationService} from "@/application/services";

import type {IOrderApiErrorMessages, ServerOrderResponse} from "@/infrastructure/types";
import {ApiException, ClientErrorException, ServerErrorException} from "@/infrastructure/exceptions";
import {OrderMapper} from "@/infrastructure/mappers";

import type {ITranslationService} from "@/shared/localization/types";
import {API_CONFIG} from "@/shared/constants/api.ts";
import type {UUID} from "node:crypto";

export class OrderApiClient implements IOrderApiClient {
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

    async createOrder(orderData: OrderData): Promise<OrderId> {
        try {
            const apiData = OrderMapper.domainToApi(orderData);
            this.validateOrderData(apiData);

            const currentLocale = this.localizationService.getCurrentLocale();
            const currentLang = currentLocale.code;

            const url = new URL(`${this.baseUrl}${API_CONFIG.ENDPOINTS.CREATE_ORDER}`);
            url.searchParams.append('lang', currentLang);

            const response = await this.fetchWithTimeout(
                url.toString(),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apiData)
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

            return OrderId.create(serverResponse.id as UUID);
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

    private validateOrderData(data: any): void {
        if (!data || typeof data !== 'object') {
            throw new Error(this.translationService.t(this.errorMessages.validationError));
        }

        const requiredFields = [
            'customer_full_name',
            'phone_number',
            'email',
            'loading_town',
            'loading_street',
            'unloading_town',
            'unloading_street'
        ];

        for (const field of requiredFields) {
            if (!data[field] || (typeof data[field] === 'string' && data[field].trim().length === 0)) {
                throw new Error(this.translationService.t(this.errorMessages.validationError));
            }
        }

        if (!Array.isArray(data.items) || data.items.length === 0) {
            throw new Error(this.translationService.t(this.errorMessages.validationError));
        }

        data.items.forEach((item: { itemId: number; quantity: number; }, index: number) => {
            if (!item || typeof item !== 'object') {
                throw new Error(`${this.translationService.t(this.errorMessages.validationError)} - item ${index}: invalid object`);
            }

            if (item.itemId < 1) {
                throw new Error(`${this.translationService.t(this.errorMessages.validationError)} - item ${index}: invalid itemId`);
            }

            if (item.quantity < 1) {
                throw new Error(`${this.translationService.t(this.errorMessages.validationError)} - item ${index}: invalid quantity`);
            }
        });
    }

    private validateServerResponse(data: ServerOrderResponse): void {
        if (!data || typeof data !== 'object') {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }

        if (!data.id || data.id.trim().length === 0) {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }
    }
}