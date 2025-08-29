import type {Section} from "./Section";
import type {IItemErrorMessages} from "../types/IItemErrorMessages.ts";

export class Item {
    public static readonly MIN_ID = 1;
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 100;

    readonly id: number;
    readonly icon_class: string;
    readonly title: string;
    readonly section: Section;
    private errorMessages: IItemErrorMessages;

    constructor(id: number, icon_class: string, title: string, section: Section, errorMessages: IItemErrorMessages) {
        this.validate(id, icon_class, title, section);
        this.id = id;
        this.icon_class = icon_class;
        this.title = title;
        this.section = section;
        this.errorMessages = errorMessages;
    }

    private validate(id: number, icon_class: string, title: string, section: Section): void {
        if (id < Item.MIN_ID) {
            throw new Error(this.errorMessages.itemIdRequired);
        }

        if (!icon_class || icon_class.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(this.errorMessages.itemIconRequired);
        }
        if (icon_class.length > Item.MAX_STRING_LENGTH) {
            throw new Error(this.errorMessages.itemIconTooLong);
        }

        if (!title || title.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(this.errorMessages.itemTitleRequired);
        }
        if (title.length > Item.MAX_STRING_LENGTH) {
            throw new Error(this.errorMessages.itemTitleTooLong);
        }

        if (!section || !section.isValid()) {
            throw new Error(this.errorMessages.itemSectionRequired);
        }
    }

    static fromApiData(
        itemData: { id: number; icon_class: string; title: string },
        section: Section,
        errorMessages: IItemErrorMessages
    ): Item {
        if (!itemData || typeof itemData !== 'object') {
            throw new Error(errorMessages.invalidItemData);
        }

        return new Item(itemData.id, itemData.icon_class, itemData.title, section, errorMessages);
    }

    getFullDisplayName(): string {
        return `${this.title} (${this.section.getDisplayName()})`;
    }

    belongsToSection(sectionTitle: string): boolean {
        return this.section.title === sectionTitle;
    }

    toObject(): { id: number; icon_class: string; title: string; section: { icon_class: string; title: string } } {
        return {
            id: this.id,
            icon_class: this.icon_class,
            title: this.title,
            section: this.section.toObject()
        };
    }

    isValid(): boolean {
        try {
            this.validate(this.id, this.icon_class, this.title, this.section);
            return true;
        } catch {
            return false;
        }
    }
}