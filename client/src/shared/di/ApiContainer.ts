import type {ILocalizationService} from "@/application/services";

import {InventoryApiClient, OrderApiClient, ServicesApiClient} from "@/infrastructure/clients";
import type {
    IInventoryApiErrorMessages,
    IOrderApiErrorMessages,
    IServicesApiErrorMessages
} from "@/infrastructure/types";

import type {ITranslationService} from "@/shared/localization/types";

export class ApiContainer {
    private readonly _inventoryApiClient: InventoryApiClient;
    private readonly _orderApiClient: OrderApiClient;
    private readonly _servicesApiClient: ServicesApiClient;

    constructor(
        baseUrl: string,
        errorMessages: {
            inventory: IInventoryApiErrorMessages;
            order: IOrderApiErrorMessages;
            services: IServicesApiErrorMessages;
        },
        translationService: ITranslationService,
        localizationService: ILocalizationService
    ) {
        this._inventoryApiClient = new InventoryApiClient(
            baseUrl,
            errorMessages.inventory,
            translationService
        );

        this._orderApiClient = new OrderApiClient(
            baseUrl,
            errorMessages.order,
            translationService,
            localizationService
        );

        this._servicesApiClient = new ServicesApiClient(
            baseUrl,
            errorMessages.services,
            translationService
        );
    }

    get inventoryApiClient(): InventoryApiClient {
        return this._inventoryApiClient;
    }

    get orderApiClient(): OrderApiClient {
        return this._orderApiClient;
    }

    get servicesApiClient(): ServicesApiClient {
        return this._servicesApiClient;
    }
}