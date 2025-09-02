import type {AddressFormProps} from "@/presentation/types";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {INVENTORY_ADDRESS_FORM} from "@/shared/messages/messages.ts";

export default function AddressForm(
    {title, prefix, form, onChange, t}: AddressFormProps,
) {
    return (
        <div className="md:col-span-2 mt-6">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="grid gap-2">
                <Label htmlFor={`${prefix}_town`}>{t(INVENTORY_ADDRESS_FORM.town)}</Label>
                <Input
                    id={`${prefix}_town`}
                    name={`${prefix}_town`}
                    required
                    value={form.town}
                    onChange={(e) => onChange('town', e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`${prefix}_postal_code`}>{t(INVENTORY_ADDRESS_FORM.address)}</Label>
                <Input
                    id={`${prefix}_postal_code`}
                    name={`${prefix}_postal_code`}
                    required
                    value={form.postal_code}
                    onChange={(e) => onChange('postal_code', e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`${prefix}_street`}>{t(INVENTORY_ADDRESS_FORM.street)}</Label>
                <Input
                    id={`${prefix}_street`}
                    name={`${prefix}_street`}
                    required
                    value={form.street}
                    onChange={(e) => onChange('street', e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`${prefix}_house_number`}>{t(INVENTORY_ADDRESS_FORM.buildingNumber)}</Label>
                <Input
                    id={`${prefix}_house_number`}
                    name={`${prefix}_house_number`}
                    required
                    value={form.house_number}
                    onChange={(e) => onChange('house_number', e.target.value)}
                />
            </div>
            <div className="grid gap-2 md:col-span-2">
                <Label htmlFor={`${prefix}_address`}>{t(INVENTORY_ADDRESS_FORM.address)}</Label>
                <Input
                    id={`${prefix}_address`}
                    name={`${prefix}_address`}
                    placeholder={t("Apartment, entrance, floor", "Апартамент, вход, етаж")}
                    value={form.address}
                    onChange={(e) => onChange('address', e.target.value)}
                />
            </div>
        </div>
    )
}