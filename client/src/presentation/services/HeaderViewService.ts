import {ContactInfo} from "@/domain/value-objects";

import type {NavigationService} from "@/application/services/NavigationService.ts";

import {ContactInfoDto, type LanguageConfigDto, LocaleDisplayDto} from "@/presentation/dto";
import type {ILocalizationService} from "@/application/services";

export class HeaderViewService {
    private navigationService: NavigationService;
    private localizationService: ILocalizationService;

    constructor(
        navigationService: NavigationService,
        localizationService: ILocalizationService
    ) {
        this.navigationService = navigationService;
        this.localizationService = localizationService;
    }

    getNavigationItems(t: (key: string) => string) {
        return this.navigationService.getNavigationItems(t);
    }

    getContactInfo(): ContactInfoDto {
        const contactInfo = new ContactInfo('07405211912');
        return {
            phone: contactInfo.phone,
            whatsapp: contactInfo.whatsapp
        };
    }

    createLanguageConfig(
        changeLanguage: (localeCode: string) => Promise<{ success: boolean; message?: string }>
    ): LanguageConfigDto {
        const currentLocale = this.localizationService.getCurrentLocale();
        const availableLocales = this.localizationService.getAvailableLocales();

        return {
            currentLocale: this.mapLocaleToDto(currentLocale),
            availableLocales: availableLocales.map(locale => this.mapLocaleToDto(locale)),
            changeLanguage
        };
    }

    private mapLocaleToDto(locale: any): LocaleDisplayDto {
        return {
            code: locale.code,
            name: locale.name,
            nativeName: locale.nativeName,
            getDisplayLabel: () => locale.code.toUpperCase(),
            getFullName: () => locale.nativeName,
            hasCode: (code: string) => locale.code === code.toLowerCase()
        };
    }
}