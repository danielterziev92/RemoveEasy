import type {ISection} from "../abstract/ISection.ts";


export class Section implements ISection {
    public static readonly MIN_ID = 1;
    public static readonly MAX_STRING_LENGTH = 100;
    public static readonly MIN_STRING_LENGTH = 1;

    readonly id: number;
    readonly icon_class: string;
    readonly title: string;

    constructor(id: number, icon_class: string, title: string) {
        this.validateAndAssign(id, icon_class, title);

        this.id = id;
        this.icon_class = icon_class;
        this.title = title;
    }

    /**
     * Validates input parameters and throws errors if invalid
     */
    private validateAndAssign(id: number, icon_class: string, title: string): void {
        if (id < Section.MIN_ID) {
            throw new Error(`ID must be a number greater than or equal to ${Section.MIN_ID}`);
        }

        if (icon_class.trim().length < Section.MIN_STRING_LENGTH) {
            throw new Error(`Icon class must have at least ${Section.MIN_STRING_LENGTH} character(s)`);
        }
        if (icon_class.length > Section.MAX_STRING_LENGTH) {
            throw new Error(`Icon class must not exceed ${Section.MAX_STRING_LENGTH} characters`);
        }

        if (title.trim().length < Section.MIN_STRING_LENGTH) {
            throw new Error(`Title must have at least ${Section.MIN_STRING_LENGTH} character(s)`);
        }
        if (title.length > Section.MAX_STRING_LENGTH) {
            throw new Error(`Title must not exceed ${Section.MAX_STRING_LENGTH} characters`);
        }
    }


    /**
     * Creates a Section instance from a plain object
     */
    static fromObject(obj: unknown): Section {
        if (!obj || typeof obj !== 'object') {
            throw new Error('Invalid object provided for Section creation');
        }

        const data = obj as Record<string, unknown>;

        if (typeof data.id !== 'number' ||
            typeof data.icon_class !== 'string' ||
            typeof data.title !== 'string') {
            throw new Error('Invalid data types in object for Section creation');
        }

        return new Section(data.id, data.icon_class, data.title);
    }

    /**
     * Gets the display name for the section
     */
    getDisplayName(): string {
        return this.title;
    }

    /**
     * Converts the section to a plain object
     */
    toObject(): { id: number; icon_class: string; title: string } {
        return {
            id: this.id,
            icon_class: this.icon_class,
            title: this.title
        };
    }

    /**
     * Validates the section data
     */
    isValid(): boolean {
        try {
            this.validateAndAssign(this.id, this.icon_class, this.title);
            return true;
        } catch {
            return false;
        }
    }

}