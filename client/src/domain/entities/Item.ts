import type {Section} from "./Section";
import {ERROR_MESSAGES} from "../../shared/constants/errors.ts";

export class Item {
    public static readonly MIN_ID = 1;
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 100;

    readonly id: number;
    readonly icon_class: string;
    readonly title: string;
    readonly section: Section;

    constructor(id: number, icon_class: string, title: string, section: Section) {
        this.validate(id, icon_class, title, section);
        this.id = id;
        this.icon_class = icon_class;
        this.title = title;
        this.section = section;
    }

    private validate(id: number, icon_class: string, title: string, section: Section): void {
        if (id < Item.MIN_ID) {
            throw new Error(ERROR_MESSAGES.ITEM_ID_REQUIRED);
        }

        if (!icon_class || icon_class.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(ERROR_MESSAGES.ITEM_ICON_REQUIRED);
        }
        if (icon_class.length > Item.MAX_STRING_LENGTH) {
            throw new Error(`Иконата на елемента не трябва да надвишава ${Item.MAX_STRING_LENGTH} символа`);
        }

        if (!title || title.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(ERROR_MESSAGES.ITEM_TITLE_REQUIRED);
        }
        if (title.length > Item.MAX_STRING_LENGTH) {
            throw new Error(`Заглавието на елемента не трябва да надвишава ${Item.MAX_STRING_LENGTH} символа`);
        }

        if (!section || !section.isValid()) {
            throw new Error(ERROR_MESSAGES.ITEM_SECTION_REQUIRED);
        }
    }

    static fromApiData(itemData: { id: number; icon_class: string; title: string }, section: Section): Item {
        if (!itemData || typeof itemData !== 'object') {
            throw new Error(ERROR_MESSAGES.INVALID_ITEM_DATA);
        }
        return new Item(itemData.id, itemData.icon_class, itemData.title, section);
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