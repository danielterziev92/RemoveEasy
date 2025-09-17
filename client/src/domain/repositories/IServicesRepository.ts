import {Services} from "@/domain/aggregates";

export interface IServicesRepository {
    getServices(): Services | null;

    saveServices(services: Services): void;

    clearServices(): void;
}