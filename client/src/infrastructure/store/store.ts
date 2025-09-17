import {configureStore} from "@reduxjs/toolkit";

import inventoryReducer from "./slices/inventorySlice.ts";
import localizationReducer from "./slices/localizationSlice.ts";
import servicesReducer from "./slices/servicesSlice.ts";

export const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
        localization: localizationReducer,
        services: servicesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types because they contain class instances
                ignoredActions: [
                    "inventory/setInventory",
                    "inventory/setInventoryData",
                    "services/setServices",
                ],
                // Ignore these field paths in all actions
                ignoredActionsPaths: [
                    "payload",
                    "payload.sections",
                    "payload.items",
                    "payload.services",
                ],
                // Ignore these paths in the state
                ignoredPaths: [
                    "inventory.inventory",
                    "inventory.sections",
                    "inventory.items",
                    "services.services",
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;