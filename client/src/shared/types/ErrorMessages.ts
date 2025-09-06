import type {
    IInventoryErrorMessages,
    IInventoryServiceErrorMessages,
    IItemErrorMessages,
    ISectionErrorMessages
} from "@/application/types";

import type {IInventoryApiErrorMessages, IOrderApiErrorMessages} from "@/infrastructure/types";

export interface ErrorMessages {
    inventoryApi: IInventoryApiErrorMessages;
    inventoryService: IInventoryServiceErrorMessages;
    inventoryRepository: IInventoryErrorMessages;
    section: ISectionErrorMessages;
    item: IItemErrorMessages;
    orderApi: IOrderApiErrorMessages;
}

export interface ContainerErrorMessages {
    inventory: IInventoryApiErrorMessages;
    order: IOrderApiErrorMessages;
}