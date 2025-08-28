import type {ISection} from "./ISection.ts";

export interface IItem {
    readonly id: number;
    readonly icon_class: string;
    readonly title: string;
    readonly section: ISection;

    /**
     * Gets a full display name including a section
     */
    getFullDisplayName(): string;

    /**
     * Checks if an item belongs to a specific section
     */
    belongsToSection(sectionId: number): boolean;

    /**
     * Converts the item to a plain object for JSON serialization
     */
    toObject(): { id: number; icon_class: string; title: string; section: any };

    /**
     * Validates the item data
     */
    isValid(): boolean;
}
