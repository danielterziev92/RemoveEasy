import Header from "@/components/Header.tsx";
import {Boxes} from "lucide-react";
import useTranslation from "../hooks/useTranslation";
import InventoryDisplay from "@/components/InventoryDisplay.tsx";
import {INVENTORY_KEYS} from "@/shared/messages/messages.ts";

export default function Inventory() {
    const {t} = useTranslation();
    return (
        <div className="min-h-screen">
            <Header/>
            <main className="section-padding pt-24">
                <div className="container-custom">
                    <div className="container-custom">
                        <header className="mb-6 md:mb-8 text-center">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                                <Boxes className="inline-block w-7 h-7 text-primary" aria-hidden/>
                                {t(INVENTORY_KEYS.title)}
                            </h1>
                            <p className="text-sm md:text-base text-muted-foreground">
                                {t(INVENTORY_KEYS.description)}
                            </p>
                        </header>
                    </div>

                    <div className="space-y-10">
                        <InventoryDisplay/>
                    </div>
                </div>
            </main>
        </div>
    );
}