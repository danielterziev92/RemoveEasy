import {Item, Section} from "@/domain/entities";
import type {IInventoryService} from "@/domain/services";

import {FetchAndStoreInventoryUseCase, GetCachedInventoryUseCase} from "@/application/use-cases/inventory";


export class InventoryService implements IInventoryService {
    private readonly fetchAndStoreUseCase: FetchAndStoreInventoryUseCase;
    private readonly getCachedUseCase: GetCachedInventoryUseCase;

    constructor(
        fetchAndStoreUseCase: FetchAndStoreInventoryUseCase,
        getCachedUseCase: GetCachedInventoryUseCase
    ) {
        this.fetchAndStoreUseCase = fetchAndStoreUseCase;
        this.getCachedUseCase = getCachedUseCase;
    }

    async fetchAndStoreInventoryData(): Promise<{ sections: Section[]; items: Item[] }> {
        return await this.fetchAndStoreUseCase.execute();
    }

    getCachedInventoryData(): { sections: Section[]; items: Item[] } {
        return this.getCachedUseCase.execute();
    }
}