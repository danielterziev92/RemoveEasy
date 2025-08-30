import {Locale} from "@/domain/entities";

export interface ILocalizationService {
    getCurrentLocale(): string;

    setCurrentLocale(locale: string): void;

    getAvailableLocales(): Locale[];

    detectBrowserLocale(): string;

    initializeLocale(): void;
}