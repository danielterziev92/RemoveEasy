import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Toast} from "radix-ui";

import type {RootState} from "@/infrastructure/store/store.ts";
import {selectIsLoading, selectAllItems, selectSections} from "@/infrastructure/store/slices/inventorySlice.ts";

import InventorySection from "@/components/InventorySection.tsx";
import useTranslation from "@/hooks/useTranslation.ts";

import type {InventoryDisplayProps} from "@/presentation/types";

import {INVENTORY_ERROR_KEYS} from "@/shared/messages/error_messages.ts";

export default function InventoryDisplay({onSelectedItemsChange}: InventoryDisplayProps) {
    const {t} = useTranslation();

    const sections = useSelector((state: RootState) => selectSections(state));
    const items = useSelector((state: RootState) => selectAllItems(state));
    const isLoading = useSelector((state: RootState) => selectIsLoading(state));

    const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [showNoItemsToast, setShowNoItemsToast] = useState(false);

    useEffect(() => {
        const loadInventory = async () => {
            try {
                await dependencyContainer.fetchAndStoreInventoryUseCase.execute();
            } catch (error) {
                console.error('Failed to load inventory:', error);
            }
        };

        if (sections.length === 0 && !isLoading) {
            loadInventory();
        }
    }, [sections.length, isLoading]);

    useEffect(() => {
        if (!isLoading && sections.length > 0 && items.length === 0) {
            setShowNoItemsToast(true);
        }
    }, [isLoading, sections.length, items.length]);

    useEffect(() => {
        const selectedItems = Object.entries(quantities)
            .filter(([_, quantity]) => quantity > 0)
            .map(([itemId, quantity]) => ({
                itemId: parseInt(itemId),
                quantity
            }));

        onSelectedItemsChange?.(selectedItems);
    }, [quantities, onSelectedItemsChange]);

    const toggleSection = (sectionId: number) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const increaseQuantity = (itemId: number) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const decreaseQuantity = (itemId: number) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(0, (prev[itemId] || 0) - 1)
        }));
    };


    return (
        <>
            {sections.map((section) => {
                const sectionItems = items.filter(item => item.belongsToSection(section.getDisplayName()));

                return (
                    <InventorySection
                        key={section.id}
                        section={section}
                        items={sectionItems}
                        isOpen={openSections[section.id] || false}
                        quantities={quantities}
                        onToggle={() => toggleSection(section.id)}
                        onIncreaseItem={increaseQuantity}
                        onDecreaseItem={decreaseQuantity}
                    />
                );
            })}

            <Toast.Root
                className="bg-destructive text-destructive-foreground rounded-md p-4 shadow-lg border"
                open={showNoItemsToast}
                onOpenChange={setShowNoItemsToast}
                duration={5000}
            >
                <Toast.Title className="font-semibold text-sm">
                    Грешка
                </Toast.Title>
                <Toast.Description className="text-sm mt-1">
                    {t(INVENTORY_ERROR_KEYS.noItemsFound)}
                </Toast.Description>
                <Toast.Close
                    className="absolute top-2 right-2 text-destructive-foreground/50 hover:text-destructive-foreground"
                    aria-label="Затвори"
                >
                    ×
                </Toast.Close>
            </Toast.Root>
        </>
    );
}