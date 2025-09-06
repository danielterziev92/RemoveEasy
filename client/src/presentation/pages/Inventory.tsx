import {type ChangeEvent, type FormEvent, useCallback, useState} from "react";
import {Toast} from "radix-ui";

import {Boxes, Copy, X} from "lucide-react";

import Header from "@/components/Header.tsx";
import InventoryDisplay from "@/components/InventoryDisplay.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import AddressForm from "@/components/AddressForm.tsx";
import useTranslation from "@/hooks/useTranslation.ts";
import useCreateOrder from "@/hooks/useCreateOrder";

import type {AddressFormData, SubmitState} from "@/presentation/types";

import {INVENTORY_CUSTOMER_FORM, INVENTORY_KEYS} from "@/shared/messages/messages.ts";

export default function Inventory() {
    const {t} = useTranslation();
    const {createOrder, isLoading: isCreatingOrder} = useCreateOrder();

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
    const [submitState, setSubmitState] = useState<SubmitState | null>(null);
    const [selectedItems, setSelectedItems] = useState<Array<{ itemId: number, quantity: number }>>([]);
    const [showValidationError, setShowValidationError] = useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = useState("");
    const [orderId, setOrderId] = useState<string | null>(null);

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

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Неуспешно копиране в clipboard:', err);
        }
    };

    const validateForm = () => {
        if (selectedItems.length === 0) {
            setValidationErrorMessage(INVENTORY_KEYS.validationSelectProducts);
            setShowValidationError(true);
            return false;
        }

        if (loadingAddressData.town === unloadingAddressData.town &&
            loadingAddressData.postal_code === unloadingAddressData.postal_code &&
            loadingAddressData.street === unloadingAddressData.street &&
            loadingAddressData.house_number === unloadingAddressData.house_number &&
            loadingAddressData.address === unloadingAddressData.address &&
            loadingAddressData.town !== "" && loadingAddressData.street !== "") {

            setValidationErrorMessage(INVENTORY_KEYS.validationSameAddress);
            setShowValidationError(true);
            return false;
        }

        if (loadingAddressData.street && unloadingAddressData.street &&
            loadingAddressData.street === unloadingAddressData.street &&
            loadingAddressData.town === unloadingAddressData.town) {

            setValidationErrorMessage(INVENTORY_KEYS.validationSameStreet);
            setShowValidationError(true);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

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

            const orderId = await createOrder(apiData);

            if (orderId) {
                setOrderId(orderId.value);
                setSubmitState({
                    success: true,
                    message: t(INVENTORY_KEYS.successMessageWithOrderId).replace('{orderId}', orderId.value)
                });
            } else {
                setSubmitState({
                    success: true,
                    message: t(INVENTORY_KEYS.successMessage)
                });
            }

            setCustomerData({fullName: "", phone: "", email: ""});
            setLoadingAddressData({town: "", postal_code: "", street: "", house_number: "", address: ""});
            setUnloadingAddressData({town: "", postal_code: "", street: "", house_number: "", address: ""});
            setAdditionalContext('');
            setSelectedItems([]);
        } catch {
            setSubmitState({
                success: false,
                message: t(INVENTORY_KEYS.errorMessage)
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
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isCreatingOrder}
                                    className="px-6 py-2 bg-primary text-white rounded-md disabled:opacity-50"
                                >
                                    {(isSubmitting || isCreatingOrder)
                                        ? t(INVENTORY_KEYS.sendRequest)
                                        : t(INVENTORY_KEYS.sendRequest)}
                                </Button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            <Toast.Root
                className="bg-destructive text-destructive-foreground rounded-md p-4 shadow-lg border relative"
                open={showValidationError}
                onOpenChange={setShowValidationError}
                duration={5000}
            >
                <Toast.Title className="font-semibold text-sm">
                    {t(INVENTORY_KEYS.validationErrorTitle)}
                </Toast.Title>
                <Toast.Description className="text-sm mt-1">
                    {t(validationErrorMessage)}
                </Toast.Description>
                <Toast.Close
                    className="absolute top-2 right-2 text-destructive-foreground hover:text-destructive-foreground/50 w-4 h-4 flex items-center justify-center"
                    aria-label="Затвори"
                >
                    <X className="w-4 h-4"/>
                </Toast.Close>
            </Toast.Root>

            <Toast.Root
                className={`${submitState?.success ? 'bg-green-600 text-white' : 'bg-destructive text-destructive-foreground'} rounded-md p-4 shadow-lg border relative`}
                open={submitState !== null}
                onOpenChange={(open) => !open && setSubmitState(null)}
                duration={7000}
            >
                <Toast.Title className="font-semibold text-sm">
                    {submitState?.success ? t(INVENTORY_KEYS.successTitle) : t(INVENTORY_KEYS.errorTitle)}
                </Toast.Title>
                <Toast.Description className="text-sm mt-1 pr-8">
                    {submitState?.message}
                </Toast.Description>
                {submitState?.success && orderId && (
                    <button
                        onClick={() => copyToClipboard(orderId)}
                        className="absolute top-2 right-8 hover:opacity-70 w-4 h-4 flex items-center justify-center"
                        aria-label="Копирай ID на поръчката"
                        title="Копирай ID на поръчката"
                    >
                        <Copy className="w-4 h-4"/>
                    </button>
                )}
                <Toast.Close
                    className="absolute top-2 right-2 hover:opacity-50 w-4 h-4 flex items-center justify-center"
                    aria-label="Затвори"
                >
                    <X className="w-4 h-4"/>
                </Toast.Close>
            </Toast.Root>

            <Toast.Viewport
                className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"/>
        </Toast.Provider>
    );
}