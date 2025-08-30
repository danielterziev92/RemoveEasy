import type {ILocalizationService} from "@/domain/services";
import {Locale} from "@/domain/entities";
import type {Store} from "@reduxjs/toolkit";
import {initializeLocalization, setLocale} from "@/application/store/slices/localizationSlice.ts";

export class LocalizationService implements ILocalizationService {
    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }

    private availableLocales: Locale[] = [
        Locale.create("bg", "Bulgarian", "Български"),
        Locale.create("en", "English", "English")
    ];

    getCurrentLocale(): string {
        const state = this.store.getState();
        return state.localization.currentLocale;
    }

    setCurrentLocale(locale: string): void {
        if (this.isLocaleSupported(locale)) {
            this.store.dispatch(setLocale(locale));
            localStorage.setItem("app-locale", locale);
        } else {
            console.warn(`Locale '${locale}' is not supported`);
        }
    }

    getAvailableLocales(): Locale[] {
        return this.availableLocales;
    }

    detectBrowserLocale(): string {
        const browserLocale = navigator.language.split("-")[0];
        const supportedCodes = this.availableLocales.map(locale => locale.code);
        return supportedCodes.includes(browserLocale) ? browserLocale : "bg";
    }

    initializeLocale(): void {
        const savedLocale = localStorage.getItem("app-locale");
        const initialLocale = savedLocale || this.detectBrowserLocale();

        this.store.dispatch(setLocale(initialLocale));
        this.store.dispatch(initializeLocalization());
    }

    private isLocaleSupported(locale: string): boolean {
        return this.availableLocales.some(l => l.code === locale);
    }
}