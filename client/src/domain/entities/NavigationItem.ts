export class NavigationItem {
    public readonly href: string;
    public readonly labelKey: string;
    public readonly key: string;

    constructor(href: string, labelKey: string, key: string) {
        this.href = href;
        this.labelKey = labelKey;
        this.key = key;
    }

    getLabel(t: (key: string) => string): string {
        return t(this.labelKey);
    }
}