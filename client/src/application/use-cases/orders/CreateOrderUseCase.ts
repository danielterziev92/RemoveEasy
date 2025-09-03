import {OrderApiClient} from "@/infrastructure/clients";
import type {ITranslationService} from "@/shared/localization/types";
import type {IOrderApiErrorMessages, OrderApiData, OrderApiResponse} from "@/infrastructure/types";

export class CreateOrderUseCase {
    private readonly apiClient: OrderApiClient;
    private readonly errorMessages: IOrderApiErrorMessages;
    private readonly translationService: ITranslationService;

    constructor(
        apiClient: OrderApiClient,
        errorMessages: IOrderApiErrorMessages,
        translationService: ITranslationService,
    ) {
        this.apiClient = apiClient;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
    }

    async execute(orderData: OrderApiData): Promise<OrderApiResponse> {
        try {
            return await this.apiClient.createOrder(orderData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error(this.translationService.t(this.errorMessages.orderCreationFailed));
        }
    }
}