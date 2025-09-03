import {ItemId, SectionId} from "@/domain/value-objects";
import {Item} from "@/domain/entities/Item.ts";
import {DomainValidationError, SectionErrorCode} from "@/domain/errors";

export class Section {
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 100;

    public readonly id: SectionId;
    public readonly iconClass: string;
    public readonly titleBg: string;
    public readonly titleEn: string;
    private readonly _items: Map<string, Item> = new Map();

    /**
     * Private constructor to enforce factory method usage
     * @param id - Unique identifier
     * @param iconClass - CSS class for icon
     * @param titleBg - Bulgarian title
     * @param titleEn - English title
     * @param items - Optional array of items to add to the section
     */
    private constructor(id: SectionId, iconClass: string, titleBg: string, titleEn: string, items?: Item[]) {
        this.id = id;
        this.iconClass = iconClass;
        this.titleBg = titleBg;
        this.titleEn = titleEn;

        if (items) {
            items.forEach(item => this._items.set(item.id.toString(), item));
        }
    }

    /**
     * Creates a new Section instance with validation
     * @param params - The parameters for creating a section
     * @param params.id - The unique identifier for the section
     * @param params.iconClass - The CSS class name for the section's icon
     * @param params.titleBg - The Bulgarian title of the section
     * @param params.titleEn - The English title of the section
     * @param params.items - Optional array of items to add to the section
     * @returns A new validated Section instance
     * @throws DomainValidationError if any of the parameters are invalid
     */
    static create(params: {
        id: SectionId,
        iconClass: string,
        titleBg: string,
        titleEn: string,
        items?: Item[]
    }): Section {
        Section.validate(params.iconClass, params.titleBg, params.titleEn);

        return new Section(params.id, params.iconClass, params.titleBg, params.titleEn, params.items);
    }

    /**
     * Validates and assigns the icon class, title values and items for a section
     * @param iconClass - The CSS class name for the section's icon
     * @param titleBg - The Bulgarian title of the section
     * @param titleEn - The English title of the section
     * @param items - Optional array of items for the section. Must contain at least 1 item if provided
     * @throws Error if iconClass, titleBg, titleEn is invalid or if an item array is empty
     */
    private static validate(iconClass: string, titleBg: string, titleEn: string, items?: Item[]): void {
        const fields = [
            {value: iconClass, required: SectionErrorCode.ICON_REQUIRED, tooLong: SectionErrorCode.ICON_TOO_LONG},
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
     * Creates a new Section instance from API response data
     * @param data - The API response data containing section properties and optional items array
     * @param data.id - The unique identifier for the section
     * @param data.icon_class - The CSS class name for the section's icon
     * @param data.title_bg - The Bulgarian title of the section
     * @param data.title_en - The English title of the section
     * @param data.items - Optional array of item data objects
     * @param data.items[].id - The unique identifier for each item
     * @param data.items[].icon_class - The CSS class name for each item's icon
     * @param data.items[].title_bg - The Bulgarian title for each item
     * @param data.items[].title_en - The English title for each item
     * @returns A new Section instance with valid items (invalid items are skipped with warnings)
     * @throws DomainValidationError if the main data object is invalid
     */
    static fromApiData(data: {
        id: number;
        icon_class: string;
        title_bg: string;
        title_en: string;
        items?: Array<{
            id: number;
            icon_class: string;
            title_bg: string;
            title_en: string;
        }>;
    }): Section {
        if (!data || typeof data !== 'object') {
            throw new DomainValidationError(SectionErrorCode.DATA_INVALID);
        }

        const items: Item[] = [];

        if (data.items && Array.isArray(data.items)) {
            data.items.forEach(itemData => {
                try {
                    const item = Item.create({
                        id: ItemId.create(itemData.id),
                        iconClass: itemData.icon_class,
                        titleBg: itemData.title_bg,
                        titleEn: itemData.title_en,
                    });
                    items.push(item);
                } catch (error) {
                    console.warn(`Skipping invalid item in section ${data.id}:`, error);
                }
            });
        }


        return Section.create({
            id: SectionId.create(data.id),
            iconClass: data.icon_class,
            titleBg: data.title_bg,
            titleEn: data.title_en,
            items
        });
    }

    /**
     * Adds a new item to the section
     * @param item - The item to add to the section
     */
    addItem(item: Item): void {
        this._items.set(item.id.toString(), item);
    }

    /**
     * Removes an item from the section by its ID
     * @param itemId - The ID of the item to remove
     * @returns true if the item was successfully removed, false if the item was not found
     */
    removeItem(itemId: ItemId): boolean {
        return this._items.delete(itemId.toString());
    }

    /**
     * Retrieves a specific item by its ID
     * @param itemId - The ID of the item to retrieve
     * @returns The item if found, undefined otherwise
     */
    getItem(itemId: ItemId): Item | undefined {
        return this._items.get(itemId.toString());
    }

    /**
     * Gets all items in the section as an array
     * @returns An array containing all items in the section
     */
    getAllItems(): Item[] {
        return Array.from(this._items.values());
    }

    /**
     * Checks if the section has any items
     * @returns true if the section contains at least one item, false otherwise
     */
    hasItems(): boolean {
        return this._items.size > 0;
    }

    /**
     * Gets the total number of items in the section
     * @returns The count of items in the section
     */
    getItemCount(): number {
        return this._items.size;
    }

    /**
     * Determines if new items can be added to this section
     * @returns false - this section type doesn't allow adding new items
     */
    canAddItem(): boolean {
        return false;
    }

    /**
     * Searches for items by title in the specified locale
     * @param searchTerm - The search term to look for in item titles
     * @param locale - The locale to search in ('bg' for Bulgarian, other values for English)
     * @returns An array of items whose titles contain the search term (case-insensitive)
     */
    findItemsByTitle(searchTerm: string, locale: string): Item[] {
        const term = searchTerm.toLowerCase();
        return this.getAllItems().filter(item => {
            const title = item.getTitleByLocale(locale).toLowerCase();
            return title.includes(term);
        });
    }

    /**
     * Gets the section title in the specified locale
     * @param locale - The locale to get the title for ('bg' for Bulgarian, other values for English)
     * @returns The section title in the requested locale
     */
    getTitleByLocale(locale: string): string {
        return locale === 'bg' ? this.titleBg : this.titleEn;
    }

    /**
     * Converts the section to a plain object representation
     * @returns A plain object containing all section data including items
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

    /**
     * Validates if the current section instance is valid
     * @returns true if the section passes validation, false otherwise
     */
    isValid(): boolean {
        try {
            Section.create({
                id: this.id,
                iconClass: this.iconClass,
                titleBg: this.titleBg,
                titleEn: this.titleEn
            });
            return true;
        } catch {
            return false;
        }
    }
}
