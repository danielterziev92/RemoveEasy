import type {NavigationService} from "@/application/services/NavigationService.ts";
import {ContactInfo, LanguageConfig} from "@/domain/value-objects";

export class HeaderViewService {
    private navigationService: NavigationService;

    constructor(navigationService: NavigationService) {
        this.navigationService = navigationService;
    }

    getNavigationItems(t: (key: string) => string) {
        return this.navigationService.getNavigationItems(t);
    }

    getContactInfo(): ContactInfo {
        return new ContactInfo('07405211912', 'https://wa.me/07405211912');
    }

    createLanguageConfig(
        currentLocale: string,
        availableLocales: string[],
        changeLanguage: (locale: string) => void
    ): LanguageConfig {
        const getLanguageLabel = (locale: string) => {
            const labels = {
                'bg': 'БГ',
                'en': 'EN'
            };
            return labels[locale as keyof typeof labels] || locale;
        };

        return new LanguageConfig(
            currentLocale,
            availableLocales,
            getLanguageLabel,
            changeLanguage
        );
    }
}