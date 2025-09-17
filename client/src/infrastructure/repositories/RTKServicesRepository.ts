import type {Store} from "@reduxjs/toolkit";

import {Services} from "@/domain/aggregates";
import type {IServicesRepository} from "@/domain/repositories";

import type {RootState} from "@/infrastructure/store/store.ts";
import {clearServices, setServices} from "@/infrastructure/store/slices/servicesSlice.ts";

export class RTKServicesRepository implements IServicesRepository {
    private store: Store<RootState>

    constructor(store: Store<RootState>) {
        this.store = store;
    }

    getServices(): Services | null {
        const state = this.store.getState();
        return state.services.services;
    }

    saveServices(services: Services): void {
        this.store.dispatch(setServices(services));
    }

    clearServices(): void {
        this.store.dispatch(clearServices());
    }
}