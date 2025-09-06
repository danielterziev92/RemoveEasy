import type {AddressFormProps} from "@/presentation/types";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {INVENTORY_ADDRESS_FORM} from "@/shared/messages/messages.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function AddressForm(
    {title, prefix, form, onChange, t}: AddressFormProps,
) {
    const handleChange = (field: keyof typeof form, value: string) => {
        onChange(field, value);
    };

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="text-center">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor={`${prefix}-town`}>
                            {t(INVENTORY_ADDRESS_FORM.town)}
                        </Label>
                        <Input
                            id={`${prefix}-town`}
                            name={`${prefix}_town`}
                            required
                            value={form.town}
                            onChange={(e) => handleChange("town", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor={`${prefix}-postal_code`}>
                            {t(INVENTORY_ADDRESS_FORM.postalCode)}
                        </Label>
                        <Input
                            id={`${prefix}-postal_code`}
                            name={`${prefix}_postal_code`}
                            value={form.postal_code}
                            onChange={(e) => handleChange("postal_code", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor={`${prefix}-street`}>
                            {t(INVENTORY_ADDRESS_FORM.street)}
                        </Label>
                        <Input
                            id={`${prefix}-street`}
                            name={`${prefix}_street`}
                            required
                            value={form.street}
                            onChange={(e) => handleChange("street", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor={`${prefix}-house_number`}>
                            {t(INVENTORY_ADDRESS_FORM.buildingNumber)}
                        </Label>
                        <Input
                            id={`${prefix}-house_number`}
                            name={`${prefix}_house_number`}
                            value={form.house_number}
                            onChange={(e) => handleChange("house_number", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor={`${prefix}-address`}>
                            {t(INVENTORY_ADDRESS_FORM.address)}
                        </Label>
                        <Input
                            id={`${prefix}-address`}
                            name={`${prefix}_address`}
                            placeholder={t(INVENTORY_ADDRESS_FORM.addressPlaceholder)}
                            value={form.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}