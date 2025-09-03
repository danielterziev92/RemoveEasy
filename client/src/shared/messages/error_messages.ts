import {createTranslationKeysAdapter} from "@/shared/localization/createTranslationKeysAdapter.ts";

import type {
    IInventoryErrorMessages,
    IInventoryServiceErrorMessages,
    IItemErrorMessages,
    ISectionErrorMessages
} from "@/application/types";

import type {IInventoryApiErrorMessages, IOrderApiErrorMessages} from "@/infrastructure/types";

export const ITEM_ERROR_KEYS: IItemErrorMessages = createTranslationKeysAdapter<IItemErrorMessages>("item.errors");
export const SECTION_ERROR_KEYS: ISectionErrorMessages = createTranslationKeysAdapter<ISectionErrorMessages>("section.errors");
export const INVENTORY_ERROR_KEYS: IInventoryErrorMessages = createTranslationKeysAdapter<IInventoryErrorMessages>("inventory.errors");
export const INVENTORY_SERVICE_ERROR_KEYS: IInventoryServiceErrorMessages = createTranslationKeysAdapter<IInventoryServiceErrorMessages>("inventory.errors");
export const INVENTORY_API_ERROR_KEYS: IInventoryApiErrorMessages = createTranslationKeysAdapter<IInventoryApiErrorMessages>("api.errors");
export const ORDER_API_ERROR_KEYS: IOrderApiErrorMessages = {
    ...createTranslationKeysAdapter<Pick<IOrderApiErrorMessages, 'serverError' | 'clientError' | 'networkError' | 'requestTimeout' | 'unknownError' | 'invalidResponse'>>('api.errors'),
    ...createTranslationKeysAdapter<Pick<IOrderApiErrorMessages, 'validationError' | 'orderCreationFailed'>>('order.api.errors')
};