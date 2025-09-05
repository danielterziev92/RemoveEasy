import type {ItemData, SectionData} from "@/domain/types";
import {Inventory} from "@/domain/aggregates";
import {Item, Section} from "@/domain/entities";
import {DomainValidationError} from "@/domain/errors";
import {IconClass, ItemId, SectionId} from "@/domain/value-objects";

import type {IInventoryServiceErrorMessages} from "@/application/types";
import type {ITranslationService} from "@/shared/localization/types";


export class InventoryApiResponseDto {
    static toDomainAggregate(
        apiResponse: { sections: Array<SectionData> },
        errorMessages: IInventoryServiceErrorMessages,
        translationService: ITranslationService,
    ): Inventory {
        if (!apiResponse || typeof apiResponse !== 'object') {
            throw new DomainValidationError(translationService.t(errorMessages.invalidApiResponse));
        }

        if (!Array.isArray(apiResponse.sections)) {
            throw new DomainValidationError(translationService.t(errorMessages.invalidApiResponse));
        }

        const sections: Section[] = [];

        apiResponse.sections.forEach((sectionData: SectionData) => {
            try {
                const items: Item[] = [];

                if (Array.isArray(sectionData.items)) {
                    sectionData.items.forEach((itemData: ItemData) => {
                        try {
                            const item = Item.create({
                                id: ItemId.create(itemData.id),
                                iconClass: IconClass.create(itemData.iconClass),
                                titleBg: itemData.titleBg,
                                titleEn: itemData.titleEn,
                            });
                            items.push(item);
                        } catch (error) {
                            console.warn(errorMessages.skippedInvalidItem, error);
                        }
                    })
                }

                const section = Section.create({
                    id: SectionId.create(sectionData.id),
                    iconClass: IconClass.create(sectionData.iconClass),
                    titleBg: sectionData.titleBg,
                    titleEn: sectionData.titleEn,
                    items: items,
                });

                sections.push(section);
            } catch (error) {
                console.warn(errorMessages.skippedInvalidSection, error);
            }
        });

        if (sections.length === 0) {
            throw new DomainValidationError(errorMessages.noValidSections);
        }

        return Inventory.create(sections);
    }
}
