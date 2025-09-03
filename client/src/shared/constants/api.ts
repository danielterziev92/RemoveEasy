export const API_CONFIG = {
    BASE_URL: "http://localhost:8000/api",
    ENDPOINTS: {
        INVENTORY_ITEMS: "/inventory/items",
        CREATE_ORDER: "/orders/create",
    },
    TIMEOUT: 10000
} as const;