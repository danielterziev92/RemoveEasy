import type {ISectionErrorMessages} from "../../domain/types/ISectionErrorMessages.ts";
import {createTranslationKeysAdapter} from "../../shared/localization/createTranslationKeysAdapter.ts";

export class SectionErrorMessagesAdapter implements ISectionErrorMessages {
    private static readonly KEYS = createTranslationKeysAdapter<ISectionErrorMessages>('section.errors');

    get sectionIconRequired(): string {
        return SectionErrorMessagesAdapter.KEYS.sectionIconRequired;
    }

    get sectionIconTooLong(): string {
        return SectionErrorMessagesAdapter.KEYS.sectionIconTooLong;
    }

    get sectionTitleRequired(): string {
        return SectionErrorMessagesAdapter.KEYS.sectionTitleRequired;
    }

    get sectionTitleTooLong(): string {
        return SectionErrorMessagesAdapter.KEYS.sectionTitleTooLong;
    }

    get invalidSectionData(): string {
        return SectionErrorMessagesAdapter.KEYS.invalidSectionData;
    }
}
