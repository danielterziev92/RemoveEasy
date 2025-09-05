import {ItemId, Locale, SectionId} from "@/domain/value-objects";
import {Item, Section} from "@/domain/entities";

export class Inventory {
    private readonly sections: Map<string, Section> = new Map();

    /**
     * Private constructor to enforce factory method usage
     * @param sections - Optional array of sections to initialize the inventory with
     */
    private constructor(sections?: Section[]) {
        if (sections) {
            sections.forEach(section => this.sections.set(section.id.toString(), section));
        }
    }

    /**
     * Creates a new Inventory instance with optional initial sections
     * with duplicate IDs will be overwritten (last one wins)
     * @param sections - Optional array of sections to include in the inventory
     * @returns A new Inventory instance
     */
    static create(sections?: Section[]): Inventory {
        return new Inventory(sections);
    }

    /**
     * Adds a new section to the inventory or replaces an existing one with the same ID
     * @param section - The section to add to the inventory
     */
    addSection(section: Section): void {
        this.sections.set(section.id.toString(), section);
    }

    /**
     * Removes a section from the inventory by its ID
     * @param sectionId - The ID of the section to remove
     * @returns true if the section was found and removed, false otherwise
     */
    removeSection(sectionId: SectionId): boolean {
        return this.sections.delete(sectionId.toString());
    }

    /**
     * Retrieves a specific section by its ID
     * @param sectionId - The ID of the section to retrieve
     * @returns The section if found, undefined otherwise
     */
    getSection(sectionId: SectionId): Section | undefined {
        return this.sections.get(sectionId.toString());
    }

    /**
     * Gets all sections in the inventory as an array
     * Sections are returned in insertion order
     * @returns An array of all sections in the inventory
     */
    getAllSections(): Section[] {
        return Array.from(this.sections.values());
    }

    /**
     * Gets all items from all sections in the inventory
     * Items from different sections are combined into a single flat array
     * @returns An array containing all items from all sections
     */
    getAllItems(): Item[] {
        const allItems: Item[] = [];
        this.sections.forEach(section => {
            allItems.push(...section.getAllItems());
        });
        return allItems;
    }

    /**
     * Finds a specific item by its ID across all sections
     * @param itemId - The ID of the item to find
     * @returns An object containing both the section and item if found, undefined otherwise
     */
    findItem(itemId: ItemId): { section: Section; item: Item } | undefined {
        for (const section of this.sections.values()) {
            const item = section.getItem(itemId);
            if (item) {
                return {section, item};
            }
        }
        return undefined;
    }

    /**
     * Gets all sections that contain at least one item
     * Empty sections are filtered out from the result
     * @returns An array of sections that have items
     */
    getSectionsWithItems(): Section[] {
        return this.getAllSections().filter(section => section.hasItems());
    }

    /**
     * Searches for items by title across all sections using case-insensitive partial matching
     * @param searchTerm - The search term to look for in item titles (case-insensitive)
     * @param locale - The locale to search in (defaults to Bulgarian if not specified)
     * @returns An array of objects containing both the section and matching item
     */
    findItemsByTitle(searchTerm: string, locale?: Locale): Array<{ section: Section; item: Item }> {
        const results: Array<{ section: Section; item: Item }> = [];

        this.sections.forEach(section => {
            const matchingItems = section.findItemsByTitle(searchTerm, locale);
            matchingItems.forEach(item => {
                results.push({section, item});
            });
        });

        return results;
    }

    /**
     * Calculates the total number of items across all sections
     * @returns The total count of items in the entire inventory
     */
    getTotalItemCount(): number {
        return Array.from(this.sections.values())
            .reduce((total, section) => total + section.getItemCount(), 0);
    }

    /**
     * Gets the total number of sections in the inventory
     * @returns The count of sections in the inventory
     */
    getSectionCount(): number {
        return this.sections.size;
    }

    /**
     * Converts the entire inventory to a plain object suitable for serialization
     * All sections and their items are converted to their object representations
     * @returns A plain object containing all inventory data with summary statistics
     */
    toObject() {
        return {
            sections: this.getAllSections().map(section => section.toObject()),
            totalSections: this.getSectionCount(),
            totalItems: this.getTotalItemCount()
        };
    }
}