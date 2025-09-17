import {Services} from "@/domain/aggregates";
import {Service} from "@/domain/entities";
import type {ServiceData} from "@/domain/types";
import type {IconValidator} from "@/domain/validators";
import {DomainValidationError} from "@/domain/errors";
import {ServiceId, Price, IconClass} from "@/domain/value-objects";

import type {IServicesServiceErrorMessages} from "@/application/types";

import type {ITranslationService} from "@/shared/localization/types";

export class ServicesApiResponseDto {
    static toDomainAggregate(
        apiResponse: { services: Array<ServiceData> },
        errorMessages: IServicesServiceErrorMessages,
        translationService: ITranslationService,
        iconValidator: IconValidator,
    ): Services {
        if (!apiResponse || typeof apiResponse !== 'object') {
            throw new DomainValidationError(translationService.t(errorMessages.invalidApiResponse));
        }

        if (!Array.isArray(apiResponse.services)) {
            throw new DomainValidationError(translationService.t(errorMessages.invalidApiResponse));
        }

        const services: Service[] = [];

        apiResponse.services.forEach((serviceData: ServiceData) => {
            try {
                const service = Service.create({
                    id: ServiceId.create(serviceData.id),
                    iconClass: IconClass.create(serviceData.iconClass, iconValidator),
                    price: Price.create(serviceData.priceFrom, serviceData.currency),
                    titleBg: serviceData.titleBg,
                    titleEn: serviceData.titleEn,
                    subtitleBg: serviceData.subtitleBg,
                    subtitleEn: serviceData.subtitleEn,
                    descriptionBg: serviceData.descriptionBg,
                    descriptionEn: serviceData.descriptionEn,
                    buttonTextBg: serviceData.buttonTextBg,
                    buttonTextEn: serviceData.buttonTextEn,
                    isActive: serviceData.isActive,
                });
                services.push(service);
            } catch (error) {
                console.warn(errorMessages.skippedInvalidService, error);
            }
        });

        if (services.length === 0) {
            throw new DomainValidationError(errorMessages.noValidServices);
        }

        return Services.create(services);
    }
}