import {Item, Section} from "@/domain/entities";
import type {IInventoryRepository} from "@/domain/repositories";

import type {FetchInventoryUseCase, StoreInventoryUseCase} from "@/application/use-cases/inventory";
import type {IInventoryServiceErrorMessages} from "@/application/types";

import type {ITranslationService} from "@/shared/localization/types";

export class FetchAndStoreInventoryUseCase {
    private readonly repository: IInventoryRepository;
    private readonly errorMessages: IInventoryServiceErrorMessages;
    private readonly translationService: ITranslationService;
    private readonly fetchUseCase: FetchInventoryUseCase;
    private readonly storeUseCase: StoreInventoryUseCase;

    constructor(
        repository: IInventoryRepository,
        errorMessages: IInventoryServiceErrorMessages,
        translationService: ITranslationService,
        fetchUseCase: FetchInventoryUseCase,
        storeUseCase: StoreInventoryUseCase
    ) {
        this.repository = repository;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
        this.fetchUseCase = fetchUseCase;
        this.storeUseCase = storeUseCase;
    }

    async execute(): Promise<{ sections: Section[]; items: Item[] }> {
        try {
            this.repository.setLoading(true);
            this.repository.setError(null);

            const {sections, items} = await this.fetchUseCase.execute();
            this.storeUseCase.execute(sections, items);

            return {sections, items};

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
