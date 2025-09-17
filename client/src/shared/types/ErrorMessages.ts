import type {
    IInventoryErrorMessages,
    IInventoryServiceErrorMessages,
    IItemErrorMessages,
    IOrderErrorMessages,
    ISectionErrorMessages,
    IServicesErrorMessages,
    IServicesServiceErrorMessages
} from "@/application/types";

import type {
    IInventoryApiErrorMessages,
    IOrderApiErrorMessages,
    IServicesApiErrorMessages
} from "@/infrastructure/types";

export interface ErrorMessages {
    inventoryApi: IInventoryApiErrorMessages;
    inventoryService: IInventoryServiceErrorMessages;
    inventoryRepository: IInventoryErrorMessages;
    section: ISectionErrorMessages;
    item: IItemErrorMessages;
    orderApi: IOrderApiErrorMessages;
    order: IOrderErrorMessages;
    servicesApi: IServicesApiErrorMessages;
    servicesService: IServicesServiceErrorMessages;
    services: IServicesErrorMessages;
}

export interface ContainerErrorMessages {
    inventory: IInventoryApiErrorMessages;
    order: IOrderApiErrorMessages;
}