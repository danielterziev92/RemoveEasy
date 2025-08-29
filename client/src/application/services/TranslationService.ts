import type {ITranslationService} from "../../shared/localization/types/ITranslationService.ts";
import {bg} from "../../shared/localization/locales/bg.ts";
import {en} from "../../shared/localization/locales/en.ts";

interface TranslationObject {
    [key: string]: string | TranslationObject;
}

export class TranslationService implements ITranslationService {
    private defaultLocation: string = "bg";
    private currentLocale: string;
    private translations: Record<string, TranslationObject>;

    constructor(location: string = "bg") {
        this.currentLocale = location;
        this.translations = {bg, en};
    }

    t(key: string, params?: Record<string, string | number>): string {
        const translation = this.getNestedTranslation(key, this.translations[this.currentLocale]);

        if (!translation) {
            const fallbackTranslation = this.getNestedTranslation(key, this.translations[this.defaultLocation]);
            if (fallbackTranslation) {
                return this.interpolateParams(fallbackTranslation, params);
            }

            return key;
        }

        return this.interpolateParams(translation, params);
    }

    getCurrentLocale(): string {
        return this.currentLocale;
    }

    setLocale(locale: string): void {
        if (this.getAvailableLocales().includes(locale)) {
            this.currentLocale = locale;
        } else {
            console.warn(`Locale '${locale}' is not available. Available locales: ${this.getAvailableLocales().join(', ')}`);
        }
    }

    getAvailableLocales(): string[] {
        return Object.keys(this.translations);
    }

    private getNestedTranslation(key: string, translations: TranslationObject): string | null {
        const keys = key.split(".");
        let current: string | TranslationObject = translations;

        for (const keyPart of keys) {
            if (current && typeof current === "object" && keyPart in current) {
                current = current[keyPart];
            } else {
                return null;
            }
        }

        return typeof current === "string" ? current : null;
    }

    private interpolateParams(text: string, params?: Record<string, string | number>): string {
        if (!params) {
            return text;
        }

        return text.replace(/{{(\w+)}}/g, (match, key) => {
            return params[key] !== undefined ? String(params[key]) : match;
        });
    }
}