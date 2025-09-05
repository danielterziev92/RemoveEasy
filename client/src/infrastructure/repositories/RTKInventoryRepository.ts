import type {Store} from "@reduxjs/toolkit";

import {Inventory} from "@/domain/aggregates";
import type {IInventoryRepository} from "@/domain/repositories";

import {type RootState} from "@/infrastructure/store/store.ts";
import {clearInventory, setError, setInventory, setLoading} from "@/infrastructure/store/slices/inventorySlice.ts";

export class RTKInventoryRepository implements IInventoryRepository {
    private store: Store<RootState>

    constructor(store: Store<RootState>) {
        this.store = store;
    }

    getInventory(): Inventory | null {
        const state = this.store.getState();
        return state.inventory.inventory;
    }

    saveInventory(inventory: Inventory): void {
        this.store.dispatch(setInventory(inventory));
    }

    clearInventory(): void {
        this.store.dispatch(clearInventory());
    }

    setLoading(loading: boolean): void {
        this.store.dispatch(setLoading(loading));
    }

    isLoading(): boolean {
        const state = this.store.getState();
        return state?.inventory?.isLoading ?? false;
    }

    setError(error: string | null): void {
        this.store.dispatch(setError(error));
    }

    getError(): string | null {
        const state = this.store.getState();
        return state?.inventory?.error ?? null;
    }

    clearError(): void {
        this.store.dispatch(setError(null));
    }
}
