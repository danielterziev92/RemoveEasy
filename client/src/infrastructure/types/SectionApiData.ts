import type {ItemApiData} from "./ItemApiData.ts";

export interface SectionApiData {
    id: number;
    icon_class: string;
    title_bg: string;
    title_en: string;
    items: ItemApiData[];
}