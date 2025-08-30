import {API_CONFIG} from "../../shared/constants/api.ts";
import type {InventoryApiResponse} from "../types";
import type {IInventoryApiErrorMessages} from "../../domain/types";
import type {ITranslationService} from "../../shared/localization/types";
import {ApiException, ClientErrorException, ServerErrorException} from "../exceptions";

export class InventoryApiClient {
    private readonly baseUrl: string;
    private readonly errorMessages: IInventoryApiErrorMessages;
    private readonly translationService: ITranslationService;

    constructor(
        baseUrl: string,
        errorMessages: IInventoryApiErrorMessages,
        translationService: ITranslationService
    ) {
        this.baseUrl = baseUrl;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
    }

    async fetchInventoryItems(): Promise<InventoryApiResponse> {
        try {
            const response = await this.fetchWithTimeout(
                `${this.baseUrl}${API_CONFIG.ENDPOINTS.INVENTORY_ITEMS}`,
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

            const data: unknown = await response.json();
            this.validateApiResponse(data);
            return data as InventoryApiResponse;

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

    private validateApiResponse(data: unknown): asserts data is InventoryApiResponse {
        if (!data || typeof data !== 'object') {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }

        const response = data as Record<string, unknown>;

        if (!('sections' in response)) {
            throw new Error(this.translationService.t(this.errorMessages.missingData));
        }

        if (!Array.isArray(response.sections)) {
            throw new Error(this.translationService.t(this.errorMessages.invalidResponse));
        }

        response.sections.forEach((section, index) => {
            if (!section || typeof section !== 'object') {
                throw new Error(`${this.translationService.t(this.errorMessages.invalidSectionAtIndex)} ${index}`);
            }

            const sectionObj = section as Record<string, unknown>;

            if (typeof sectionObj.icon_class !== 'string' ||
                typeof sectionObj.title !== 'string' ||
                !Array.isArray(sectionObj.items)) {
                throw new Error(`${this.translationService.t(this.errorMessages.invalidSectionStructureAtIndex)} ${index}`);
            }

            sectionObj.items.forEach((item, itemIndex) => {
                if (!item || typeof item !== 'object') {
                    throw new Error(`${this.translationService.t(this.errorMessages.invalidItemAtIndex)} ${index}, item ${itemIndex}`);
                }

                const itemObj = item as Record<string, unknown>;

                if (typeof itemObj.id !== 'number' ||
                    typeof itemObj.icon_class !== 'string' ||
                    typeof itemObj.title !== 'string') {
                    throw new Error(`${this.translationService.t(this.errorMessages.invalidItemStructureAtIndex)} ${index}, item ${itemIndex}`);
                }
            });
        });
    }

}