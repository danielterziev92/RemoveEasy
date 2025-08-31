import {Item, Section} from "@/domain/entities";

import type {IInventoryRepository} from "@/domain/repositories";

export class StoreInventoryUseCase {
    private readonly repository: IInventoryRepository;

    constructor(repository: IInventoryRepository) {
        this.repository = repository;
    }

    execute(sections: Section[], items: Item[]): void {
        this.repository.storeInventoryData(sections, items);
    }
}
