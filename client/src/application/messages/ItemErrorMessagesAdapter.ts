import type {IItemErrorMessages} from "../../domain/types/IItemErrorMessages.ts";
import {createTranslationKeysAdapter} from "../../shared/localization/createTranslationKeysAdapter.ts";

export class ItemErrorMessagesAdapter implements IItemErrorMessages {
    private static readonly KEYS = createTranslationKeysAdapter<IItemErrorMessages>('item.errors');

    get itemIdRequired(): string {
        return ItemErrorMessagesAdapter.KEYS.itemIdRequired;
    }

    get itemIconRequired(): string {
        return ItemErrorMessagesAdapter.KEYS.itemIconRequired;
    }

    get itemIconTooLong(): string {
        return ItemErrorMessagesAdapter.KEYS.itemIconTooLong;
    }

    get itemTitleRequired(): string {
        return ItemErrorMessagesAdapter.KEYS.itemTitleRequired;
    }

    get itemTitleTooLong(): string {
        return ItemErrorMessagesAdapter.KEYS.itemTitleTooLong;
    }

    get itemSectionRequired(): string {
        return ItemErrorMessagesAdapter.KEYS.itemSectionRequired;
    }

    get invalidItemData(): string {
        return ItemErrorMessagesAdapter.KEYS.invalidItemData;
    }
}