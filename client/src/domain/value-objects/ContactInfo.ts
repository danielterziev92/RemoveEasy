import {ContactInfoErrorCode, DomainValidationError} from "@/domain/errors";

export class ContactInfo {
    private readonly value: string;

    constructor(phone: string) {
        if (!phone || phone.trim() === '') {
            throw new DomainValidationError(ContactInfoErrorCode.PHONE_NUMBER_REQUIRED);
        }

        this.value = phone.trim();
    }

    get phone(): string {
        return this.value;
    }

    get whatsapp(): string {
        return `https://wa.me/${this.value}`;
    }

    equals(other: ContactInfo): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return `ContactInfo(phone: ${this.value})`;
    }
}