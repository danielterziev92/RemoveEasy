import {HeaderViewService, NavigationService} from "@/application/services";

class HeaderContainer {
    private _navigationService: NavigationService | null = null;
    private _headerViewService: HeaderViewService | null = null;

    get navigationService(): NavigationService {
        if (!this._navigationService) {
            this._navigationService = new NavigationService();
        }
        return this._navigationService;
    }

    get headerViewService(): HeaderViewService {
        if (!this._headerViewService) {
            this._headerViewService = new HeaderViewService(this.navigationService);
        }
        return this._headerViewService;
    }
}

export const headerContainer = new HeaderContainer();