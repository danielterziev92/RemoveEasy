import type {Section} from "./Section";

import type {IItemErrorMessages} from "@/application/types";

import type {ITranslationService} from "@/shared/localization/types";

export class Item {
    public static readonly MIN_ID = 1;
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 100;

    readonly id: number;
    readonly icon_class: string;
    readonly title: string;
    readonly section: Section;
    private errorMessages: IItemErrorMessages;
    private translationService: ITranslationService;

    constructor(
        id: number,
        icon_class: string,
        title: string,
        section: Section,
        errorMessages: IItemErrorMessages,
        translationService: ITranslationService
    ) {
        this.errorMessages = errorMessages;
        this.translationService = translationService;

        this.validate(id, icon_class, title, section);

        this.id = id;
        this.icon_class = icon_class;
        this.title = title;
        this.section = section;
    }

    /**
     * Validates the item's id, icon class, title and section
     * @param id - The unique identifier of the item
     * @param icon_class - The CSS class name for the item's icon
     * @param title - The display title of the item
     * @param section - The section to which this item belongs
     * @throws Error if any parameter is invalid
     */
    private validate(id: number, icon_class: string, title: string, section: Section): void {
        if (id < Item.MIN_ID) {
            throw new Error(this.translationService.t(this.errorMessages.itemIdRequired));
        }

        if (!icon_class || icon_class.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemIconRequired));
        }
        if (icon_class.length > Item.MAX_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemIconTooLong));
        }

        if (!title || title.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemTitleRequired));
        }
        if (title.length > Item.MAX_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.itemTitleTooLong));
        }

        if (!section || !section.isValid()) {
            throw new Error(this.translationService.t(this.errorMessages.itemSectionRequired));
        }
    }

    /**
     * Creates a new Item instance from API response data
     * @param itemData - The API response data containing id, icon_class and title
     * @param section - The section to which this item belongs
     * @param errorMessages - The error messages interface implementation
     * @param translationService - The translation service for error messages
     * @returns A new Item instance
     * @throws Error if itemData is invalid
     */
    static fromApiData(
        itemData: { id: number; icon_class: string; title: string },
        section: Section,
        errorMessages: IItemErrorMessages,
        translationService: ITranslationService
    ): Item {
        if (!itemData || typeof itemData !== 'object') {
            throw new Error(translationService.t(errorMessages.invalidItemData));
        }

        return new Item(itemData.id, itemData.icon_class, itemData.title, section, errorMessages, translationService);
    }

    /**
     * Gets the full display name including section information
     * @returns The item's title followed by section name in parentheses
     */
    getFullDisplayName(): string {
        return `${this.title} (${this.section.getDisplayName()})`;
    }

    /**
     * Checks if the item belongs to the specified section
     * @param sectionTitle - The section title to check against
     * @returns true if the item belongs to the section, false otherwise
     */
    belongsToSection(sectionTitle: string): boolean {
        return this.section.title === sectionTitle;
    }

    /**
     * Converts the item to a plain object including section data
     * @returns An object containing the item's id, icon_class, title and nested section object
     */
    toObject(): { id: number; icon_class: string; title: string; section: { icon_class: string; title: string } } {
        return {
            id: this.id,
            icon_class: this.icon_class,
            title: this.title,
            section: this.section.toObject()
        };
    }

    /**
     * Checks if the item's current state is valid
     * @returns true if valid, false otherwise
     */
    isValid(): boolean {
        try {
            this.validate(this.id, this.icon_class, this.title, this.section);
            return true;
        } catch {
            return false;
        }
    }
}