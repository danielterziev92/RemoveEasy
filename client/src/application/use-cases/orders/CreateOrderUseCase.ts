import {OrderId} from "@/domain/value-objects";
import type {IOrderApiClient} from "@/domain/services";

import type {IOrderErrorMessages} from "@/application/types";

import type {ITranslationService} from "@/shared/localization/types";
import type {OrderApiData} from "@/infrastructure/types";

export class CreateOrderUseCase {
    private readonly apiClient: IOrderApiClient;
    private readonly errorMessages: IOrderErrorMessages;
    private readonly translationService: ITranslationService;

    constructor(
        apiClient: IOrderApiClient,
        errorMessages: IOrderErrorMessages,
        translationService: ITranslationService,
    ) {
        this.apiClient = apiClient;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
    }

    async execute(orderApiData: OrderApiData): Promise<OrderId> {
        try {
            return this.apiClient.createOrder(orderApiData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error(this.translationService.t(this.errorMessages.orderCreationFailed));
        }
    }
}