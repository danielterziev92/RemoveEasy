import type {Section} from "../domain/entities/Section.ts";
import type {IInventoryRepository} from "../domain/repositories/IInventoryRepository.ts";
import {type RootState, store} from "../application/store/store.ts";
import type {Item} from "../domain/entities/Item.ts";
import {
    clearInventoryData,
    setError,
    setInventoryData,
    setLoading
} from "../application/store/slices/inventorySlice.ts";
import type {Store} from "@reduxjs/toolkit";
import type {IInventoryErrorMessages} from "../domain/types/IInventoryErrorMessages.ts";
import type {ITranslationService} from "../shared/localization/types/ITranslationService.ts";

export class RTKInventoryRepository implements IInventoryRepository {
    private store: Store<RootState>
    private errorMessages: IInventoryErrorMessages;
    private translationService: ITranslationService;

    constructor(
        store: Store<RootState>,
        errorMessages: IInventoryErrorMessages,
        translationService: ITranslationService
    ) {
        this.store = store;
        this.errorMessages = errorMessages;
        this.translationService = translationService;
    }

    getAllSections(): Section[] {
        const state = this.store.getState();
        return state.inventory.sections;
    }

    getAllItems(): Item[] {
        const state = this.store.getState();
        return state.inventory.items;
    }

    getItemsBySection(sectionTitle: string): Item[] {
        if (!sectionTitle) {
            throw new Error(this.translationService.t(this.errorMessages.invalidSectionTitle));
        }

        const state = this.store.getState();
        if (!state) {
            throw new Error(this.translationService.t(this.errorMessages.storeNotAvailable));
        }

        return state.inventory.items.filter(item => item.belongsToSection(sectionTitle));
    }

    storeInventoryData(sections: Section[], items: Item[]): void {
        if (!Array.isArray(sections) || !Array.isArray(items)) {
            throw new Error(this.translationService.t(this.errorMessages.invalidInventoryData));
        }

        store.dispatch(setInventoryData({sections, items}));
    }

    clearInventoryData(): void {
        store.dispatch(clearInventoryData());
    }

    isLoading(): boolean {
        const state = this.store.getState();
        return state?.inventory?.isLoading ?? false;
    }

    getError(): string | null {
        const state = this.store.getState();
        return state?.inventory?.error ?? null;
    }

    setLoading(isLoading: boolean): void {
        this.store.dispatch(setLoading(isLoading));
    }

    setError(error: string | null): void {
        this.store.dispatch(setError(error));
    }

    clearError(): void {
        this.store.dispatch(setError(null));
    }
}
