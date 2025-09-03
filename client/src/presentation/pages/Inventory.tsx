import {type ChangeEvent, type FormEvent, useCallback, useState} from "react";
import {Toast} from "radix-ui";

import {Boxes} from "lucide-react";

import Header from "@/components/Header.tsx";
import InventoryDisplay from "@/components/InventoryDisplay.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import AddressForm from "@/components/AddressForm.tsx";
import useTranslation from "@/hooks/useTranslation.ts";

import type {AddressFormData, SubmitState} from "@/presentation/types";

import {INVENTORY_CUSTOMER_FORM, INVENTORY_KEYS} from "@/shared/messages/messages.ts";
import {Input} from "@/components/ui/input.tsx";

export default function Inventory() {
    const {t} = useTranslation();

    const [customerData, setCustomerData] = useState({
        fullName: "",
        phone: "",
        email: ""
    });

    const [loadingAddressData, setLoadingAddressData] = useState<AddressFormData>({
        town: "",
        postal_code: "",
        street: "",
        house_number: "",
        address: "",
    });

    const [unloadingAddressData, setUnloadingAddressData] = useState<AddressFormData>({
        town: "",
        postal_code: "",
        street: "",
        house_number: "",
        address: "",
    });

    const [additionalContext, setAdditionalContext] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [_, setSubmitState] = useState<SubmitState | null>(null);
    const [selectedItems, setSelectedItems] = useState<Array<{ itemId: number, quantity: number }>>([]);

    const handleSelectedItemsChange = useCallback((items: Array<{ itemId: number, quantity: number }>) => {
        setSelectedItems(items);
    }, []);

    const handleCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLoadingAddressChange = (field: keyof AddressFormData, value: string) => {
        setLoadingAddressData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUnloadingAddressChange = (field: keyof AddressFormData, value: string) => {
        setUnloadingAddressData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвратяваме refresh-а

        setIsSubmitting(true);
        setSubmitState(null);

        try {
            const apiData = {
                customer_full_name: customerData.fullName,
                phone_number: customerData.phone,
                email: customerData.email,
                loading_town: loadingAddressData.town,
                loading_postal_code: loadingAddressData.postal_code,
                loading_street: loadingAddressData.street,
                loading_house_number: loadingAddressData.house_number,
                loading_address: loadingAddressData.address,
                unloading_town: unloadingAddressData.town,
                unloading_postal_code: unloadingAddressData.postal_code,
                unloading_street: unloadingAddressData.street,
                unloading_house_number: unloadingAddressData.house_number,
                unloading_address: unloadingAddressData.address,
                description: additionalContext,
                items: selectedItems
            }

            // Симулираме API заявка
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Тук ще направите реалната API заявка
            console.log('Submitting form data:', apiData);

            setSubmitState({
                success: true,
                message: 'Формата е подадена успешно!'
            });

            // Опционално: изчистете формата след успешно изпращане
            // setLoadingAddressData({...});
            // setUnloadingAddressData({...});
            // setAdditionalContext('');

        } catch {
            setSubmitState({
                success: false,
                message: 'Възникна грешка при подаването на формата'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Toast.Provider>
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
                            <InventoryDisplay onSelectedItemsChange={handleSelectedItemsChange}/>
                        </div>
                    </div>
                    <div className="container-custom">
                        <form onSubmit={handleSubmit}>
                            <h2 id="finalize-order" className="text-xl font-semibold mb-4 text-center">
                                {t(INVENTORY_KEYS.finalizeOrder)}
                            </h2>

                            <div className="grid gap-5 md:grid-cols-1">
                                <div className="grid gap-2">
                                    <Label htmlFor="fullName">{t(INVENTORY_CUSTOMER_FORM.fullName)}</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        required
                                        value={customerData.fullName}
                                        onChange={handleCustomerChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">{t(INVENTORY_CUSTOMER_FORM.phoneNumber)}</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        required
                                        value={customerData.phone}
                                        onChange={handleCustomerChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">{t(INVENTORY_CUSTOMER_FORM.email)}</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={customerData.email}
                                        onChange={handleCustomerChange}
                                    />
                                </div>
                            </div>

                            <AddressForm
                                title={t(INVENTORY_KEYS.formTitleLoading)}
                                prefix="loading"
                                form={loadingAddressData}
                                onChange={handleLoadingAddressChange}
                                t={t}
                            />

                            <AddressForm
                                title={t(INVENTORY_KEYS.formTitleUnloading)}
                                prefix="unloading"
                                form={unloadingAddressData}
                                onChange={handleUnloadingAddressChange}
                                t={t}
                            />


                            <h2 id="additional-context" className="text-xl font-semibold mb-4 text-center">
                                {t(INVENTORY_KEYS.additionalText)}
                            </h2>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="additionalContext">
                                            {t(INVENTORY_KEYS.additionalTextLabel)}<span
                                            className="text-muted-foreground"> {t(INVENTORY_KEYS.additionalTextOptional)}</span>
                                        </Label>
                                        <Textarea
                                            id="additionalContext"
                                            name="additionalContext"
                                            value={additionalContext}
                                            onChange={(e) => setAdditionalContext(e.target.value)}
                                            placeholder={t(INVENTORY_KEYS.additionalTextTextareaPlaceholder)}
                                            rows={4}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="mt-6 text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-primary text-white rounded-md disabled:opacity-50"
                                >
                                    {isSubmitting ? t(INVENTORY_KEYS.sendRequest) : t(INVENTORY_KEYS.sendRequest)}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
            <Toast.Viewport
                className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"/>
        </Toast.Provider>
    );
}