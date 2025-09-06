import type {ItemDisplayDto} from "@/presentation/dto";

export interface InventoryItemProps {
    item: ItemDisplayDto;
    quantity: number;
    onIncrease: (itemId: number) => void;
    onDecrease: (itemId: number) => void;
}