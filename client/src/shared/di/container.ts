import {InventoryApiClient} from "../../infrastructure/api/clients/InventoryApiClient";
import {RTKInventoryRepository} from "../../infrastructure/RTKInventoryRepository.ts";
import {InventoryService} from "../../application/services/InventoryService.ts";
import {store} from "../../application/store/store.ts";
import {TranslationService} from "../../application/services/TranslationService.ts";
import {
    INVENTORY_ERROR_KEYS,
    INVENTORY_SERVICE_ERROR_KEYS,
    ITEM_ERROR_KEYS,
    SECTION_ERROR_KEYS
} from "../../application/messages/error_messages.ts";

// Localization layer
export const translationService = new TranslationService();

// Infrastructure layer
export const inventoryApiClient = new InventoryApiClient();
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
