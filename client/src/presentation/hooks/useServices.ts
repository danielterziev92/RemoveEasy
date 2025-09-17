import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import type {RootState} from "@/infrastructure/store/store.ts";
import {selectError, selectIsLoading, selectServices} from "@/infrastructure/store/slices/servicesSlice.ts";

import {ServiceDisplayDto} from "@/presentation/dto";

import {manageServicesUseCase} from "@/shared/di/container.ts";

export default function useServices() {
    const services = useSelector((state: RootState) => selectServices(state));
    const isLoading = useSelector((state: RootState) => selectIsLoading(state));
    const error = useSelector((state: RootState) => selectError(state));

    const [servicesData, setServicesData] = useState<ServiceDisplayDto[]>([]);

    useEffect(() => {
        const loadServices = async () => {
            try {
                if (!services && !isLoading) {
                    await manageServicesUseCase.getServices();
                }
            } catch (error) {
                console.error('Failed to load services:', error);
            }
        };

        loadServices();
    }, [services, isLoading]);

    useEffect(() => {
        if (services) {
            const activeServices = services.getActiveServices();
            const serviceDTOs = activeServices.map(service => ServiceDisplayDto.fromEntity(service));
            setServicesData(serviceDTOs);
        } else {
            setServicesData([]);
        }
    }, [services]);

    return {
        services: servicesData,
        isLoading,
        error,
        refetch: () => manageServicesUseCase.getServices()
    };
}