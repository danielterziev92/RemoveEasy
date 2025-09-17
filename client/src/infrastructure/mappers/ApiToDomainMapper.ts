import type {ItemData, SectionData, ServiceData} from "@/domain/types";
import type {ItemApiData, SectionApiData, ServiceApiData} from "@/infrastructure/types";

export class ApiToDomainMapper {

    static mapInventoryResponse(apiResponse: { sections: SectionApiData[] }): { sections: SectionData[] } {
        return {
            sections: apiResponse.sections.map(this.mapSectionApiData)
        }
    }

    static mapSectionApiData(apiData: SectionApiData): SectionData {
        return {
            id: apiData.id,
            iconClass: apiData.icon_class,
            titleBg: apiData.title_bg,
            titleEn: apiData.title_en,
            items: apiData.items.map(ApiToDomainMapper.mapItemApiData)
        }
    }

    static mapItemApiData(apiData: ItemApiData): ItemData {
        return {
            id: apiData.id,
            iconClass: apiData.icon_class,
            titleBg: apiData.title_bg,
            titleEn: apiData.title_en,
        }
    }

    static mapServicesResponse(apiResponse: { services: ServiceApiData[] }): { services: ServiceData[] } {
        return {
            services: apiResponse.services.map(this.mapServiceApiData)
        };
    }

    static mapServiceApiData(apiData: ServiceApiData): ServiceData {
        return {
            id: apiData.id,
            iconClass: apiData.icon_class,
            priceFrom: apiData.price_from,
            currency: apiData.currency,
            titleBg: apiData.title_bg,
            titleEn: apiData.title_en,
            subtitleBg: apiData.subtitle_bg,
            subtitleEn: apiData.subtitle_en,
            descriptionBg: apiData.description_bg,
            descriptionEn: apiData.description_en,
            buttonTextBg: apiData.button_text_bg,
            buttonTextEn: apiData.button_text_en,
            isActive: apiData.is_active,
        };
    }
}