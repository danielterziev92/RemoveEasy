import type {ISectionErrorMessages} from "@/application/types";
import type {ITranslationService} from "@/shared/localization/types";
import type {ILocalizationService} from "@/domain/services";

export class Section {
    public static readonly MIN_ID = 1;
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 100;

    readonly id: number;
    readonly icon_class: string;
    readonly title_bg: string;
    readonly title_en: string;
    private errorMessages: ISectionErrorMessages;
    private translationService: ITranslationService;
    private localizationService: ILocalizationService;

    constructor(
        id: number,
        icon_class: string,
        title_bg: string,
        title_en: string,
        errorMessages: ISectionErrorMessages,
        translationService: ITranslationService,
        localizationService: ILocalizationService
    ) {
        this.errorMessages = errorMessages;
        this.translationService = translationService;
        this.localizationService = localizationService;

        this.validate(id, icon_class, title_bg, title_en);

        this.id = id;
        this.icon_class = icon_class;
        this.title_bg = title_bg;
        this.title_en = title_en;
    }

    /**
     * Validates and assigns the icon class and title values
     * @param id - The unique identifier of the section
     * @param icon_class - The CSS class name for the section's icon
     * @param title_bg - The Bulgarian title of the section
     * @param title_en - The English title of the section
     * @throws Error if icon_class, title_bg or title_en is invalid
     */
    private validate(id: number, icon_class: string, title_bg: string, title_en: string): void {
        if (id < Section.MIN_ID) {
            throw new Error(this.translationService.t(this.errorMessages.sectionIdRequired));
        }

        if (!icon_class || icon_class.trim().length < Section.MIN_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.sectionIconRequired));
        }
        if (icon_class.length > Section.MAX_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.sectionIconTooLong));
        }

        if (!title_bg || title_bg.trim().length < Section.MIN_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.sectionTitleRequired));
        }
        if (title_bg.length > Section.MAX_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.sectionTitleTooLong));
        }

        if (!title_en || title_en.trim().length < Section.MIN_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.sectionTitleRequired));
        }
        if (title_en.length > Section.MAX_STRING_LENGTH) {
            throw new Error(this.translationService.t(this.errorMessages.sectionTitleTooLong));
        }
    }

    /**
     * Creates a new Section instance from API response data
     * @param data - The API response data containing icon_class, title_bg and title_en
     * @param errorMessages - The error messages interface implementation
     * @param translationService - The translation service for error messages
     * @param localizationService - The localization service for getting current locale
     * @returns A new Section instance
     * @throws Error if data is invalid
     */
    static fromApiData(
        data: { id: number, icon_class: string; title_bg: string; title_en: string },
        errorMessages: ISectionErrorMessages,
        translationService: ITranslationService,
        localizationService: ILocalizationService
    ): Section {
        if (!data || typeof data !== 'object') {
            throw new Error(translationService.t(errorMessages.invalidSectionData));
        }
        return new Section(
            data.id,
            data.icon_class,
            data.title_bg,
            data.title_en,
            errorMessages,
            translationService,
            localizationService
        );
    }

    /**
     * Gets the display name for the section based on current locale
     * @returns The section's title in the appropriate language
     */
    getDisplayName(): string {
        const currentLocale = this.localizationService.getCurrentLocale();
        return currentLocale === 'bg' ? this.title_bg : this.title_en;
    }

    /**
     * Gets the title property (for backward compatibility)
     * @returns The section's title in the appropriate language
     */
    get title(): string {
        return this.getDisplayName();
    }

    /**
     * Converts the section to a plain object
     * @returns An object containing the section's icon_class, title_bg and title_en
     */
    toObject(): { id: number, icon_class: string; title_bg: string; title_en: string } {
        return {
            id: this.id,
            icon_class: this.icon_class,
            title_bg: this.title_bg,
            title_en: this.title_en
        };
    }

    /**
     * Checks if the section's current state is valid
     * @returns true if valid, false otherwise
     */
    isValid(): boolean {
        try {
            this.validate(this.id, this.icon_class, this.title_bg, this.title_en);
            return true;
        } catch {
            return false;
        }
    }
}
