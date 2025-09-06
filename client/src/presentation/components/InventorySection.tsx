import type {InventorySectionProps} from "@/presentation/types";
import {ChevronDown, X} from "lucide-react";
import InventoryItem from "@/components/InventoryItem.tsx";
import {IconService} from "@/infrastructure/services";
import {IconClass} from "@/domain/value-objects";
import applicationContainer from "@/shared/di/container.ts";
import useTranslation from "@/hooks/useTranslation.ts";

export default function InventorySection(
    {
        section,
        items,
        isOpen,
        quantities,
        onToggle,
        onIncreaseItem,
        onDecreaseItem
    }: InventorySectionProps
) {
    const {currentLocale} = useTranslation();

    const IconComponent = IconService.isValid(section.icon_class)
        ? IconService.getComponent(IconClass.create(section.icon_class, applicationContainer.iconValidator))
        : X;

    return (
        <section aria-labelledby={`section-${section.id}`}>
            <h2 id={`section-${section.id}`} className="text-xl font-semibold mb-4">
                <button
                    type="button"
                    className="w-full flex items-center gap-2 justify-between px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${section.id}`}
                    onClick={onToggle}
                >
                    <span className="flex items-center gap-2">
                        <IconComponent className="w-6 h-6 text-white" aria-hidden/>
                        <span>{section.getDisplayName(currentLocale)}</span>
                    </span>
                    <ChevronDown
                        className={`h-5 w-5 text-white transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        aria-hidden
                    />
                </button>
            </h2>

            <div
                id={`panel-${section.id}`}
                role="region"
                aria-labelledby={`section-${section.id}`}
                className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${isOpen ? "" : "hidden"}`}
            >
                {items.map((item) => (
                    <InventoryItem
                        key={item.id}
                        item={item}
                        quantity={quantities[item.id] || 0}
                        onIncrease={onIncreaseItem}
                        onDecrease={onDecreaseItem}
                    />
                ))}
            </div>
        </section>
    );
}