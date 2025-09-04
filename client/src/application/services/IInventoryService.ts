import {Inventory} from "@/domain/aggregates";

export interface IInventoryService {

    /**
     * Fetches and returns complete inventory aggregate
     */
    findAll(): Promise<Inventory[]>;
}