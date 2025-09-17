import type {ServiceData} from "@/domain/types";

export interface IServicesApiClient {
    fetchServices(): Promise<{ services: ServiceData[] }>;
}