import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import type {RootState} from "@/infrastructure/store/store.ts";
import {
    selectError,
    selectIsLoading,
    selectItems,
    selectSections
} from "@/infrastructure/store/slices/inventorySlice.ts";

import {dependencyContainer} from "@/shared/di/DependencyContainer.ts";
import InventorySection from "@/components/InventorySection.tsx";

export default function InventoryDisplay() {
    const sections = useSelector((state: RootState) => selectSections(state));
    const items = useSelector((state: RootState) => selectItems(state));
    const isLoading = useSelector((state: RootState) => selectIsLoading(state));
    const error = useSelector((state: RootState) => selectError(state));

    const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
    const [quantities, setQuantities] = useState<Record<number, number>>({});

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
        </>
    );
}