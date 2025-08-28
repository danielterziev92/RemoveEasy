import type {IItemsCollection} from "../abstract/IItemsCollection.ts";
import {Item} from "./Item.ts";
import {Section} from "./Section.ts";

export class ItemsCollection implements IItemsCollection {
    public static readonly MIN_ITEMS_COUNT = 0;
    public static readonly MAX_ITEMS_COUNT = 1000;

    private _items: Item[];

    constructor(items: Item[] = []) {
        this.validateAndAssign(items);

        this._items = items;
    }

    get items(): Item[] {
        return [...this._items];
    }

    /**
     * Validates input parameters and throws errors if invalid
     */
    private validateAndAssign(items: Item[]): void {
        if (!Array.isArray(items)) {
            throw new Error('Items must be an array');
        }

        if (items.length < ItemsCollection.MIN_ITEMS_COUNT) {
            throw new Error(`Items count must be at least ${ItemsCollection.MIN_ITEMS_COUNT}`);
        }

        if (items.length > ItemsCollection.MAX_ITEMS_COUNT) {
            throw new Error(`Items count must not exceed ${ItemsCollection.MAX_ITEMS_COUNT}`);
        }

        items.forEach((item, index) => {
            if (!item || !item.isValid()) {
                throw new Error(`Item at index ${index} is invalid`);
            }
        });

        const ids = items.map(item => item.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
            throw new Error('Duplicate item IDs are not allowed');
        }
    }

    /**
     * Creates an ItemsCollection instance from a plain object (JSON)
     */
    static fromObject(obj: unknown): ItemsCollection {
        if (!obj || typeof obj !== 'object') {
            throw new Error('Invalid object provided for ItemsCollection creation');
        }

        const data = obj as Record<string, unknown>;

        if (!Array.isArray(data.items)) {
            throw new Error('Invalid items array provided for ItemsCollection creation');
        }

        const items = data.items.map((itemData: unknown, index: number) => {
            if (!itemData || typeof itemData !== 'object') {
                throw new Error(`Invalid item data at index ${index}`);
            }

            const itemObj = itemData as Record<string, unknown>;
            if (!itemObj.section) {
                throw new Error(`Missing section data for item at index ${index}`);
            }

            try {
                const section = Section.fromObject(itemObj.section);
                return Item.fromObject(itemData, section);
            } catch (error) {
                throw new Error(`Failed to create item at index ${index}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        });

        return new ItemsCollection(items);
    }

    /**
     * Gets all items from a specific section
     */
    getItemsBySection(sectionId: number): Item[] {
        return this._items.filter(item => item.belongsToSection(sectionId));
    }

    /**
     * Gets all unique sections from items
     */
    getUniqueSections(): Section[] {
        const sections = new Map<number, Section>();
        this._items.forEach(item => {
            sections.set(item.section.id, item.section);
        });
        return Array.from(sections.values());
    }

    /**
     * Adds an item to the collection
     */
    addItem(item: Item): void {
        if (!item || !item.isValid()) {
            throw new Error('Invalid item provided');
        }

        if (this.findById(item.id)) {
            throw new Error(`Item with ID ${item.id} already exists`);
        }

        if (this._items.length >= ItemsCollection.MAX_ITEMS_COUNT) {
            throw new Error(`Cannot add item: maximum items count of ${ItemsCollection.MAX_ITEMS_COUNT} reached`);
        }

        this._items.push(item);
    }

    /**
     * Removes an item by id
     */
    removeItem(itemId: number): boolean {
        if (itemId < 1) {
            throw new Error('Item ID must be a positive number');
        }

        const index = this._items.findIndex(item => item.id === itemId);
        if (index > -1) {
            this._items.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Finds an item by id
     */
    findById(itemId: number): Item | undefined {
        if (itemId < 1) {
            throw new Error('Item ID must be a positive number');
        }

        return this._items.find(item => item.id === itemId);
    }

    /**
     * Gets the count of items
     */
    getItemCount(): number {
        return this._items.length;
    }

    /**
     * Converts to a plain object for JSON serialization
     */
    toObject(): { items: unknown[] } {
        return {
            items: this._items.map(item => item.toObject())
        };
    }

    /**
     * Validates the entire collection
     */
    isValid(): boolean {
        return Array.isArray(this._items) &&
            this._items.every(item => item.isValid());
    }

    /**
     * Clears all items from the collection
     */
    clear(): void {
        this._items = [];
    }
}