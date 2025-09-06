import {ContactInfo} from "@/domain/value-objects";

export class ContactInfoDto {
    public readonly phone: string;
    public readonly whatsapp: string;

    private constructor(phone: string, whatsapp: string) {
        this.phone = phone;
        this.whatsapp = whatsapp;
    }

    static fromEntity(contactInfo: ContactInfo): ContactInfoDto {
        return new ContactInfoDto(
            contactInfo.phone,
            contactInfo.whatsapp
        );
    }
}