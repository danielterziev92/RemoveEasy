import {createTranslationKeysAdapter} from "../../shared/localization/createTranslationKeysAdapter.ts";

import type {
    IInventoryApiErrorMessages,
    IInventoryErrorMessages,
    IInventoryServiceErrorMessages,
    IItemErrorMessages,
    ISectionErrorMessages
} from "../../domain/types";

export const ITEM_ERROR_KEYS: IItemErrorMessages = createTranslationKeysAdapter<IItemErrorMessages>('item.errors');

export const SECTION_ERROR_KEYS: ISectionErrorMessages = createTranslationKeysAdapter<ISectionErrorMessages>('section.errors');

export const INVENTORY_ERROR_KEYS: IInventoryErrorMessages = createTranslationKeysAdapter<IInventoryErrorMessages>('inventory.errors');

export const INVENTORY_SERVICE_ERROR_KEYS: IInventoryServiceErrorMessages = createTranslationKeysAdapter<IInventoryServiceErrorMessages>('inventory.errors');

export const INVENTORY_API_ERROR_KEYS: IInventoryApiErrorMessages = createTranslationKeysAdapter<IInventoryApiErrorMessages>('api.errors');
