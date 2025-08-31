import type {ILocalizationRepository} from "@/domain/repositories";
import {LocalizationDomainService} from "@/domain/services";

export class InitializeLocaleUseCase {
    private localizationRepository: ILocalizationRepository;
    private localizationDomainService: LocalizationDomainService;

    constructor(
        localizationRepository: ILocalizationRepository,
        localizationDomainService: LocalizationDomainService
    ) {
        this.localizationRepository = localizationRepository;
        this.localizationDomainService = localizationDomainService;
    }

    execute(): string {
        const savedLocale = this.localizationRepository.getSavedLocale();

        if (savedLocale && this.localizationDomainService.isLocaleSupported(savedLocale)) {
            this.localizationRepository.setCurrentLocale(savedLocale);
            return savedLocale;
        }

        const browserLocale = this.detectBrowserLocale();
        const bestLocale = this.localizationDomainService.detectBestLocale(browserLocale);

        this.localizationRepository.setCurrentLocale(bestLocale);
        this.localizationRepository.saveLocale(bestLocale);

        return bestLocale;
    }

    private detectBrowserLocale(): string {
        if (typeof navigator !== 'undefined' && navigator.language) {
            return navigator.language;
        }
        return "bg";
    }
}
