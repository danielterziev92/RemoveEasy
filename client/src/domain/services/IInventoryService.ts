import {Item, type Section} from "../entities";

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