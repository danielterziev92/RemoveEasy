import {Service} from "@/domain/entities";
import type {ServiceId} from "@/domain/value-objects/ServiceId.ts";
import {Locale} from "@/domain/value-objects";

export class Services {
    private readonly services: Map<string, Service> = new Map();

    private constructor(services?: Service[]) {
        if (services) {
            services.forEach(service => {
                if (service.isActive) {
                    this.services.set(service.id.toString(), service);
                }
            });
        }
    }

    static create(services?: Service[]): Services {
        return new Services(services);
    }

    addService(service: Service): void {
        if (service.isActive) {
            this.services.set(service.id.toString(), service);
        }
    }

    removeService(serviceId: ServiceId): boolean {
        return this.services.delete(serviceId.toString());
    }

    getService(serviceId: ServiceId): Service | undefined {
        return this.services.get(serviceId.toString());
    }

    getAllServices(): Service[] {
        return Array.from(this.services.values());
    }

    getActiveServices(): Service[] {
        return this.getAllServices().filter(service => service.isActive);
    }

    findServicesByTitle(searchTerm: string, locale?: Locale): Service[] {
        const term = searchTerm.toLowerCase();
        const targetLocale = locale ?? Locale.getDefault();

        return this.getAllServices().filter(service => {
            const title = service.getTitleByLocale(targetLocale).toLowerCase();
            const subtitle = service.getSubtitleByLocale(targetLocale)?.toLowerCase() || '';
            return title.includes(term) || subtitle.includes(term);
        });
    }

    getServiceCount(): number {
        return this.services.size;
    }

    getTotalActiveServiceCount(): number {
        return this.getActiveServices().length;
    }

    toObject() {
        return {
            services: this.getAllServices().map(service => service.toObject()),
            totalServices: this.getServiceCount(),
            activeServices: this.getTotalActiveServiceCount()
        };
    }
}