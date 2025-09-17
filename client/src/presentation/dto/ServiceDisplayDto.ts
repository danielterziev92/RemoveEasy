import {Service} from "@/domain/entities";
import type {LocaleDisplayDto} from "@/presentation/dto/LocaleDisplayDto.ts";

export class ServiceDisplayDto {
    public readonly id: number;
    public readonly iconClass: string;
    public readonly priceAmount: string;
    public readonly priceCurrency: string;
    public readonly titleBg: string;
    public readonly titleEn: string;
    public readonly subtitleBg: string | null;
    public readonly subtitleEn: string | null;
    public readonly descriptionBg: string;
    public readonly descriptionEn: string;
    public readonly buttonTextBg: string | null;
    public readonly buttonTextEn: string | null;
    public readonly isActive: boolean;

    constructor(service: Service) {
        this.id = service.id.value;
        this.iconClass = service.iconClass.value;
        this.priceAmount = service.price.amount;
        this.priceCurrency = service.price.currency;
        this.titleBg = service.titleBg;
        this.titleEn = service.titleEn;
        this.subtitleBg = service.subtitleBg;
        this.subtitleEn = service.subtitleEn;
        this.descriptionBg = service.descriptionBg;
        this.descriptionEn = service.descriptionEn;
        this.buttonTextBg = service.buttonTextBg;
        this.buttonTextEn = service.buttonTextEn;
        this.isActive = service.isActive;
    }

    getDisplayTitle(locale?: LocaleDisplayDto): string {
        return locale?.hasCode("en") ? this.titleEn : this.titleBg;
    }

    getDisplaySubtitle(locale?: LocaleDisplayDto): string | null {
        return locale?.hasCode("en") ? this.subtitleEn : this.subtitleBg;
    }

    getDisplayDescription(locale?: LocaleDisplayDto): string {
        return locale?.hasCode("en") ? this.descriptionEn : this.descriptionBg;
    }

    getDisplayButtonText(locale?: LocaleDisplayDto): string | null {
        return locale?.hasCode("en") ? this.buttonTextEn : this.buttonTextBg;
    }

    getFormattedPrice(): string {
        return `${this.priceCurrency}${this.priceAmount}`;
    }

    getDisplayPrice(): string {
        return `From ${this.getFormattedPrice()}`;
    }

    static fromEntity(service: Service): ServiceDisplayDto {
        return new ServiceDisplayDto(service);
    }
}