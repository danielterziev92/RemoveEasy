import {Item, Section} from "@/domain/entities";

export interface IInventoryRepository {

    /**
     * Gets all sections from the store
     */
    getAllSections(): Section[];

    /**
     * Gets all items from the store
     */
    getAllItems(): Item[];

    /**
     * Gets items by section title
     */
    getItemsBySection(sectionTitle: string): Item[];

    /**
     * Stores sections and items in the state
     */
    storeInventoryData(sections: Section[], items: Item[]): void;

    /**
     * Clears all inventory data
     */
    clearInventoryData(): void;

    /**
     * Sets the loading state
     */
    setLoading(loading: boolean): void;

    /**
     * Checks if data is currently loading
     */
    isLoading(): boolean;


    /**
     * Sets error state
     */
    setError(error: string | null): void;

    /**
     * Gets the current error state
     */
    getError(): string | null;

    /**
     * Clears error state
     */
    clearError(): void;
}