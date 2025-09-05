import type {ItemData, SectionData} from "@/domain/types";
import type {ItemApiData, SectionApiData} from "@/infrastructure/types";

export class ApiToDomainMapper {

    static mapInventoryResponse(apiResponse: { sections: SectionApiData[] }): { sections: SectionData[] } {
        return {
            sections: apiResponse.sections.map(this.mapSectionApiData)
        }
    }

    static mapSectionApiData(apiData: SectionApiData): SectionData {
        return {
            id: BigInt(apiData.id),
            iconClass: apiData.icon_class,
            titleBg: apiData.title_bg,
            titleEn: apiData.title_en,
            items: apiData.items.map(this.mapItemApiData)
        }
    }

    static mapItemApiData(apiData: ItemApiData): ItemData {
        return {
            id: BigInt(apiData.id),
            iconClass: apiData.icon_class,
            titleBg: apiData.title_bg,
            titleEn: apiData.title_en,
        }
    }
}