import {Item, Section} from "@/domain/entities";

import type {InventoryApiClient} from "@/infrastructure/clients";
import {InventoryApiResponseDto} from "@/application/dto";
import type {IInventoryServiceErrorMessages, IItemErrorMessages, ISectionErrorMessages} from "@/application/types";
import type {ITranslationService} from "@/shared/localization/types";

export class FetchInventoryUseCase {
    private readonly apiClient: InventoryApiClient;
    private readonly errorMessages: IInventoryServiceErrorMessages;
    private readonly sectionErrorMessages: ISectionErrorMessages;
    private readonly itemErrorMessages: IItemErrorMessages;
    private readonly translationService: ITranslationService;


    constructor(
        apiClient: InventoryApiClient,
        errorMessages: IInventoryServiceErrorMessages,
        sectionErrorMessages: ISectionErrorMessages,
        itemErrorMessages: IItemErrorMessages,
        translationService: ITranslationService
    ) {
        this.apiClient = apiClient;
        this.errorMessages = errorMessages;
        this.sectionErrorMessages = sectionErrorMessages;
        this.itemErrorMessages = itemErrorMessages;
        this.translationService = translationService;
    }

    async execute(): Promise<{ sections: Section[]; items: Item[] }> {
        const apiResponse = await this.apiClient.fetchInventoryItems();

        return InventoryApiResponseDto.toDomainEntities(
            apiResponse,
            this.errorMessages,
            this.sectionErrorMessages,
            this.itemErrorMessages,
            this.translationService
        );
    }
}
