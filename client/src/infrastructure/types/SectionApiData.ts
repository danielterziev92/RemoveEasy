import type {ItemApiData} from "./ItemApiData.ts";

export interface SectionApiData {
    icon_class: string;
    title: string;
    items: ItemApiData[];
}