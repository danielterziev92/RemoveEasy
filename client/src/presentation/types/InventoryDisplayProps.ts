export interface InventoryDisplayProps {
    onSelectedItemsChange?: (selectedItems: Array<{ itemId: number, quantity: number }>) => void;
}