import type {AddressFormData} from "@/presentation/types/AddressFormData.ts";

export interface InventoryFormData {
    loadingAddress: AddressFormData;
    unloadingAddress: AddressFormData;
    additionalContext: string;
}