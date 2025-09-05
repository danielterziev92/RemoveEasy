import {Inventory} from "@/domain/aggregates";
import type {IInventoryRepository} from "@/domain/repositories";
import type {IInventoryApiClient} from "@/domain/services";

import type {IInventoryServiceErrorMessages} from "@/application/types";
import type {ITranslationService} from "@/shared/localization/types";
import {InventoryApiResponseDto} from "@/application/dto";

export class GetInventoryUseCase {

    private repository: IInventoryRepository;
    private apiClient: IInventoryApiClient;
    private errorMessages: IInventoryServiceErrorMessages;
    private translationService: ITranslationService;

    constructor(
        repository: IInventoryRepository,
        apiClient: IInventoryApiClient,
        errorMessages: IInventoryServiceErrorMessages,
        translationService: ITranslationService,
    ) {
        this.repository = repository;
        this.apiClient = apiClient;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
    }

    async execute(): Promise<Inventory> {
        try {
            this.repository.setLoading(true);
            this.repository.clearError();

            const existingInventory = this.repository.getInventory();
            if (existingInventory) return existingInventory;

            const apiResponse = await this.apiClient.fetchInventoryItems();

            const inventory = InventoryApiResponseDto.toDomainAggregate(
                apiResponse,
                this.errorMessages,
                this.translationService,
            )

            this.repository.saveInventory(inventory);
            return inventory;
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : this.translationService.t(this.errorMessages.fetchError);
            this.repository.setError(errorMessage);
            throw error;
        } finally {
            this.repository.setLoading(false);
        }
    }

}