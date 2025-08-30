import {configureStore} from "@reduxjs/toolkit";

import inventoryReducer from "./slices/inventorySlice";

export const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types because they contain class instances
                ignoredActions: ["inventory/setInventoryData"],
                // Ignore these field paths in all actions
                ignoredActionsPaths: ["payload.sections", "payload.items"],
                // Ignore these paths in the state
                ignoredPaths: ["inventory.sections", "inventory.items"],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;