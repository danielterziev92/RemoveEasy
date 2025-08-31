import type {Store} from "@reduxjs/toolkit";

import {LocalizationDomainService} from "@/domain/services";

import {InventoryService, LocalizationService, TranslationService} from "@/application/services";
import {InitializeLocaleUseCase, SetLocaleUseCase} from "@/application/use-cases/localization";
import {
    FetchAndStoreInventoryUseCase,
    FetchInventoryUseCase,
    GetCachedInventoryUseCase,
    StoreInventoryUseCase
} from "@/application/use-cases/inventory";
import type {
    IInventoryErrorMessages,
    IInventoryServiceErrorMessages,
    IItemErrorMessages,
    ISectionErrorMessages
} from "@/application/types";

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

    // Use Cases - Localization
    private _setLocaleUseCase!: SetLocaleUseCase;
    private _initializeLocaleUseCase!: InitializeLocaleUseCase;

    // Use Cases - Inventory
    private _fetchInventoryUseCase!: FetchInventoryUseCase;
    private _storeInventoryUseCase!: StoreInventoryUseCase;
    private _fetchAndStoreInventoryUseCase!: FetchAndStoreInventoryUseCase;
    private _getCachedInventoryUseCase!: GetCachedInventoryUseCase;

    // Application Services
    private _localizationService!: LocalizationService;
    private _translationService!: TranslationService;
    private _inventoryService!: InventoryService;

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
            inventoryRepository: IInventoryErrorMessages;
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
            errorMessages.inventoryRepository,
            this._translationService
        );

        this._inventoryApiClient = new InventoryApiClient(
            apiBaseUrl,
            errorMessages.inventoryApi,
            this._translationService
        );

        // 6. Initialize Inventory Use Cases
        this._fetchInventoryUseCase = new FetchInventoryUseCase(
            this._inventoryApiClient,
            errorMessages.inventoryService,
            errorMessages.section,
            errorMessages.item,
            this._translationService
        );

        this._storeInventoryUseCase = new StoreInventoryUseCase(
            this._inventoryRepository
        );

        this._getCachedInventoryUseCase = new GetCachedInventoryUseCase(
            this._inventoryRepository
        );

        this._fetchAndStoreInventoryUseCase = new FetchAndStoreInventoryUseCase(
            this._inventoryRepository,
            errorMessages.inventoryService,
            this._translationService,
            this._fetchInventoryUseCase,
            this._storeInventoryUseCase
        );

        // 7. Initialize Application Services - Inventory
        this._inventoryService = new InventoryService(
            this._fetchAndStoreInventoryUseCase,
            this._getCachedInventoryUseCase
        );

        this.initialized = true;
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

    public get inventoryService(): InventoryService {
        this.ensureInitialized();
        return this._inventoryService;
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

    public get fetchInventoryUseCase(): FetchInventoryUseCase {
        this.ensureInitialized();
        return this._fetchInventoryUseCase;
    }

    public get storeInventoryUseCase(): StoreInventoryUseCase {
        this.ensureInitialized();
        return this._storeInventoryUseCase;
    }

    public get fetchAndStoreInventoryUseCase(): FetchAndStoreInventoryUseCase {
        this.ensureInitialized();
        return this._fetchAndStoreInventoryUseCase;
    }

    public get getCachedInventoryUseCase(): GetCachedInventoryUseCase {
        this.ensureInitialized();
        return this._getCachedInventoryUseCase;
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