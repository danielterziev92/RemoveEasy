export type UUID = string;

export class OrderId {
    private readonly _value: UUID;

    private constructor(value: UUID) {
        this._value = value;
    }

    static create(value: UUID): OrderId {
        OrderId.isValidUUID(value);

        return new OrderId(value);
    }

    private static isValidUUID(uuid: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }

    get value(): UUID {
        return this._value;
    }

    equals(other: OrderId): boolean {
        return this._value === other._value;
    }

    toString(): string {
        return this._value.toString();
    }
}