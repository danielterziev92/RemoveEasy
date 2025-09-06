import {configureStore} from "@reduxjs/toolkit";

import inventoryReducer from "./slices/inventorySlice.ts";
import localizationReducer from "./slices/localizationSlice.ts";

export const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
        localization: localizationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types because they contain class instances
                ignoredActions: [
                    "inventory/setInventory",
                    "inventory/setInventoryData",
                ],
                // Ignore these field paths in all actions
                ignoredActionsPaths: [
                    "payload",
                    "payload.sections",
                    "payload.items"
                ],
                // Ignore these paths in the state
                ignoredPaths: [
                    "inventory.inventory",
                    "inventory.sections",
                    "inventory.items"
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;