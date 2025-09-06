import {ContactInfo} from "@/domain/value-objects";

import type {NavigationService} from "@/application/services/NavigationService.ts";

import type {LanguageConfigDto} from "@/presentation/dto";

export class HeaderViewService {
    private navigationService: NavigationService;

    constructor(navigationService: NavigationService) {
        this.navigationService = navigationService;
    }

    getNavigationItems(t: (key: string) => string) {
        return this.navigationService.getNavigationItems(t);
    }

    getContactInfo(): ContactInfo {
        return new ContactInfo('07405211912');
    }

    createLanguageConfig(
        currentLocale: string,
        availableLocales: string[],
        changeLanguage: (locale: string) => void
    ): LanguageConfigDto {
        const getLanguageLabel = (locale: string) => {
            const labels = {
                'bg': 'БГ',
                'en': 'EN'
            };
            return labels[locale as keyof typeof labels] || locale;
        };

        return {
            currentLocale,
            availableLocales,
            getLanguageLabel,
            changeLanguage
        };
    }
}