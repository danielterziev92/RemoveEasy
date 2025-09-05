import type {IInventoryRepository} from "@/domain/repositories";
import type {IInventoryApiClient} from "@/domain/services";

import type {IInventoryServiceErrorMessages} from "@/application/types";

import type {ITranslationService} from "@/shared/localization/types";
import {Inventory} from "@/domain/aggregates";
import {InventoryApiResponseDto} from "@/application/dto";

export class ManageInventoryUseCase {
    private readonly repository: IInventoryRepository;
    private readonly apiClient: IInventoryApiClient;
    private readonly errorMessages: IInventoryServiceErrorMessages;
    private readonly translationService: ITranslationService;

    constructor(
        repository: IInventoryRepository,
        apiClient: IInventoryApiClient,
        errorMessages: IInventoryServiceErrorMessages,
        translationService: ITranslationService
    ) {
        this.repository = repository;
        this.apiClient = apiClient;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
    }

    async getInventory(): Promise<Inventory> {
        return await this.fetchAndStoreInventory();
    }

    getCachedInventory(): Inventory | null {
        return this.repository.getInventory();
    }

    clearInventory(): void {
        this.repository.clearInventory();
    }

    private async fetchAndStoreInventory(): Promise<Inventory> {
        const apiResponse = await this.apiClient.fetchInventoryItems();

        const inventory = InventoryApiResponseDto.toDomainAggregate(
            apiResponse,
            this.errorMessages,
            this.translationService,
        )

        this.repository.saveInventory(inventory);
        return inventory;
    }
}