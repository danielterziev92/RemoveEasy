import type {IItem} from "../abstract/IItem.ts";
import type {Section} from "./Section.ts";

export class Item implements IItem {
    public static readonly MIN_ID = 1;
    public static readonly MAX_STRING_LENGTH = 100;
    public static readonly MIN_STRING_LENGTH = 1;

    readonly id: number;
    readonly icon_class: string;
    readonly title: string;
    readonly section: Section;

    constructor(id: number, icon_class: string, title: string, section: Section) {
        this.validateAndAssign(id, icon_class, title, section);

        this.id = id;
        this.icon_class = icon_class;
        this.title = title;
        this.section = section;
    }

    /**
     * Validates input parameters and throws errors if invalid
     */
    private validateAndAssign(id: number, icon_class: string, title: string, section: Section): void {
        if (id < Item.MIN_ID) {
            throw new Error(`ID must be a number greater than or equal to ${Item.MIN_ID}`);
        }

        if (icon_class.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(`Icon class must have at least ${Item.MIN_STRING_LENGTH} character(s)`);
        }
        if (icon_class.length > Item.MAX_STRING_LENGTH) {
            throw new Error(`Icon class must not exceed ${Item.MAX_STRING_LENGTH} characters`);
        }

        if (title.trim().length < Item.MIN_STRING_LENGTH) {
            throw new Error(`Title must have at least ${Item.MIN_STRING_LENGTH} character(s)`);
        }
        if (title.length > Item.MAX_STRING_LENGTH) {
            throw new Error(`Title must not exceed ${Item.MAX_STRING_LENGTH} characters`);
        }

        if (!section || !section.isValid()) {
            throw new Error('Section is required and must be valid');
        }
    }


    /**
     * Creates an Item instance from a plain object
     */
    static fromObject(obj: unknown, section: Section): Item {
        if (!obj || typeof obj !== 'object') {
            throw new Error('Invalid object provided for Item creation');
        }

        const data = obj as Record<string, unknown>;

        if (typeof data.id !== 'number' ||
            typeof data.icon_class !== 'string' ||
            typeof data.title !== 'string') {
            throw new Error('Invalid data types in object for Item creation');
        }

        return new Item(data.id, data.icon_class, data.title, section);
    }

    /**
     * Gets a full display name including a section
     */
    getFullDisplayName(): string {
        return `${this.title} (${this.section.getDisplayName()})`;
    }

    /**
     * Checks if an item belongs to a specific section
     */
    belongsToSection(sectionId: number): boolean {
        return this.section.id === sectionId;
    }

    /**
     * Converts the item to a plain object
     */
    toObject(): { id: number; icon_class: string; title: string; section: any } {
        return {
            id: this.id,
            icon_class: this.icon_class,
            title: this.title,
            section: this.section.toObject()
        };
    }

    /**
     * Validates the item data
     */
    isValid(): boolean {
        try {
            this.validateAndAssign(this.id, this.icon_class, this.title, this.section);
            return true;
        } catch {
            return false;
        }
    }
}