export class ContactInfo {
    private readonly _phone: string;
    private readonly _whatsapp: string;

    constructor(phone: string, whatsapp: string) {
        if (!phone || phone.trim() === '') {
            throw new Error('Phone number cannot be empty');
        }
        if (!whatsapp || whatsapp.trim() === '') {
            throw new Error('WhatsApp contact cannot be empty');
        }

        this._phone = phone.trim();
        this._whatsapp = whatsapp.trim();
    }

    get phone(): string {
        return this._phone;
    }

    get whatsapp(): string {
        return this._whatsapp;
    }

    equals(other: ContactInfo): boolean {
        return this._phone === other._phone && this._whatsapp === other._whatsapp;
    }

    toString(): string {
        return `ContactInfo(phone: ${this._phone}, whatsapp: ${this._whatsapp})`;
    }
}