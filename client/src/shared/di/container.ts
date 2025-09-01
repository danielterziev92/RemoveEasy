import {dependencyContainer} from "@/shared/di/DependencyContainer.ts";
import {store} from "@/infrastructure/store/store.ts";
import {API_CONFIG} from "@/shared/constants/api.ts";
import {
    INVENTORY_API_ERROR_KEYS,
    INVENTORY_SERVICE_ERROR_KEYS,
    INVENTORY_ERROR_KEYS,
    ITEM_ERROR_KEYS,
    SECTION_ERROR_KEYS
} from "@/shared/messages/error_messages.ts";

// Initialize the container with all dependencies
dependencyContainer.initialize(
    store,
    API_CONFIG.BASE_URL,
    {
        inventoryApi: INVENTORY_API_ERROR_KEYS,
        inventoryService: INVENTORY_SERVICE_ERROR_KEYS,
        inventoryRepository: INVENTORY_ERROR_KEYS,
        section: SECTION_ERROR_KEYS,
        item: ITEM_ERROR_KEYS,
    }
);

// Export convenient aliases for most commonly used services
export const localizationService = dependencyContainer.localizationService;
export const translationService = dependencyContainer.translationService;

// Export the container for advanced usage
export {dependencyContainer};

// Export specific use cases for direct access if needed
export const setLocaleUseCase = dependencyContainer.setLocaleUseCase;
export const initializeLocaleUseCase = dependencyContainer.initializeLocaleUseCase;
