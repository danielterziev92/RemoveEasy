export interface ISection {
    readonly id: number;
    readonly icon_class: string;
    readonly title: string;

    /**
     * Gets the display name for the section
     */
    getDisplayName(): string;

    /**
     * Converts the section to a plain object for JSON serialization
     */
    toObject(): { id: number; icon_class: string; title: string };

    /**
     * Validates the section data
     */
    isValid(): boolean;
}
