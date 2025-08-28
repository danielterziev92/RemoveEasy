import type {IItem} from "./IItem.ts";
import type {ISection} from "./ISection.ts";

export interface IItemsCollection {
    readonly items: IItem[];

    /**
     * Gets all items from a specific section
     */
    getItemsBySection(sectionId: number): IItem[];

    /**
     * Gets all unique sections from items
     */
    getUniqueSections(): ISection[];

    /**
     * Adds an item to the collection
     */
    addItem(item: IItem): void;

    /**
     * Removes an item by id
     */
    removeItem(itemId: number): boolean;

    /**
     * Finds an item by id
     */
    findById(itemId: number): IItem | undefined;

    /**
     * Gets the count of items
     */
    getItemCount(): number;

    /**
     * Converts to a plain object for JSON serialization
     */
    toObject(): { items: any[] };

    /**
     * Validates the entire collection
     */
    isValid(): boolean;

    /**
     * Clears all items from the collection
     */
    clear(): void;
}