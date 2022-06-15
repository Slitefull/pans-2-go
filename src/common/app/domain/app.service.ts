import { makeAutoObservable } from "mobx";
import { BaseAppService } from "@/common/app/domain/app.common.service";
import { injector } from "@/common/injector/Injector";
import { History } from "history";
import { HISTORY } from "@/common/injector/constants";
import { UserRoles } from "@/common/constants/roles";


export class AppService implements BaseAppService {
  private _currentApp: UserRoles | "";
  private _isLoading: boolean;
  private _isOverlay: boolean;

  constructor() {
    this._currentApp = "";
    this._isLoading = false;
    this._isOverlay = false;

    makeAutoObservable(this);
  }

  public redirectTo(page: string) {
    AppService._history.push(page);
  }

  get currentApp(): UserRoles | "" {
    return this._currentApp;
  }

  get isOverlay(): boolean {
    return this._isOverlay;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    this._isLoading = value;
  }

  set isOverlay(value: boolean) {
    this._isOverlay = value;
  }

  set currentApp(value: UserRoles | "") {
    this._currentApp = value;
  }

  private static get _history() {
    return injector.get<History>(HISTORY);
  }
}
