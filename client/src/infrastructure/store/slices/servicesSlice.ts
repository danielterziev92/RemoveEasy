import {Services} from "@/domain/aggregates";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface ServicesState {
    services: Services | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ServicesState = {
    services: null,
    isLoading: false,
    error: null,
};

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setServices: (state, action: PayloadAction<Services>) => {
            state.services = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        clearServices: (state) => {
            state.services = null;
            state.error = null;
            state.isLoading = false;
        },
    },
});

export const {setLoading, setError, setServices, clearServices} = servicesSlice.actions;

export const selectServices = (state: { services: ServicesState }) => state.services.services;
export const selectIsLoading = (state: { services: ServicesState }) => state.services.isLoading;
export const selectError = (state: { services: ServicesState }) => state.services.error;

export const selectAllServices = (state: { services: ServicesState }) =>
    state.services.services?.getAllServices() ?? [];

export const selectActiveServices = (state: { services: ServicesState }) =>
    state.services.services?.getActiveServices() ?? [];

export default servicesSlice.reducer;