import type {Section} from "@/domain/entities/Section.ts";
import type {ILocalizationService} from "@/domain/services";

import type {IItemErrorMessages} from "@/application/types";

import type {ITranslationService} from "@/shared/localization/types";

export class Item {
    public static readonly MIN_ID = 1;
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 100;

    readonly id: number;
    readonly icon_class: string;
    readonly title_bg: string;
    readonly title_en: string;
    readonly section: Section;
    private errorMessages: IItemErrorMessages;
    private translationService: ITranslationService;
    private localizationService: ILocalizationService;

    constructor(
        id: number,
        icon_class: string,
        title_bg: string,
        title_en: string,
        section: Section,
        errorMessages: IItemErrorMessages,
        translationService: ITranslationService,
        localizationService: ILocalizationService
    ) {
        this.errorMessages = errorMessages;
        this.translationService = translationService;
        this.localizationService = localizationService;

        this.validate(id, icon_class, title_bg, title_en, section);

        this.id = id;
        this.icon_class = icon_class;
        this.title_bg = title_bg;
        this.title_en = title_en;
        this.section = section;
    }

    /**
     * Validates the item's id, icon class, titles and section
     * @param id - The unique identifier of the item
     * @param icon_class - The CSS class name for the item's icon
     * @param title_bg - The Bulgarian title of the item
     * @param title_en - The English title of the item
     * @param section - The section to which this item belongs
     * @throws Error if any parameter is invalid
     */
    private validate(id: number, icon_class: string, title_bg: string, title_en: string, section: Section): void {
        if (id < Item.MIN_ID) {
            throw new Error(this.translationService.t(this.errorMessages.itemIdRequired));
        }

        if (!icon_class || icon_class.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemIconRequired));
        }
        if (icon_class.length > Item.MAX_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemIconTooLong));
        }

        if (!title_bg || title_bg.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemTitleRequired));
        }
        if (title_bg.length > Item.MAX_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemTitleTooLong));
        }

        if (!title_en || title_en.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemTitleRequired));
        }
        if (title_en.length > Item.MAX_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemTitleTooLong));
        }

        if (!section || !section.isValid()) {
            throw new Error(this.translationService.t(this.errorMessages.itemSectionRequired));
        }
    }

    /**
     * Creates a new Item instance from API response data
     * @param itemData - The API response data containing id, icon_class, title_bg and title_en
     * @param section - The section to which this item belongs
     * @param errorMessages - The error messages interface implementation
     * @param translationService - The translation service for error messages
     * @param localizationService - The localization service for getting current locale
     * @returns A new Item instance
     * @throws Error if itemData is invalid
     */
    static fromApiData(
        itemData: { id: number; icon_class: string; title_bg: string; title_en: string },
        section: Section,
        errorMessages: IItemErrorMessages,
        translationService: ITranslationService,
        localizationService: ILocalizationService
    ): Item {
        if (!itemData || typeof itemData !== 'object') {
            throw new Error(translationService.t(errorMessages.invalidItemData));
        }

        return new Item(
            itemData.id,
            itemData.icon_class,
            itemData.title_bg,
            itemData.title_en,
            section,
            errorMessages,
            translationService,
            localizationService
        );
    }

    /**
     * Gets the display name for the item based on current locale
     * @returns The item's title in the appropriate language
     */
    getDisplayName(): string {
        const currentLocale = this.localizationService.getCurrentLocale();
        return currentLocale === 'bg' ? this.title_bg : this.title_en;
    }

    /**
     * Gets the title property (for backward compatibility)
     * @returns The item's title in the appropriate language
     */
    get title(): string {
        return this.getDisplayName();
    }

    /**
     * Gets the full display name including section information
     * @returns The item's title followed by section name in parentheses
     */
    getFullDisplayName(): string {
        return `${this.getDisplayName()} (${this.section.getDisplayName()})`;
    }

    /**
     * Checks if the item belongs to the specified section
     * @param sectionTitle - The section title to check against
     * @returns true if the item belongs to the section, false otherwise
     */
    belongsToSection(sectionTitle: string): boolean {
        return this.section.getDisplayName() === sectionTitle;
    }

    /**
     * Converts the item to a plain object including section data
     * @returns An object containing the item's id, icon_class, title_bg, title_en and nested section object
     */
    toObject(): {
        id: number;
        icon_class: string;
        title_bg: string;
        title_en: string;
        section: { icon_class: string; title_bg: string, title_en: string }
    } {
        return {
            id: this.id,
            icon_class: this.icon_class,
            title_bg: this.title_bg,
            title_en: this.title_en,
            section: this.section.toObject()
        };
    }

    /**
     * Checks if the item's current state is valid
     * @returns true if valid, false otherwise
     */
    isValid(): boolean {
        try {
            this.validate(this.id, this.icon_class, this.title_bg, this.title_en, this.section);
            return true;
        } catch {
            return false;
        }
    }
}