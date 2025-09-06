import {Section} from "@/domain/entities";
import {Locale} from "@/domain/value-objects";

export class SectionDisplayDto {
    public readonly id: number;
    public readonly icon_class: string;
    public readonly titleBg: string;
    public readonly titleEn: string;

    constructor(section: Section) {
        this.id = section.id.value;
        this.icon_class = section.iconClass.value;
        this.titleBg = section.titleBg;
        this.titleEn = section.titleEn;
    }

    get title(): string {
        return this.getDisplayName();
    }

    getDisplayName(locale?: Locale): string {
        return locale?.hasCode('en') ? this.titleEn : this.titleBg;
    }

    static fromEntity(section: Section): SectionDisplayDto {
        return new SectionDisplayDto(section);
    }
}