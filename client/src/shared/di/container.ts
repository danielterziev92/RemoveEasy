import {InventoryService, LocalizationService, TranslationService} from "@/application/services";
import {InventoryApiClient} from "@/infrastructure/clients";
import {RTKInventoryRepository} from "@/infrastructure/repositories";
import {store} from "@/infrastructure/store/store.ts";
import {
    INVENTORY_API_ERROR_KEYS,
    INVENTORY_ERROR_KEYS,
    INVENTORY_SERVICE_ERROR_KEYS,
    ITEM_ERROR_KEYS,
    SECTION_ERROR_KEYS
} from "@/shared/messages/error_messages.ts";
import {API_CONFIG} from "../constants/api.ts";

// Localization layer
export const localizationService = new LocalizationService(store);
export const translationService = new TranslationService(localizationService);

// Infrastructure layer
export const inventoryApiClient = new InventoryApiClient(
    API_CONFIG.BASE_URL,
    INVENTORY_API_ERROR_KEYS,
    translationService
);

export const inventoryRepository = new RTKInventoryRepository(store, INVENTORY_ERROR_KEYS, translationService);

// Application layer
export const inventoryService = new InventoryService(
    inventoryRepository,
    inventoryApiClient,
    INVENTORY_SERVICE_ERROR_KEYS,
    SECTION_ERROR_KEYS,
    ITEM_ERROR_KEYS,
    translationService
);
