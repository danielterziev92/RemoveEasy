import type {ItemApiData} from "./ItemApiData";

export interface SectionApiData {
    icon_class: string;
    title: string;
    items: ItemApiData[];
}