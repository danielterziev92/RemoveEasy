import {Inventory} from "@/domain/aggregates";

export interface IInventoryRepository {

    getInventory(): Inventory | null;

    saveInventory(inventory: Inventory): void;

    clearInventory(): void;

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