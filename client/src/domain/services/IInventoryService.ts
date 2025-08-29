import type {Item} from "../entities/Item.ts";
import type {Section} from "../entities/Section.ts";

export interface IInventoryService {

    /**
     * Fetches inventory data and coordinates storage
     */
    fetchAndStoreInventoryData(): Promise<{
        sections: Section[];
        items: Item[];
    }>;

    /**
     * Gets cached inventory data
     */
    getCachedInventoryData(): {
        sections: Section[];
        items: Item[];
    };
}