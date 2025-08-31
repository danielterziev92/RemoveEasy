import {Locale} from "@/domain/entities";
import type {ILocalizationService} from "@/domain/services";

import {bg, en} from "@/shared/localization/locales";
import type {ITranslationService} from "@/shared/localization/types";

interface TranslationObject {
    [key: string]: string | TranslationObject;
}

export class TranslationService implements ITranslationService {
    private defaultLocale: string = "bg";
    private translations: Record<string, TranslationObject>;
    private localizationService: ILocalizationService;

    constructor(localizationService: ILocalizationService) {
        this.translations = {bg, en};
        this.localizationService = localizationService;
    }

    t(key: string, params?: Record<string, string | number>): string {
        const currentLocale = this.getCurrentLocale();
        const translation = this.getNestedTranslation(key, this.translations[currentLocale]);

        if (!translation) {
            const fallbackTranslation = this.getNestedTranslation(key, this.translations[this.defaultLocale]);
            if (fallbackTranslation) {
                return this.interpolateParams(fallbackTranslation, params);
            }

            return key;
        }

        return this.interpolateParams(translation, params);
    }

    getCurrentLocale(): string {
        return this.localizationService.getCurrentLocale();
    }

    setLocale(locale: string): void {
        this.localizationService.setCurrentLocale(locale);
    }

    getAvailableLocales(): string[] {
        return this.localizationService.getAvailableLocales().map((locale: Locale) => locale.code);
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