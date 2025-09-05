import type {ItemData} from "@/domain/types";

export interface SectionData {
    id: number;
    iconClass: string;
    titleBg: string;
    titleEn: string;
    items: ItemData[];
}