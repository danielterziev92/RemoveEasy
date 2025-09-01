import {Item, Section} from "@/domain/entities";

export interface InventorySectionProps {
    section: Section;
    items: Item[];
    isOpen: boolean;
    quantities: Record<number, number>;
    onToggle: () => void;
    onIncreaseItem: (itemId: number) => void;
    onDecreaseItem: (itemId: number) => void;
}