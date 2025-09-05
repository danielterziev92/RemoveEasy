import type {
    IInventoryServiceErrorMessages,
    IItemErrorMessages,
    IOrderErrorMessages,
    ISectionErrorMessages
} from "@/application/types";

import type {IInventoryApiErrorMessages} from "@/infrastructure/types";

export interface ErrorMessages {
    inventoryApi: IInventoryApiErrorMessages;
    inventoryService: IInventoryServiceErrorMessages;
    section: ISectionErrorMessages;
    item: IItemErrorMessages;
    orderApi: IOrderErrorMessages;
}