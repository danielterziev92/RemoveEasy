export type UUID = string;

export class OrderId {
    private readonly value: UUID;

    private constructor(value: UUID) {
        this.value = value;
    }

    static create(value: UUID): OrderId {
        OrderId.isValidUUID(value);

        return new OrderId(value);
    }

    private static isValidUUID(uuid: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }

    equals(other: OrderId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value.toString();
    }
}