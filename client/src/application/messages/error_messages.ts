import type {IItemErrorMessages} from "../../domain/types/IItemErrorMessages.ts";
import type {ISectionErrorMessages} from "../../domain/types/ISectionErrorMessages.ts";
import type {IInventoryErrorMessages} from "../../domain/types/IInventoryErrorMessages.ts";
import type {IInventoryServiceErrorMessages} from "../../domain/types/IInventoryServiceErrorMessages.ts";

import {createTranslationKeysAdapter} from "../../shared/localization/createTranslationKeysAdapter.ts";

export const ITEM_ERROR_KEYS: IItemErrorMessages = createTranslationKeysAdapter<IItemErrorMessages>('item.errors');

export const SECTION_ERROR_KEYS: ISectionErrorMessages = createTranslationKeysAdapter<ISectionErrorMessages>('section.errors');

export const INVENTORY_ERROR_KEYS: IInventoryErrorMessages = createTranslationKeysAdapter<IInventoryErrorMessages>('inventory.errors');

export const INVENTORY_SERVICE_ERROR_KEYS: IInventoryServiceErrorMessages = createTranslationKeysAdapter<IInventoryServiceErrorMessages>('inventory.errors');
