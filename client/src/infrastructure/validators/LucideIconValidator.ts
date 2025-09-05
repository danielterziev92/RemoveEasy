import * as LucideIcons from 'lucide-react';

import type {IconValidator} from "@/domain/validators";

export class LucideIconValidator implements IconValidator {
    isValid(iconClass: string): boolean {
        return iconClass.trim() in LucideIcons;
    }

    getAvailableIcons(): string[] {
        return Object.keys(LucideIcons).filter(key =>
            key !== 'createLucideIcon' &&
            key !== 'default' &&
            typeof LucideIcons[key as keyof typeof LucideIcons] === 'function'
        )
    };
}