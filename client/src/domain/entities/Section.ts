import type {ISectionErrorMessages} from "../types/ISectionErrorMessages.ts";

export class Section {
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 100;

    readonly icon_class: string;
    readonly title: string;
    private errorMessages: ISectionErrorMessages;

    constructor(icon_class: string, title: string, errorMessages: ISectionErrorMessages) {
        this.validate(icon_class, title);
        this.icon_class = icon_class;
        this.title = title;
        this.errorMessages = errorMessages;
    }

    /**
     * Validates and assigns the icon class and title values
     * @param icon_class - The CSS class name for the section's icon
     * @param title - The display title of the section
     * @throws Error if icon_class or title is invalid
     */
    private validate(icon_class: string, title: string): void {
        if (!icon_class || icon_class.trim().length < Section.MIN_STRING_LENGTH) {
            throw new Error(this.errorMessages.sectionIconRequired);
        }
        if (icon_class.length > Section.MAX_STRING_LENGTH) {
            throw new Error(this.errorMessages.sectionIconRequired);
        }

        if (!title || title.trim().length < Section.MIN_STRING_LENGTH) {
            throw new Error(this.errorMessages.sectionIconTooLong);
        }
        if (title.length > Section.MAX_STRING_LENGTH) {
            throw new Error(this.errorMessages.sectionTitleTooLong);
        }
    }

    /**
     * Creates a new Section instance from API response data
     * @param data - The API response data containing icon_class and title
     * @param errorMessages - The error messages interface implementation
     * @returns A new Section instance
     * @throws Error if data is invalid
     */
    static fromApiData(data: { icon_class: string; title: string }, errorMessages: ISectionErrorMessages): Section {
        if (!data || typeof data !== 'object') {
            throw new Error(errorMessages.invalidSectionData);
        }
        return new Section(data.icon_class, data.title, errorMessages);
    }

    /**
     * Gets the display name for the section
     * @returns The section's title
     */
    getDisplayName(): string {
        return this.title;
    }

    /**
     * Converts the section to a plain object
     * @returns An object containing the section's icon_class and title
     */
    toObject(): { icon_class: string; title: string } {
        return {
            icon_class: this.icon_class,
            title: this.title
        };
    }

    /**
     * Checks if the section's current state is valid
     * @returns true if valid, false otherwise
     */
    isValid(): boolean {
        try {
            this.validate(this.icon_class, this.title);
            return true;
        } catch {
            return false;
        }
    }
}
