export const API_CONFIG = {
    BASE_URL: "http://localhost:8000/api",
    ENDPOINTS: {
        INVENTORY_ITEMS: "/inventory/items",
        CREATE_ORDER: "/orders/create",
        SERVICES: "/services/"
    },
    TIMEOUT: 10000
} as const;