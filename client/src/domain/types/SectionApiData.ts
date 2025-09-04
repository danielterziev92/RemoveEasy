import type {ItemApiData} from "@/domain/types";

export interface SectionApiData {
    id: number;
    icon_class: string;
    title_bg: string;
    title_en: string;
    items?: ItemApiData[];
}