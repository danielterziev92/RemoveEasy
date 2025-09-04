import {Locale} from "@/domain/entities";

export interface ILocalizationService {
    /**
     * Gets current locale as entity
     */
    getCurrentLocale(): Locale;

    /**
     * Sets current locale using entity
     */
    setCurrentLocale(locale: Locale): void;

    /**
     * Gets saved locale from storage (if any)
     */
    getSavedLocale(): Locale | null;

    /**
     * Saves locale to persistent storage
     */
    saveLocale(locale: Locale): void;

    /**
     * Gets all available locales
     */
    getAvailableLocales(): Locale[];
}