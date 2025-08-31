import {Locale} from "@/domain/entities";
import {type ILocalizationService, LocalizationDomainService} from "@/domain/services";
import type {ILocalizationRepository} from "@/domain/repositories";

import {InitializeLocaleUseCase, SetLocaleUseCase} from "@/application/use-cases/localization";

export class LocalizationService implements ILocalizationService {
    private localizationRepository: ILocalizationRepository;
    private localizationDomainService: LocalizationDomainService;
    private setLocaleUseCase: SetLocaleUseCase;
    private initializeLocaleUseCase: InitializeLocaleUseCase;

    constructor(
        localizationRepository: ILocalizationRepository,
        localizationDomainService: LocalizationDomainService,
        setLocaleUseCase: SetLocaleUseCase,
        initializeLocaleUseCase: InitializeLocaleUseCase
    ) {
        this.localizationRepository = localizationRepository;
        this.localizationDomainService = localizationDomainService;
        this.setLocaleUseCase = setLocaleUseCase;
        this.initializeLocaleUseCase = initializeLocaleUseCase;
    }

    getCurrentLocale(): string {
        return this.localizationRepository.getCurrentLocale();
    }

    setCurrentLocale(locale: string): void {
        const result = this.setLocaleUseCase.execute(locale);

        if (!result.success) {
            console.warn(result.message);
        }
    }

    getSavedLocale(): string | null {
        return this.localizationRepository.getSavedLocale();
    }

    saveLocale(locale: string): void {
        this.localizationRepository.saveLocale(locale);
    }

    getAvailableLocales(): Locale[] {
        return this.localizationDomainService.getAvailableLocales();
    }

    detectBrowserLocale(): string {
        const browserLocale = navigator.language.split("-")[0];
        return this.localizationDomainService.detectBestLocale(browserLocale);
    }

    initializeLocale(): void {
        this.initializeLocaleUseCase.execute();
    }
}