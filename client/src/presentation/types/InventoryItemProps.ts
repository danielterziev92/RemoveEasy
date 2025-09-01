import {Item} from "@/domain/entities";

export interface InventoryItemProps {
    item: Item;
    quantity: number;
    onIncrease: (itemId: number) => void;
    onDecrease: (itemId: number) => void;
}