import {DomainValidationError, PriceErrorCode} from "@/domain/errors";

export class Price {
    private readonly _amount: string;
    private readonly _currency: string;

    private constructor(amount: string, currency: string) {
        this._amount = amount;
        this._currency = currency;
    }

    static create(amount: string, currency: string): Price {
        Price.validate(amount, currency);
        return new Price(amount.trim(), currency.trim());
    }

    private static validate(amount: string, currency: string): void {
        if (!amount || !amount.trim()) {
            throw new DomainValidationError(PriceErrorCode.AMOUNT_REQUIRED);
        }

        if (!currency || !currency.trim()) {
            throw new DomainValidationError(PriceErrorCode.CURRENCY_REQUIRED);
        }

        // Basic price validation - should be numeric
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount < 0) {
            throw new DomainValidationError(PriceErrorCode.AMOUNT_INVALID);
        }
    }

    get amount(): string {
        return this._amount;
    }

    get currency(): string {
        return this._currency;
    }

    getFormattedPrice(): string {
        return `${this._currency}${this._amount}`;
    }

    getDisplayPrice(): string {
        return `From ${this.getFormattedPrice()}`;
    }

    equals(other: Price): boolean {
        return this._amount === other._amount && this._currency === other._currency;
    }

    toString(): string {
        return this.getFormattedPrice();
    }
}