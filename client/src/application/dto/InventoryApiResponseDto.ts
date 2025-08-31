import {Item, Section} from "@/domain/entities";

import type {IInventoryServiceErrorMessages, IItemErrorMessages, ISectionErrorMessages} from "@/application/types";

import type {InventoryApiResponse, ItemApiData, SectionApiData} from "@/infrastructure/types";

import type {ITranslationService} from "@/shared/localization/types";

export class InventoryApiResponseDto {
    static toDomainEntities(
        apiResponse: InventoryApiResponse,
        errorMessages: IInventoryServiceErrorMessages,
        sectionErrorMessages: ISectionErrorMessages,
        itemErrorMessages: IItemErrorMessages,
        translationService: ITranslationService
    ): { sections: Section[]; items: Item[] } {
        const sections: Section[] = [];
        const items: Item[] = [];

        if (!apiResponse?.sections || !Array.isArray(apiResponse.sections)) {
            throw new Error(translationService.t(errorMessages.invalidApiResponse));
        }

        apiResponse.sections.forEach((sectionData: SectionApiData) => {
            try {
                const section = Section.fromApiData(
                    sectionData,
                    sectionErrorMessages,
                    translationService
                );
                sections.push(section);

                if (Array.isArray(sectionData.items)) {
                    sectionData.items.forEach((itemData: ItemApiData) => {
                        try {
                            const item = Item.fromApiData(
                                itemData,
                                section,
                                itemErrorMessages,
                                translationService
                            );
                            items.push(item);
                        } catch (error) {
                            console.warn(errorMessages.skippedInvalidItem, error);
                        }
                    });
                }
            } catch (error) {
                console.warn(errorMessages.skippedInvalidSection, error);
            }
        });

        if (sections.length === 0) {
            throw new Error(errorMessages.noValidSections);
        }

        return {sections, items};
    }
}
