export interface ILocalizationRepository {
    getCurrentLocale(): string;

    setCurrentLocale(locale: string): void;

    getSavedLocale(): string | null;

    saveLocale(locale: string): void;
}