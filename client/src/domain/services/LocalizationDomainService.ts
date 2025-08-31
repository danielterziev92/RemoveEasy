import {Locale} from "@/domain/entities";

export class LocalizationDomainService {
    private readonly availableLocales: Locale[] = [
        Locale.create("bg", "Bulgarian", "Български"),
        Locale.create("en", "English", "English")
    ];

    /**
     * Business rule: Validates if locale is supported
     */
    isLocaleSupported(locale: string): boolean {
        return this.availableLocales.some(l => l.code === locale);
    }

    /**
     * Business rule: Detects best locale based on browser preference
     */
    detectBestLocale(browserLocale: string): string {
        const normalizedLocale = browserLocale.split("-")[0];
        const supportedCodes = this.availableLocales.map(locale => locale.code);
        return supportedCodes.includes(normalizedLocale) ? normalizedLocale : "bg";
    }

    /**
     * Business rule: Gets all available locales
     */
    getAvailableLocales(): Locale[] {
        return [...this.availableLocales]; // Defensive copy
    }

    /**
     * Business rule: Finds locale by code
     */
    getLocaleByCode(code: string): Locale | null {
        return this.availableLocales.find(locale => locale.code === code) || null;
    }
}