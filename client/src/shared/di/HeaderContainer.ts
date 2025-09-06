import {HeaderViewService} from "@/presentation/services";
import {ApplicationContainer} from "@/shared/di/ApplicationContainer.ts";

class HeaderContainer {
    private _headerViewService: HeaderViewService | null = null;

    get navigationService() {
        const appContainer = ApplicationContainer.getInstance();
        if (!appContainer.isInitialized()) {
            throw new Error('ApplicationContainer must be initialized before using headerContainer');
        }
        return appContainer.navigationService;
    }

    get headerViewService(): HeaderViewService {
        if (!this._headerViewService) {
            this._headerViewService = new HeaderViewService(this.navigationService);
        }
        return this._headerViewService;
    }

    reset() {
        this._headerViewService = null;
    }
}

export const headerContainer = new HeaderContainer();