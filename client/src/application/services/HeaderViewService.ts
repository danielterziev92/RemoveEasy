import type {NavigationService} from "@/application/services/NavigationService.ts";
import type {ContactInfo, LanguageConfig} from "@/domain/types";

export class HeaderViewService {
    private navigationService: NavigationService;

    constructor(navigationService: NavigationService) {
        this.navigationService = navigationService;
    }

    getNavigationItems(t: (key: string) => string) {
        return this.navigationService.getNavigationItems(t);
    }

    getContactInfo(): ContactInfo {
        return {
            phone: '07405211912',
            whatsapp: 'https://wa.me/07405211912'
        };
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

        return {
            currentLocale,
            availableLocales,
            changeLanguage,
            getLanguageLabel
        };
    }
}