import type {Store} from "@reduxjs/toolkit";
import {NavigationService} from "@/application/services";
import {ApiContainer, InventoryContainer, LocalizationContainer, OrderContainer} from "@/shared/di";
import type {ErrorMessages} from "@/shared/types";
import {LucideIconValidator} from "@/infrastructure/validators";

export class ApplicationContainer {
    private static instance: ApplicationContainer;
    private initialized = false;

    private _localizationContainer!: LocalizationContainer;
    private _apiContainer!: ApiContainer;
    private _inventoryContainer!: InventoryContainer;
    private _orderContainer!: OrderContainer;
    private _navigationService!: NavigationService;
    private _iconValidator!: LucideIconValidator;

    private constructor() {
    }

    public static getInstance(): ApplicationContainer {
        if (!ApplicationContainer.instance) {
            ApplicationContainer.instance = new ApplicationContainer();
        }
        return ApplicationContainer.instance;
    }

    public initialize(
        store: Store,
        apiBaseUrl: string,
        errorMessages: ErrorMessages
    ): void {
        if (this.initialized) {
            console.warn('ApplicationContainer already initialized');
            return;
        }

        // Initialize icon validator
        this._iconValidator = new LucideIconValidator();

        this._localizationContainer = new LocalizationContainer(store);

        this._apiContainer = new ApiContainer(
            apiBaseUrl,
            {
                inventory: errorMessages.inventoryApi,
                order: errorMessages.orderApi,
            },
            this._localizationContainer.translationService,
            this._localizationContainer.localizationService
        );

        this._inventoryContainer = new InventoryContainer(
            store,
            this._apiContainer.inventoryApiClient,
            errorMessages.inventoryService,
            this._localizationContainer.translationService,
            this._iconValidator
        );

        this._orderContainer = new OrderContainer(
            this._apiContainer.orderApiClient,
            errorMessages.order,
            this._localizationContainer.translationService
        );

        this._navigationService = new NavigationService();

        this.initialized = true;
    }

    get localization() {
        this.ensureInitialized();
        return {
            service: this._localizationContainer.localizationService,
            translation: this._localizationContainer.translationService,
        };
    }

    get inventory() {
        this.ensureInitialized();
        return {
            manageUseCase: this._inventoryContainer.manageInventoryUseCase,
            repository: this._inventoryContainer.repository,
        };
    }

    get orders() {
        this.ensureInitialized();
        return {
            createUseCase: this._orderContainer.createOrderUseCase,
        };
    }

    get navigation() {
        this.ensureInitialized();
        return this._navigationService;
    }

    get translationService() {
        return this.localization.translation;
    }

    get localizationService() {
        return this.localization.service;
    }

    get manageInventoryUseCase() {
        return this.inventory.manageUseCase;
    }

    get createOrderUseCase() {
        return this.orders.createUseCase;
    }

    get navigationService() {
        return this.navigation;
    }

    get iconValidator() {
        this.ensureInitialized();
        return this._iconValidator;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    private ensureInitialized(): void {
        if (!this.initialized) {
            throw new Error(
                'ApplicationContainer not initialized. Call initialize() first.'
            );
        }
    }
}