import type {ILocalizationDomainService} from "@/domain/services";
import type {ILocalizationRepository} from "@/domain/repositories";

import {bg, en} from "@/shared/localization/locales";
import type {ITranslationService} from "@/shared/localization/types";

interface TranslationObject {
    [key: string]: string | TranslationObject;
}

export class TranslationService implements ITranslationService {
    private readonly defaultLocale: string = "bg";
    private readonly translations: Record<string, TranslationObject>;
    private readonly localizationDomainService: ILocalizationDomainService;
    private readonly localizationRepository: ILocalizationRepository;

    constructor(
        localizationDomainService: ILocalizationDomainService,
        localizationRepository: ILocalizationRepository
    ) {
        this.translations = {bg, en};
        this.localizationDomainService = localizationDomainService;
        this.localizationRepository = localizationRepository;
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
        return this.localizationRepository.getCurrentLocale();
    }

    setLocale(locale: string): void {
        if (!this.localizationDomainService.isLocaleSupported(locale)) {
            throw new Error(`Locale '${locale}' is not supported`);
        }

        this.localizationRepository.setCurrentLocale(locale);
    }

    getAvailableLocales(): string[] {
        return this.localizationDomainService.getAvailableLocales().map(locale => locale.code);
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