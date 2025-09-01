import type {InventorySectionProps} from "@/presentation/types";
import * as Icons from "lucide-react";
import {ChevronDown, type LucideIcon} from "lucide-react";
import InventoryItem from "@/components/InventoryItem.tsx";

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
    const IconComponent = getIconFromClass(section.icon_class);

    function getIconFromClass(iconClass: string): LucideIcon {
        // @ts-ignore
        return Icons[iconClass] || Icons.X;
    }

    return (
        <section aria-labelledby={`section-${section.title}`}>
            <h2 id={`section-${section.title}`} className="text-xl font-semibold mb-4">
                <button
                    type="button"
                    className="w-full flex items-center gap-2 justify-between px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${section.title}`}
                    onClick={onToggle}
                >
                    <span className="flex items-center gap-2">
                        <IconComponent className="w-6 h-6 text-white" aria-hidden/>
                        <span>{section.title}</span>
                    </span>
                    <ChevronDown
                        className={`h-5 w-5 text-white transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        aria-hidden
                    />
                </button>
            </h2>


            <div
                id={`panel-${section.title}`}
                role="region"
                aria-labelledby={`section-${section.title}`}
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