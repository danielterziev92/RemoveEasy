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

    getCurrentLocale(): Locale {
        const localeCode = this.localizationRepository.getCurrentLocale();
        return this.localizationDomainService.getLocaleByCode(localeCode) ?? Locale.getDefault();
    }

    setCurrentLocale(locale: Locale): void {
        const result = this.setLocaleUseCase.execute(locale.code);
        if (!result.success) {
            console.warn(result.message);
        }
    }

    getSavedLocale(): Locale | null {
        const savedCode = this.localizationRepository.getSavedLocale();
        return savedCode ? this.localizationDomainService.getLocaleByCode(savedCode) : null;
    }

    saveLocale(locale: Locale): void {
        this.localizationRepository.saveLocale(locale.code);
    }

    getAvailableLocales(): Locale[] {
        return this.localizationDomainService.getAvailableLocales();
    }

    initializeLocale(): void {
        this.initializeLocaleUseCase.execute();
    }
}