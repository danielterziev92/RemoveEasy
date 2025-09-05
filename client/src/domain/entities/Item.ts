import {IconClass, ItemId, Locale} from "@/domain/value-objects";
import {DomainValidationError, ItemErrorCode} from "@/domain/errors";

export class Item {
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 100;

    public readonly id: ItemId;
    public readonly iconClass: IconClass;
    public readonly titleBg: string;
    public readonly titleEn: string;

    /**
     * Private constructor to enforce factory method usage
     * @param id - Unique identifier
     * @param iconClass - IconClass value object
     * @param titleBg - Bulgarian title
     * @param titleEn - English title
     */
    private constructor(id: ItemId, iconClass: IconClass, titleBg: string, titleEn: string) {
        this.id = id;
        this.iconClass = iconClass;
        this.titleBg = titleBg;
        this.titleEn = titleEn;
    }

    /**
     * Creates a new Item instance with validation and sanitization
     * @param params - The parameters for creating an item
     * @param params.id - The unique identifier for the item
     * @param params.iconClass - The CSS class name for the item's icon (will be trimmed)
     * @param params.titleBg - The Bulgarian title of the item (will be trimmed)
     * @param params.titleEn - The English title of the item (will be trimmed)
     * @returns A new validated Item instance with trimmed string values
     * @throws {DomainValidationError} if any parameter is invalid (empty, too short, or too long)
     */
    static create(params: {
        id: ItemId,
        iconClass: IconClass,
        titleBg: string,
        titleEn: string
    }): Item {
        Item.validate(params.titleBg, params.titleEn);

        return new Item(params.id, params.iconClass, params.titleBg.trim(), params.titleEn.trim())
    }

    /**
     * Validates the item's icon class and titles
     * @param titleBg - The Bulgarian title of the item
     * @param titleEn - The English title of the item
     * @throws {DomainValidationError} if any parameter is invalid
     */
    private static validate(titleBg: string, titleEn: string): void {
        const fields = [
            {value: titleBg, required: ItemErrorCode.TITLE_BG_REQUIRED, tooLong: ItemErrorCode.TITLE_BG_TOO_LONG},
            {value: titleEn, required: ItemErrorCode.TITLE_EN_REQUIRED, tooLong: ItemErrorCode.TITLE_EN_TOO_LONG}
        ];

        fields.forEach(({value, required, tooLong}) => {
            const trimmed = value.trim();

            if (!trimmed || trimmed.length < Item.MIN_STRING_LENGTH) {
                throw new DomainValidationError(required);
            }

            if (value.length > Item.MAX_STRING_LENGTH) {
                throw new DomainValidationError(tooLong);
            }
        });
    }

    /**
     * Gets the title for the item based on current locale
     * @param locale - The locale to get the title for (defaults to Bulgarian)
     * @returns The item's title in the appropriate language
     */
    getTitleByLocale(locale?: Locale): string {
        const targetLocale = locale ?? Locale.getDefault();
        return targetLocale.hasCode(Locale.BULGARIAN_CODE) ? this.titleBg : this.titleEn;
    }

    /**
     * Converts the Item instance to a plain object for serialization
     * @returns A plain object containing all item properties:
     *   - id: The unwrapped identifier value
     *   - iconClass: CSS class for the icon
     *   - titleBg: Bulgarian title
     *   - titleEn: English title
     */
    toObject() {
        return {
            id: this.id.value,
            iconClass: this.iconClass,
            titleBg: this.titleBg,
            titleEn: this.titleEn,
        };
    }
}