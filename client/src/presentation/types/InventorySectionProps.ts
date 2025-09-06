import type {ItemDisplayDto, SectionDisplayDto} from "@/presentation/dto";

export interface InventorySectionProps {
    section: SectionDisplayDto;
    items: ItemDisplayDto[];
    isOpen: boolean;
    quantities: Record<number, number>;
    onToggle: () => void;
    onIncreaseItem: (itemId: number) => void;
    onDecreaseItem: (itemId: number) => void;
}