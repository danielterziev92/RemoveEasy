import {DomainValidationError, ServiceErrorCode} from "@/domain/errors";

export class ServiceId {
    private readonly _value: number;

    private constructor(value: number) {
        if (value < 1) {
            throw new DomainValidationError(ServiceErrorCode.ID_INVALID);
        }
        this._value = value;
    }

    static create(value: number): ServiceId {
        return new ServiceId(value);
    }

    get value(): number {
        return this._value;
    }

    equals(other: ServiceId): boolean {
        return this._value === other._value;
    }

    toString(): string {
        return this._value.toString();
    }
}
