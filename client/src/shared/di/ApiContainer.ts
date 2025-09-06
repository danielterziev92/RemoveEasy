import type {ILocalizationService} from "@/application/services";

import {InventoryApiClient, OrderApiClient} from "@/infrastructure/clients";
import type {IInventoryApiErrorMessages, IOrderApiErrorMessages} from "@/infrastructure/types";

import type {ITranslationService} from "@/shared/localization/types";

export class ApiContainer {
    private readonly _inventoryApiClient: InventoryApiClient;
    private readonly _orderApiClient: OrderApiClient;

    constructor(
        baseUrl: string,
        errorMessages: {
            inventory: IInventoryApiErrorMessages;
            order: IOrderApiErrorMessages;
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
    }

    get inventoryApiClient(): InventoryApiClient {
        return this._inventoryApiClient;
    }

    get orderApiClient(): OrderApiClient {
        return this._orderApiClient;
    }
}