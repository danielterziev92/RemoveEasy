import type {SectionData} from "@/domain/types";

/**
 * API client interface for managing inventory operations.
 */
export interface IInventoryApiClient {

    /**
     * Fetches inventory data from the API.
     *
     * @returns {Promise<{ sections: SectionData[] }>} Promise resolving to inventory sections
     */
    fetchInventoryItems(): Promise<{ sections: SectionData[] }>;
}