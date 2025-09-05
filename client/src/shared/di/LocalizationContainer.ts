import type {Store} from "@reduxjs/toolkit";

import {LocalizationDomainService} from "@/domain/services";

import {LocalizationService, TranslationService} from "@/application/services";
import {InitializeLocaleUseCase, SetLocaleUseCase} from "@/application/use-cases/localization";

import {LocalStorageLocalizationRepository} from "@/infrastructure/repositories";

import {bg, en} from "@/shared/localization/locales";

export class LocalizationContainer {
    private readonly _domainService: LocalizationDomainService;
    private readonly _repository: LocalStorageLocalizationRepository;
    private readonly _setLocaleUseCase: SetLocaleUseCase;
    private readonly _initializeLocaleUseCase: InitializeLocaleUseCase;
    private readonly _localizationService: LocalizationService;
    private readonly _translationService: TranslationService;

    constructor(store: Store) {
        this._domainService = new LocalizationDomainService();

        this._repository = new LocalStorageLocalizationRepository(store);

        this._setLocaleUseCase = new SetLocaleUseCase(this._repository, this._domainService);
        this._initializeLocaleUseCase = new InitializeLocaleUseCase(this._repository, this._domainService);

        this._localizationService = new LocalizationService(
            this._repository,
            this._domainService,
            this._setLocaleUseCase,
            this._initializeLocaleUseCase
        );

        this._translationService = new TranslationService(
            {bg, en},
            this._domainService,
            this._repository
        );
    }

    get localizationService(): LocalizationService {
        return this._localizationService;
    }

    get translationService(): TranslationService {
        return this._translationService;
    }

    get domainService(): LocalizationDomainService {
        return this._domainService;
    }
}