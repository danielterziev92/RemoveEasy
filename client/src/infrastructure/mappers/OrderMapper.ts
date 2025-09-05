import type {OrderData} from "@/domain/types";
import type {OrderApiData} from "@/infrastructure/types";

export class OrderMapper {
    static domainToApi(domainData: OrderData): OrderApiData {
        return {
            customer_full_name: domainData.customerFullName,
            phone_number: domainData.phoneNumber,
            email: domainData.email,
            loading_town: domainData.loadingTown,
            loading_postal_code: domainData.loadingPostcode,
            loading_street: domainData.loadingStreet,
            loading_house_number: domainData.loadingHouseNumber,
            loading_address: domainData.loadingAddress,
            unloading_town: domainData.unloadingTown,
            unloading_postal_code: domainData.unloadingPostcode,
            unloading_street: domainData.unloadingStreet,
            unloading_house_number: domainData.unloadingHouseNumber,
            unloading_address: domainData.unloadingAddress,
            description: "",
            items: domainData.items.map(item => ({
                itemId: item.id,
                quantity: item.quantity
            }))
        }
    }
}