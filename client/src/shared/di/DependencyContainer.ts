import type {Store} from "@reduxjs/toolkit";

import {LocalizationDomainService} from "@/domain/services";

import {LocalizationService, TranslationService} from "@/application/services";
import {InitializeLocaleUseCase, SetLocaleUseCase} from "@/application/use-cases/localization";
import type {IInventoryServiceErrorMessages, IItemErrorMessages, ISectionErrorMessages} from "@/application/types";

import {InventoryApiClient} from "@/infrastructure/clients";
import {LocalStorageLocalizationRepository, RTKInventoryRepository} from "@/infrastructure/repositories";
import type {IInventoryApiErrorMessages} from "@/infrastructure/types";

export class DependencyContainer {
    private static instance: DependencyContainer;
    private initialized = false;

    // Domain Services
    private _localizationDomainService!: LocalizationDomainService;

    // Infrastructure
    private _localizationRepository!: LocalStorageLocalizationRepository;
    private _inventoryRepository!: RTKInventoryRepository;
    private _inventoryApiClient!: InventoryApiClient;

    // Use Cases
    private _setLocaleUseCase!: SetLocaleUseCase;
    private _initializeLocaleUseCase!: InitializeLocaleUseCase;

    // Application Services
    private _localizationService!: LocalizationService;
    private _translationService!: TranslationService;

    private constructor() {
    }

    public static getInstance(): DependencyContainer {
        if (!DependencyContainer.instance) {
            DependencyContainer.instance = new DependencyContainer();
        }
        return DependencyContainer.instance;
    }

    public initialize(
        store: Store,
        apiBaseUrl: string,
        errorMessages: {
            inventoryApi: IInventoryApiErrorMessages;
            inventoryService: IInventoryServiceErrorMessages;
            section: ISectionErrorMessages;
            item: IItemErrorMessages;
        }
    ): void {
        if (this.initialized) {
            console.warn('DependencyContainer already initialized');
            return;
        }

        // 1. Initialize Domain Services (no dependencies)
        this._localizationDomainService = new LocalizationDomainService();

        // 2. Initialize Infrastructure Repositories
        this._localizationRepository = new LocalStorageLocalizationRepository(store);

        // 3. Initialize Localization Use Cases
        this._setLocaleUseCase = new SetLocaleUseCase(
            this._localizationRepository,
            this._localizationDomainService
        );

        this._initializeLocaleUseCase = new InitializeLocaleUseCase(
            this._localizationRepository,
            this._localizationDomainService
        );

        // 4. Initialize Application Services - Localization
        this._localizationService = new LocalizationService(
            this._localizationRepository,
            this._localizationDomainService,
            this._setLocaleUseCase,
            this._initializeLocaleUseCase
        );

        this._translationService = new TranslationService(this._localizationService);

        // 5. Initialize Infrastructure - Inventory (needs translation service)
        this._inventoryRepository = new RTKInventoryRepository(
            store,
            errorMessages.inventory,
            this._translationService
        );

        this._inventoryApiClient = new InventoryApiClient(
            apiBaseUrl,
            errorMessages.inventoryApi,
            this._translationService
        );

        this.initialized = true;
        console.info('✅ DependencyContainer initialized successfully');
    }

    // Public Getters - Domain Services
    public get localizationDomainService(): LocalizationDomainService {
        this.ensureInitialized();
        return this._localizationDomainService;
    }

    // Public Getters - Application Services
    public get localizationService(): LocalizationService {
        this.ensureInitialized();
        return this._localizationService;
    }

    public get translationService(): TranslationService {
        this.ensureInitialized();
        return this._translationService;
    }

    // Public Getters - Use Cases (if needed for direct access)
    public get setLocaleUseCase(): SetLocaleUseCase {
        this.ensureInitialized();
        return this._setLocaleUseCase;
    }

    public get initializeLocaleUseCase(): InitializeLocaleUseCase {
        this.ensureInitialized();
        return this._initializeLocaleUseCase;
    }

    // Public Getters - Infrastructure (if needed for advanced cases)
    public get inventoryRepository(): RTKInventoryRepository {
        this.ensureInitialized();
        return this._inventoryRepository;
    }

    public get localizationRepository(): LocalStorageLocalizationRepository {
        this.ensureInitialized();
        return this._localizationRepository;
    }

    public get inventoryApiClient(): InventoryApiClient {
        this.ensureInitialized();
        return this._inventoryApiClient;
    }

    // Utility methods
    public isInitialized(): boolean {
        return this.initialized;
    }

    public reset(): void {
        this.initialized = false;
        console.info('🔄 DependencyContainer reset');
    }

    private ensureInitialized(): void {
        if (!this.initialized) {
            throw new Error(
                'DependencyContainer not initialized. Call initialize() first.'
            );
        }
    }
}

export const dependencyContainer = DependencyContainer.getInstance();