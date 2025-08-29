import type {IInventoryServiceErrorMessages} from "../../domain/types/IInventoryServiceErrorMessages.ts";
import {createTranslationKeysAdapter} from "../../shared/localization/createTranslationKeysAdapter.ts";

export class InventoryServiceErrorMessagesAdapter implements IInventoryServiceErrorMessages {
    private static readonly KEYS = createTranslationKeysAdapter<IInventoryServiceErrorMessages>('inventory.errors');

    get fetchError(): string {
        return InventoryServiceErrorMessagesAdapter.KEYS.fetchError;
    }

    get invalidApiResponse(): string {
        return InventoryServiceErrorMessagesAdapter.KEYS.invalidApiResponse;
    }

    get skippedInvalidItem(): string {
        return InventoryServiceErrorMessagesAdapter.KEYS.skippedInvalidItem;
    }

    get skippedInvalidSection(): string {
        return InventoryServiceErrorMessagesAdapter.KEYS.skippedInvalidSection;
    }

    get noValidSections(): string {
        return InventoryServiceErrorMessagesAdapter.KEYS.noValidSections;
    }
}
