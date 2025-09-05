import type {OrderItems} from "@/domain/types";

export interface OrderData {
    customerFullName: string;
    phoneNumber: string;
    email: string;
    loadingTown: string;
    loadingPostcode: string;
    loadingStreet: string;
    loadingHouseNumber: string;
    loadingAddress: string;
    unloadingTown: string;
    unloadingPostcode: string;
    unloadingStreet: string;
    unloadingHouseNumber: string;
    unloadingAddress: string;
    items: OrderItems[];
}