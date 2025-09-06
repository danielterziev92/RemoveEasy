import {store} from "@/infrastructure/store/store.ts";
import {API_CONFIG} from "@/shared/constants/api.ts";
import {
    INVENTORY_API_ERROR_KEYS,
    INVENTORY_ERROR_KEYS,
    INVENTORY_SERVICE_ERROR_KEYS,
    ITEM_ERROR_KEYS,
    ORDER_API_ERROR_KEYS,
    SECTION_ERROR_KEYS
} from "@/shared/messages/error_messages.ts";
import {ApplicationContainer} from "@/shared/di/ApplicationContainer.ts";

// Get the singleton instance of ApplicationContainer
const applicationContainer = ApplicationContainer.getInstance();

// Initialize the container with all dependencies
applicationContainer.initialize(
    store,
    API_CONFIG.BASE_URL,
    {
        inventoryApi: INVENTORY_API_ERROR_KEYS,
        inventoryService: INVENTORY_SERVICE_ERROR_KEYS,
        inventoryRepository: INVENTORY_ERROR_KEYS,
        section: SECTION_ERROR_KEYS,
        item: ITEM_ERROR_KEYS,
        orderApi: ORDER_API_ERROR_KEYS,
    }
);

// Export convenient aliases for most commonly used services
export const localizationService = applicationContainer.localizationService;
export const translationService = applicationContainer.translationService;
export const manageInventoryUseCase = applicationContainer.manageInventoryUseCase;
export const createOrderUseCase = applicationContainer.createOrderUseCase;
export const navigationService = applicationContainer.navigationService;

export default applicationContainer;