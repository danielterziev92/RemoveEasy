import type {AddressFormData} from "@/presentation/types/AddressFormData.ts";

export interface AddressFormProps {
    title: string;
    prefix: string;
    form: AddressFormData;
    onChange: (field: keyof AddressFormData, value: string) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
}