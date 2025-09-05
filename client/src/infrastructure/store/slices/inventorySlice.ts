import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

import {Inventory} from "@/domain/aggregates";

interface InventoryState {
    inventory: Inventory | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: InventoryState = {
    inventory: null,
    isLoading: false,
    error: null,
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setInventory: (state, action: PayloadAction<Inventory>) => {
            state.inventory = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        clearInventory: (state) => {
            state.inventory = null;
            state.error = null;
            state.isLoading = false;
        },
    },
});

export const {setLoading, setError, setInventory, clearInventory} = inventorySlice.actions;

export const selectInventory = (state: { inventory: InventoryState }) => state.inventory.inventory;
export const selectIsLoading = (state: { inventory: InventoryState }) => state.inventory.isLoading;
export const selectError = (state: { inventory: InventoryState }) => state.inventory.error;

export const selectSections = (state: { inventory: InventoryState }) =>
    state.inventory.inventory?.getAllSections() ?? [];

export const selectAllItems = (state: { inventory: InventoryState }) =>
    state.inventory.inventory?.getAllItems() ?? [];

export default inventorySlice.reducer;
