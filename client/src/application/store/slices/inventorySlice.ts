import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

import type {Item, Section} from "../../../domain/entities";

interface InventoryState {
    sections: Section[];
    items: Item[];
    isLoading: boolean;
    error: string | null;
}

const initialState: InventoryState = {
    sections: [],
    items: [],
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
        setInventoryData: (state, action: PayloadAction<{ sections: Section[]; items: Item[] }>) => {
            state.sections = action.payload.sections;
            state.items = action.payload.items;
            state.isLoading = false;
            state.error = null;
        },
        clearInventoryData: (state) => {
            state.sections = [];
            state.items = [];
            state.error = null;
            state.isLoading = false;
        },
    },
});

export const {setLoading, setError, setInventoryData, clearInventoryData} = inventorySlice.actions;

export const selectSections = (state: { inventory: InventoryState }) => state.inventory.sections;
export const selectItems = (state: { inventory: InventoryState }) => state.inventory.items;
export const selectIsLoading = (state: { inventory: InventoryState }) => state.inventory.isLoading;
export const selectError = (state: { inventory: InventoryState }) => state.inventory.error;

export default inventorySlice.reducer;
