import type {ServiceData} from "@/domain/types";

import {ApiToDomainMapper} from "@/infrastructure/mappers";
import type {IServicesApiErrorMessages, ServicesApiResponse} from "@/infrastructure/types";
import {ApiException, ClientErrorException, ServerErrorException} from "@/infrastructure/exceptions";

import type {ITranslationService} from "@/shared/localization/types";
import {API_CONFIG} from "@/shared/constants/api.ts";

export class ServicesApiClient {
    private readonly baseUrl: string;
    private readonly errorMessages: IServicesApiErrorMessages;
    private readonly translationService: ITranslationService;

    constructor(
        baseUrl: string,
        errorMessages: IServicesApiErrorMessages,
        translationService: ITranslationService
    ) {
        this.baseUrl = baseUrl;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
    }

    async fetchServices(): Promise<{ services: ServiceData[] }> {
        try {
            const response = await this.fetchWithTimeout(
                `${this.baseUrl}${API_CONFIG.ENDPOINTS.SERVICES}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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

            const apiData: ServicesApiResponse = await response.json();
            this.validateApiResponse(apiData);

            return ApiToDomainMapper.mapServicesResponse(apiData);
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

    private validateApiResponse(data: unknown): asserts data is ServicesApiResponse {
        if (!data || typeof data !== 'object') {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }

        const response = data as Record<string, unknown>;

        if (!('services' in response)) {
            throw new Error(this.translationService.t(this.errorMessages.missingData));
        }

        if (!Array.isArray(response.services)) {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }

        response.services.forEach((service, index) => {
            if (!service || typeof service !== 'object') {
                throw new Error(`${this.translationService.t(this.errorMessages.invalidServiceAtIndex)} ${index}`);
            }

            const serviceObj = service as Record<string, unknown>;

            if (typeof serviceObj.id !== 'number' ||
                typeof serviceObj.icon_class !== 'string' ||
                typeof serviceObj.price_from !== 'string' ||
                typeof serviceObj.currency !== 'string' ||
                typeof serviceObj.title_bg !== 'string' ||
                typeof serviceObj.title_en !== 'string' ||
                typeof serviceObj.description_bg !== 'string' ||
                typeof serviceObj.description_en !== 'string' ||
                typeof serviceObj.is_active !== 'boolean') {
                throw new Error(`${this.translationService.t(this.errorMessages.invalidServiceStructureAtIndex)} ${index}`);
            }
        });
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
}