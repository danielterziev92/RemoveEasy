import {IconClass, ItemId, SectionId} from "@/domain/value-objects";
import {Item, Locale} from "@/domain/entities";
import {DomainValidationError, SectionErrorCode} from "@/domain/errors";

export class Section {
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 100;

    public readonly id: SectionId;
    public readonly iconClass: IconClass;
    public readonly titleBg: string;
    public readonly titleEn: string;
    private readonly items: Map<string, Item>;

    /**
     * Private constructor to enforce factory method usage
     * @param id - Unique identifier
     * @param iconClass - IconClass value object
     * @param titleBg - Bulgarian title
     * @param titleEn - English title
     * @param items - Map of items (key: item ID, value: Item object)
     */
    private constructor(id: SectionId, iconClass: IconClass, titleBg: string, titleEn: string, items: Map<string, Item>) {
        this.id = id;
        this.iconClass = iconClass;
        this.titleBg = titleBg;
        this.titleEn = titleEn;
        this.items = items;
    }

    /**
     * Creates a new Section instance with validation
     * Automatically ensures item uniqueness by ID - duplicate IDs will be overwritten
     * @param params - The parameters for creating a section
     * @param params.id - The unique identifier for the section
     * @param params.iconClass - The CSS class name for the section's icon
     * @param params.titleBg - The Bulgarian title of the section
     * @param params.titleEn - The English title of the section
     * @param params.items - Array of items to add to the section (duplicates by ID will be ignored, last one wins)
     * @returns A new validated Section instance with unique items
     * @throws DomainValidationError if any of the parameters are invalid
     */
    static create(params: {
        id: SectionId,
        iconClass: IconClass,
        titleBg: string,
        titleEn: string,
        items: Item[]
    }): Section {
        Section.validate(params.titleBg, params.titleEn);

        const itemsMap = new Map<string, Item>();
        params.items.forEach(item => {
            itemsMap.set(item.id.toString(), item);
        });

        return new Section(params.id, params.iconClass, params.titleBg, params.titleEn, itemsMap);
    }

    /**
     * Validates and assigns the icon class, title values and items for a section
     * @param titleBg - The Bulgarian title of the section
     * @param titleEn - The English title of the section
     * @param items - Optional array of items for the section. Must contain at least 1 item if provided
     * @throws Error if iconClass, titleBg, titleEn is invalid or if an item array is empty
     */
    private static validate(titleBg: string, titleEn: string, items?: Item[]): void {
        const fields = [
            {value: titleBg, required: SectionErrorCode.TITLE_BG_REQUIRED, tooLong: SectionErrorCode.TITLE_BG_TOO_LONG},
            {value: titleEn, required: SectionErrorCode.TITLE_EN_REQUIRED, tooLong: SectionErrorCode.TITLE_EN_TOO_LONG}
        ];

        fields.forEach(({value, required, tooLong}) => {
            const trimmed = value.trim();

            if (!trimmed || trimmed.length < Section.MIN_STRING_LENGTH) {
                throw new DomainValidationError(required);
            }

            if (value.length > Section.MAX_STRING_LENGTH) {
                throw new DomainValidationError(tooLong);
            }
        });

        if (items && items.length < 1) {
            throw new DomainValidationError(SectionErrorCode.NO_ITEMS);
        }
    }

    /**
     * Retrieves a specific item by its ID
     * @param itemId - The ID of the item to retrieve
     * @returns The item if found, undefined otherwise
     */
    getItem(itemId: ItemId): Item | undefined {
        return this.items.get(itemId.toString());
    }

    /**
     * Gets all items in the section as an array
     * Items are returned in insertion order (Map maintains insertion order)
     * @returns An array containing all unique items in the section
     */
    getAllItems(): Item[] {
        return Array.from(this.items.values());
    }

    /**
     * Checks if the section has any items
     * @returns true if the section contains at least one item, false otherwise
     */
    hasItems(): boolean {
        return this.items.size > 0;
    }

    /**
     * Gets the total number of unique items in the section
     * @returns The count of unique items in the section
     */
    getItemCount(): number {
        return this.items.size;
    }

    /**
     * Searches for items by title in the specified locale
     * Performs case-insensitive partial matching on item titles
     * @param searchTerm - The search term to look for in item titles (case-insensitive)
     * @param locale - The locale to search in (defaults to Bulgarian)
     * @returns An array of items whose titles contain the search term
     */
    findItemsByTitle(searchTerm: string, locale?: Locale): Item[] {
        const term = searchTerm.toLowerCase();
        const targetLocale = locale ?? Locale.getDefault();

        return this.getAllItems().filter(item => {
            const title = item.getTitleByLocale(targetLocale).toLowerCase();
            return title.includes(term);
        });
    }

    /**
     * Gets the section title in the specified locale
     * @param locale - The locale to get the title for (defaults to Bulgarian)
     * @returns The section title in the requested locale
     */
    getTitleByLocale(locale?: Locale): string {
        const targetLocale = locale ?? Locale.getDefault();
        return targetLocale.hasCode(Locale.BULGARIAN_CODE) ? this.titleBg : this.titleEn;
    }

    /**
     * Converts the section to a plain object representation suitable for serialization
     * All items are also converted to their object representation
     * @returns A plain object containing all section data including serialized items
     */
    toObject() {
        return {
            id: this.id.value,
            iconClass: this.iconClass,
            titleBg: this.titleBg,
            titleEn: this.titleEn,
            items: this.getAllItems().map(item => item.toObject())
        };
    }
}
