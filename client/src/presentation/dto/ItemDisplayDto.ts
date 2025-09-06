import {Item} from "@/domain/entities";
import {Locale} from "@/domain/value-objects";

export class ItemDisplayDto {
    public readonly id: number;
    public readonly icon_class: string;
    public readonly titleBg: string;
    public readonly titleEn: string;

    constructor(item: Item) {
        this.id = item.id.value;
        this.icon_class = item.iconClass.value;
        this.titleBg = item.titleBg;
        this.titleEn = item.titleEn;
    }

    getDisplayName(locale?: Locale): string {
        return locale?.hasCode("en") ? this.titleEn : this.titleBg;
    }

    static fromEntity(item: Item): ItemDisplayDto {
        return new ItemDisplayDto(item);
    }
}