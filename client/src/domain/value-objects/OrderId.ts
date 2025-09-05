import type {UUID} from "node:crypto";

export class OrderId {
    private readonly value: UUID;

    private constructor(value: UUID) {
        this.value = value;
    }

    static create(value: UUID): OrderId {
        return new OrderId(value);
    }

    equals(other: OrderId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value.toString();
    }
}