import type {Store} from "@reduxjs/toolkit";

import type {ILocalizationRepository} from "@/domain/repositories";

import {setLocale} from "@/infrastructure/store/slices/localizationSlice.ts";

export class LocalStorageLocalizationRepository implements ILocalizationRepository {
    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }

    getCurrentLocale(): string {
        return this.store.getState().localization.currentLocale;
    }

    setCurrentLocale(locale: string): void {
        this.store.dispatch(setLocale(locale));
    }

    getSavedLocale(): string | null {
        return localStorage.getItem("app-locale");
    }

    saveLocale(locale: string): void {
        localStorage.setItem("app-locale", locale);
    }
}
