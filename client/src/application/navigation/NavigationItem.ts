export class NavigationItem {
    public readonly href: string;
    public readonly labelKey: string;
    public readonly key: string;

    constructor(href: string, labelKey: string, key: string) {
        if (!href || !labelKey || !key) {
            throw new Error("Invalid navigation item data");
        }

        this.href = href;
        this.labelKey = labelKey;
        this.key = key;
    }

    getLabel(t: (key: string) => string): string {
        return t(this.labelKey);
    }

    toDto(t: (key: string) => string): {
        href: string;
        label: string;
        key: string;
    } {
        return {
            href: this.href,
            label: this.getLabel(t),
            key: this.key,
        };
    }
}