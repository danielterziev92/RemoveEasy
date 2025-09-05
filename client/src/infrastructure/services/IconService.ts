import * as LucideIcons from 'lucide-react';

import {IconClass} from "@/domain/value-objects";

import {LucideIconValidator} from "@/infrastructure/validators";

export class IconService {
    /**
     * Gets the React component for an icon
     */
    static getComponent(iconClass: IconClass) {
        return LucideIcons[iconClass.value as keyof typeof LucideIcons];
    }

    /**
     * Checks if an icon name is valid without throwing an error
     */
    static isValid(iconName: string): boolean {
        try {
            const validator = new LucideIconValidator();
            IconClass.create(iconName, validator);
            return true;
        } catch {
            return false;
        }
    }
}