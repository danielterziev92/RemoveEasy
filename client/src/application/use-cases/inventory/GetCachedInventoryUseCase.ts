import {Item, Section} from "@/domain/entities";
import type {IInventoryRepository} from "@/domain/repositories";

export class GetCachedInventoryUseCase {
    private readonly repository: IInventoryRepository;

    constructor(repository: IInventoryRepository) {
        this.repository = repository;
    }

    execute(): { sections: Section[]; items: Item[] } {
        return {
            sections: this.repository.getAllSections(),
            items: this.repository.getAllItems()
        };
    }
}
