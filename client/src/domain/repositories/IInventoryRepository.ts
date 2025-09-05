import {Inventory} from "@/domain/aggregates";

export interface IInventoryRepository {

    getInventory(): Inventory | null;

    saveInventory(inventory: Inventory): void;

    clearInventory(): void;
}