import {ItemId, SectionId} from "@/domain/value-objects";
import {Section} from "@/domain/aggregates/Section.ts";
import {Item} from "@/domain/entities";
import {DomainValidationError, InventoryErrorCode} from "@/domain/errors";
import type {InventoryApiData} from "@/domain/types";

export class Inventory {
    private readonly _sections: Map<string, Section> = new Map();

    private constructor(sections?: Section[]) {
        if (sections) {
            sections.forEach(section => this._sections.set(section.id.toString(), section));
        }
    }

    static create(sections?: Section[]): Inventory {
        return new Inventory(sections);
    }

    static fromApiData(data: InventoryApiData): Inventory {
        if (!data?.sections || !Array.isArray(data.sections)) {
            throw new DomainValidationError(InventoryErrorCode.DATA_INVALID);
        }

        if (data.sections.length === 0) {
            throw new DomainValidationError(InventoryErrorCode.SECTIONS_REQUIRED);
        }

        const sections: Section[] = [];

        data.sections.forEach(sectionData => {
            try {
                const section = Section.fromApiData(sectionData);
                sections.push(section);
            } catch (error) {
                console.warn('Skipping invalid section:', error);
            }
        });

        if (sections.length === 0) {
            throw new DomainValidationError(InventoryErrorCode.NO_VALID_SECTIONS);
        }

        return new Inventory(sections);
    }

    addSection(section: Section): void {
        this._sections.set(section.id.toString(), section);
    }

    removeSection(sectionId: SectionId): boolean {
        return this._sections.delete(sectionId.toString());
    }

    getSection(sectionId: SectionId): Section | undefined {
        return this._sections.get(sectionId.toString());
    }

    getAllSections(): Section[] {
        return Array.from(this._sections.values());
    }

    getAllItems(): Item[] {
        const allItems: Item[] = [];
        this._sections.forEach(section => {
            allItems.push(...section.getAllItems());
        });
        return allItems;
    }

    findItem(itemId: ItemId): { section: Section; item: Item } | undefined {
        for (const section of this._sections.values()) {
            const item = section.getItem(itemId);
            if (item) {
                return { section, item };
            }
        }
        return undefined;
    }

    getSectionsWithItems(): Section[] {
        return this.getAllSections().filter(section => section.hasItems());
    }

    findItemsByTitle(searchTerm: string, locale: string): Array<{ section: Section; item: Item }> {
        const results: Array<{ section: Section; item: Item }> = [];

        this._sections.forEach(section => {
            const matchingItems = section.findItemsByTitle(searchTerm, locale);
            matchingItems.forEach(item => {
                results.push({section, item});
            });
        });

        return results;
    }

    getTotalItemCount(): number {
        return Array.from(this._sections.values())
            .reduce((total, section) => total + section.getItemCount(), 0);
    }

    getSectionCount(): number {
        return this._sections.size;
    }

    toObject() {
        return {
            sections: this.getAllSections().map(section => section.toObject()),
            totalSections: this.getSectionCount(),
            totalItems: this.getTotalItemCount()
        };
    }
}