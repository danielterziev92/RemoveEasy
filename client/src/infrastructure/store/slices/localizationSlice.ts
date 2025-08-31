import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface LocalizationState {
    currentLocale: string;
    isInitialized: boolean;
}

const initialState: LocalizationState = {
    currentLocale: 'bg', // Default fallback
    isInitialized: false,
};

const localizationSlice = createSlice({
    name: 'localization',
    initialState,
    reducers: {
        setLocale: (state, action: PayloadAction<string>) => {
            state.currentLocale = action.payload;
        },
        initializeLocalization: (state) => {
            state.isInitialized = true;
        },
    },
});

export const {setLocale, initializeLocalization} = localizationSlice.actions;
export default localizationSlice.reducer;
