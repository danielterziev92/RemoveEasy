import type {IInventoryRepository} from "../../domain/repositories";
import type {IInventoryService} from "../../domain/services";
import type {InventoryApiClient} from "../../infrastructure/api/clients/InventoryApiClient.ts";
import type {IInventoryServiceErrorMessages, IItemErrorMessages, ISectionErrorMessages} from "../../domain/types";
import type {InventoryApiResponse, ItemApiData, SectionApiData} from "../../infrastructure/api/types";
import type {ITranslationService} from "../../shared/localization/types";
import {Item, Section} from "../../domain/entities";

export class InventoryService implements IInventoryService {
    private readonly repository: IInventoryRepository;
    private readonly apiClient: InventoryApiClient;
    private readonly errorMessages: IInventoryServiceErrorMessages;
    private readonly sectionErrorMessages: ISectionErrorMessages;
    private readonly itemErrorMessages: IItemErrorMessages;
    private translationService: ITranslationService;

    constructor(
        repository: IInventoryRepository,
        apiClient: InventoryApiClient,
        errorMessages: IInventoryServiceErrorMessages,
        sectionErrorMessages: ISectionErrorMessages,
        itemErrorMessages: IItemErrorMessages,
        translationService: ITranslationService
    ) {
        this.repository = repository;
        this.apiClient = apiClient;
        this.errorMessages = errorMessages;
        this.sectionErrorMessages = sectionErrorMessages;
        this.itemErrorMessages = itemErrorMessages;
        this.translationService = translationService;
    }

    async fetchAndStoreInventoryData(): Promise<{ sections: Section[]; items: Item[] }> {
        try {
            this.repository.setLoading(true);
            this.repository.setError(null);

            const apiResponse = await this.apiClient.fetchInventoryItems();

            const {sections, items} = this.transformApiDataToDomainEntities(apiResponse);

            this.repository.storeInventoryData(sections, items);

            return {sections, items};

        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : this.translationService.t(this.errorMessages.fetchError);
            this.repository.setError(errorMessage);
            throw error;
        }
    }

    getCachedInventoryData(): { sections: Section[]; items: Item[] } {
        return {
            sections: this.repository.getAllSections(),
            items: this.repository.getAllItems()
        };
    }

    private transformApiDataToDomainEntities(apiResponse: InventoryApiResponse): {
        sections: Section[];
        items: Item[]
    } {
        const sections: Section[] = [];
        const items: Item[] = [];

        if (!apiResponse?.sections || !Array.isArray(apiResponse.sections)) {
            throw new Error(this.translationService.t(this.errorMessages.invalidApiResponse));
        }

        apiResponse.sections.forEach((sectionData: SectionApiData) => {
            try {
                const section = Section.fromApiData(
                    sectionData,
                    this.sectionErrorMessages,
                    this.translationService
                );
                sections.push(section);

                if (Array.isArray(sectionData.items)) {
                    sectionData.items.forEach((itemData: ItemApiData) => {
                        try {
                            const item = Item.fromApiData(
                                itemData,
                                section,
                                this.itemErrorMessages,
                                this.translationService
                            );
                            items.push(item);
                        } catch (error) {
                            console.warn(this.errorMessages.skippedInvalidItem, error);
                        }
                    });
                }
            } catch (error) {
                console.warn(this.errorMessages.skippedInvalidSection, error);
            }
        });

        if (sections.length === 0) {
            throw new Error(this.errorMessages.noValidSections);
        }

        return {sections, items};
    }
}