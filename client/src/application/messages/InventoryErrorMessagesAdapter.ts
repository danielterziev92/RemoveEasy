import type {IInventoryErrorMessages} from "../../domain/types/IInventoryErrorMessages";
import {createTranslationKeysAdapter} from "../../shared/localization/createTranslationKeysAdapter.ts";

export class InventoryErrorMessagesAdapter implements IInventoryErrorMessages {
    private static readonly KEYS = createTranslationKeysAdapter<IInventoryErrorMessages>('inventory.errors');

    get invalidSectionTitle(): string {
        return InventoryErrorMessagesAdapter.KEYS.invalidSectionTitle;
    }

    get invalidInventoryData(): string {
        return InventoryErrorMessagesAdapter.KEYS.invalidInventoryData;
    }

    get storeNotAvailable(): string {
        return InventoryErrorMessagesAdapter.KEYS.storeNotAvailable;
    }

    get dataFetchFailed(): string {
        return InventoryErrorMessagesAdapter.KEYS.dataFetchFailed;
    }
}