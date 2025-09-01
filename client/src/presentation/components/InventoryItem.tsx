import type {LucideIcon} from "lucide-react";
import * as Icons from "lucide-react";

import type {InventoryItemProps} from "@/presentation/types";

import useTranslation from "@/hooks/useTranslation.ts";

import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {INVENTORY_ITEM_KEYS} from "@/shared/messages/messages.ts";

export default function InventoryItem({item, quantity, onIncrease, onDecrease}: InventoryItemProps) {
    const {t} = useTranslation();

    const IconComponent = getIconFromClass(item.icon_class);

    function getIconFromClass(iconClass: string): LucideIcon {
        // @ts-ignore
        return Icons[iconClass] || Icons.X;
    }

    return (
        <Card className="h-full">
            <CardContent className="pt-6 flex flex-col items-center text-center">
                <div
                    className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center select-none ring-1 ring-primary/20 shadow-sm">
                    <IconComponent className="w-8 h-8" aria-hidden/>
                </div>
                <div className="mt-3 text-sm md:text-base font-medium">
                    {item.getDisplayName()}
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label={t(INVENTORY_ITEM_KEYS.decrease)}
                        onClick={() => onDecrease(item.id)}
                    >
                        <Icons.Minus/>
                    </Button>
                    <div className="min-w-10 text-center font-semibold tabular-nums">
                        {quantity}
                    </div>
                    <Button
                        variant="default"
                        size="icon"
                        aria-label={t(INVENTORY_ITEM_KEYS.increase)}
                        onClick={() => onIncrease(item.id)}
                    >
                        <Icons.Plus/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}