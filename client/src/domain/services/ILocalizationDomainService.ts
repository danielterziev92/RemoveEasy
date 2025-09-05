import {Locale} from "@/domain/value-objects";

export interface ILocalizationDomainService {
    /**
     * Business rule: Validates if locale is supported
     */
    isLocaleSupported(locale: string): boolean;

    /**
     * Business rule: Detects best locale based on browser preference
     */
    detectBestLocale(browserLocale: string): string;

    /**
     * Business rule: Gets all available locales
     */
    getAvailableLocales(): Locale[];

    /**
     * Business rule: Finds locale by code
     */
    getLocaleByCode(code: string): Locale | null;
}