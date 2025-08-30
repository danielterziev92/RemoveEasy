export class Locale {
    public static readonly CODE_LENGTH: string = "Locale code must be exactly 2 characters";

    public readonly code: string;
    public readonly name: string;
    public readonly nativeName: string;

    private constructor(code: string, name: string, nativeName: string) {
        this.code = code;
        this.name = name;
        this.nativeName = nativeName;
    }

    static create(code: string, name: string, nativeName: string): Locale {
        if (!code || code.length !== 2) throw new Error(Locale.CODE_LENGTH)

        return new Locale(code, name, nativeName);
    }
}