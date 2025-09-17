import type {ServiceId} from "../value-objects/ServiceId";
import {IconClass, Locale} from "@/domain/value-objects";
import type {Price} from "@/domain/value-objects/Price.ts";
import {DomainValidationError, ServiceErrorCode} from "@/domain/errors";

export class Service {
    public static readonly MIN_STRING_LENGTH = 1;
    public static readonly MAX_STRING_LENGTH = 255;
    public static readonly MAX_DESCRIPTION_LENGTH = 2000;

    public readonly id: ServiceId;
    public readonly iconClass: IconClass;
    public readonly price: Price;
    public readonly titleBg: string;
    public readonly titleEn: string;
    public readonly subtitleBg: string;
    public readonly subtitleEn: string;
    public readonly descriptionBg: string;
    public readonly descriptionEn: string;
    public readonly buttonTextBg: string;
    public readonly buttonTextEn: string;
    public readonly isActive: boolean;

    private constructor(
        id: ServiceId,
        iconClass: IconClass,
        price: Price,
        titleBg: string,
        titleEn: string,
        subtitleBg: string,
        subtitleEn: string,
        descriptionBg: string,
        descriptionEn: string,
        buttonTextBg: string,
        buttonTextEn: string,
        isActive: boolean
    ) {
        this.id = id;
        this.iconClass = iconClass;
        this.price = price;
        this.titleBg = titleBg;
        this.titleEn = titleEn;
        this.subtitleBg = subtitleBg;
        this.subtitleEn = subtitleEn;
        this.descriptionBg = descriptionBg;
        this.descriptionEn = descriptionEn;
        this.buttonTextBg = buttonTextBg;
        this.buttonTextEn = buttonTextEn;
        this.isActive = isActive;
    }

    static create(params: {
        id: ServiceId;
        iconClass: IconClass;
        price: Price;
        titleBg: string;
        titleEn: string;
        subtitleBg: string;
        subtitleEn: string;
        descriptionBg: string;
        descriptionEn: string;
        buttonTextBg: string;
        buttonTextEn: string;
        isActive: boolean;
    }): Service {
        Service.validate(params);

        return new Service(
            params.id,
            params.iconClass,
            params.price,
            params.titleBg.trim(),
            params.titleEn.trim(),
            params.subtitleBg.trim(),
            params.subtitleEn.trim(),
            params.descriptionBg.trim(),
            params.descriptionEn.trim(),
            params.buttonTextBg.trim(),
            params.buttonTextEn.trim(),
            params.isActive
        );
    }

    private static validate(params: {
        titleBg: string;
        titleEn: string;
        subtitleBg: string | null;
        subtitleEn: string | null;
        descriptionBg: string;
        descriptionEn: string;
    }): void {
        const requiredFields = [
            {
                value: params.titleBg,
                required: ServiceErrorCode.TITLE_BG_REQUIRED,
                tooLong: ServiceErrorCode.TITLE_BG_TOO_LONG,
                maxLength: Service.MAX_STRING_LENGTH
            },
            {
                value: params.titleEn,
                required: ServiceErrorCode.TITLE_EN_REQUIRED,
                tooLong: ServiceErrorCode.TITLE_EN_TOO_LONG,
                maxLength: Service.MAX_STRING_LENGTH
            },
            {
                value: params.descriptionBg,
                required: ServiceErrorCode.DESCRIPTION_BG_REQUIRED,
                tooLong: null,
                maxLength: Service.MAX_DESCRIPTION_LENGTH
            },
            {
                value: params.descriptionEn,
                required: ServiceErrorCode.DESCRIPTION_EN_REQUIRED,
                tooLong: null,
                maxLength: Service.MAX_DESCRIPTION_LENGTH
            }
        ];

        requiredFields.forEach(({value, required, tooLong, maxLength}) => {
            const trimmed = value.trim();

            if (!trimmed || trimmed.length < Service.MIN_STRING_LENGTH) {
                throw new DomainValidationError(required);
            }

            if (tooLong && value.length > maxLength) {
                throw new DomainValidationError(tooLong);
            }
        });

        // Validate optional subtitles
        const optionalFields = [
            {value: params.subtitleBg, tooLong: ServiceErrorCode.SUBTITLE_TOO_LONG},
            {value: params.subtitleEn, tooLong: ServiceErrorCode.SUBTITLE_TOO_LONG}
        ];

        optionalFields.forEach(({value, tooLong}) => {
            if (value && value.length > Service.MAX_STRING_LENGTH) {
                throw new DomainValidationError(tooLong);
            }
        });
    }

    getTitleByLocale(locale?: Locale): string {
        const targetLocale = locale ?? Locale.getDefault();
        return targetLocale.hasCode(Locale.ENGLISH_CODE) ? this.titleEn : this.titleBg;
    }

    getSubtitleByLocale(locale?: Locale): string | null {
        const targetLocale = locale ?? Locale.getDefault();
        return targetLocale.hasCode(Locale.ENGLISH_CODE) ? this.subtitleEn : this.subtitleBg;
    }

    getDescriptionByLocale(locale?: Locale): string {
        const targetLocale = locale ?? Locale.getDefault();
        return targetLocale.hasCode(Locale.ENGLISH_CODE) ? this.descriptionEn : this.descriptionBg;
    }

    getButtonTextByLocale(locale?: Locale): string | null {
        const targetLocale = locale ?? Locale.getDefault();
        return targetLocale.hasCode(Locale.ENGLISH_CODE) ? this.buttonTextEn : this.buttonTextBg;
    }

    toObject() {
        return {
            id: this.id.value,
            iconClass: this.iconClass.value,
            price: {
                amount: this.price.amount,
                currency: this.price.currency
            },
            titleBg: this.titleBg,
            titleEn: this.titleEn,
            subtitleBg: this.subtitleBg,
            subtitleEn: this.subtitleEn,
            descriptionBg: this.descriptionBg,
            descriptionEn: this.descriptionEn,
            buttonTextBg: this.buttonTextBg,
            buttonTextEn: this.buttonTextEn,
            isActive: this.isActive
        };
    }
}