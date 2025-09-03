import {DomainValidationError, ItemErrorCode} from "@/domain/errors";

export class ItemId {
    private readonly _value: number

    private constructor(value: number) {
        if (value < 1) {
            throw new DomainValidationError(ItemErrorCode.ID_INVALID);
        }

        this._value = value;
    }

    static create(value: number): ItemId {
        return new ItemId(value);
    }

    get value(): number {
        return this._value;
    }

    equals(other: ItemId): boolean {
        return this._value === other._value;
    }

    toString(): string {
        return this._value.toString();
    }
}