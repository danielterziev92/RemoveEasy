import type {IOrderErrorMessages} from "@/application/types";
import {CreateOrderUseCase} from "@/application/use-cases/orders";


import type {ITranslationService} from "@/shared/localization/types";
import {OrderApiClient} from "@/infrastructure/clients";

export class OrderContainer {
    private readonly _createOrderUseCase: CreateOrderUseCase;

    constructor(
        apiClient: OrderApiClient,
        errorMessages: IOrderErrorMessages,
        translationService: ITranslationService
    ) {
        this._createOrderUseCase = new CreateOrderUseCase(
            apiClient,
            errorMessages,
            translationService
        );
    }

    get createOrderUseCase(): CreateOrderUseCase {
        return this._createOrderUseCase;
    }
}