export interface ITranslationService {
    t(key: string, params?: Record<string, string | number>): string;
    getCurrentLocale(): string;
    setLocale(locale: string): void;
    getAvailableLocales(): string[];
}