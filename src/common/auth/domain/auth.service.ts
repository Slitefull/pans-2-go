import i18next from "i18next";
import { action, makeAutoObservable } from "mobx";
import { History } from "history";
import { injector } from "@/common/injector/Injector";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { AppService } from "@/common/app/domain/app.service";
import { BaseAuthService } from "./auth.common.service";
import { AuthRepository, } from "@/common/auth/api/auth.repo";
import { CreateMediaByBase64Values, Media, MediaRepository } from "@/common/media/api/media.repo";
import { LOGIN_PAGE, ROOT_PAGE } from "@/common/constants/routes";
import { SocketsService } from "@/common/sockets/domain/sockets.service";
import { WSApi } from "@/infrastructure/api/wsapi";
import { NotificationsListService } from "@/admin/notifications-list/domain/notifications-list.service";
import {
  APP_SERVICE,
  AUTH_REPOSITORY,
  HISTORY,
  MEDIA_REPOSITORY,
  NOTIFICATION_SERVICE,
  NOTIFICATIONS_LIST_SERVICE,
  SESSION_USER_SERVICE,
  SOCKETS_SERVICE,
  WS_API,
} from "@/common/injector/constants";

import {
  LoginValues,
  RegistrationValues,
  ResetPasswordValues,
  RestorePasswordActivationValues,
  RestorePasswordValues,
  SendRestoreCodeValues
} from "../api/dto/auth.dto";


export class AuthService implements BaseAuthService {
  private _isAuthenticated: boolean;
  private _isOpenRestorePassword: boolean;
  private _driverLicenceMedias: Array<Media>;
  private _openedMobileTab: number;

  constructor() {
    this._isAuthenticated = false;
    this._isOpenRestorePassword = false;
    this._driverLicenceMedias = [];
    this._openedMobileTab = 0;

    makeAutoObservable(this);
  }

  @action
  public async getMe(): Promise<void> {
    try {
      const user = await AuthService._authRepo.getMe();

      if (user.role !== AuthService._appService.currentApp) {
        AuthService._notificationService.notify({
          message: i18next.t("auth.noAccess"),
          status: "error"
        })
        return;
      }

      AuthService._sessionUserService.fillFields(user);
      this.isAuthenticated = true;
    } catch (e) {
      AuthService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async login(
    values: LoginValues,
    redirectToPage?: string
  ): Promise<void> {
    try {
      const { accessToken, userDto } = await AuthService._authRepo.login(values);

      if (userDto.role !== AuthService._appService.currentApp) {
        AuthService._notificationService.notify({
          message: i18next.t("auth.noAccess"),
          status: "error"
        })
        return;
      }

      await AuthService._authRepo.setToken(accessToken);
      await this.getMe();
      if (redirectToPage) AuthService._appService.redirectTo(redirectToPage);
    } catch (e) {
      AuthService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async registration(values: RegistrationValues): Promise<void> {
    try {
      await AuthService._authRepo.registration(values);
      switch (values.notificationType) {
        case 'email':
          AuthService._notificationService.notify({
            message: i18next.t("auth.theActivationMessageHasBeenSentCheckYourEmail"),
            status: "success",
          });
          break;
        case 'sms':
          AuthService._notificationService.notify({
            message: i18next.t("auth.theActivationMessageHasBeenSentCheckYourPhone"),
            status: "success",
          });
          break;
        default:
          break;
      }

      AuthService._history.push(ROOT_PAGE);
    } catch (e) {
      AuthService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async userActivation(token: string): Promise<void> {
    try {
      await AuthService._authRepo.userActivation(token);

      AuthService._notificationService.notify({
        message: i18next.t("auth.userHasBeenSuccessfullyActivated"),
        status: "success",
      });
    } catch (e) {
      AuthService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async sendRestoreCode(data: SendRestoreCodeValues): Promise<void> {
    try {
      await AuthService._authRepo.sendRestoreCode(data);

      AuthService._notificationService.notify({
        message: i18next.t("auth.theRestorationCodeHasBeenSuccessfullySent"),
        status: "success",
      });
    } catch (e) {
      AuthService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async restorePassword(data: RestorePasswordValues): Promise<void> {
    try {
      await AuthService._authRepo.restorePassword(data);

      AuthService._notificationService.notify({
        message: i18next.t("auth.theRestorationCodeHasBeenSuccessfullySent"),
        status: "success",
      });
    } catch (e) {
      AuthService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async restorePasswordActivation(data: RestorePasswordActivationValues, redirectPage: string): Promise<void> {
    try {
      await AuthService._authRepo.restorePasswordActivation(data);
      AuthService._appService.redirectTo(redirectPage);

      AuthService._notificationService.notify({
        message: i18next.t("auth.passwordHasBeenSuccessfullyRestored"),
        status: "success",
      });
    } catch (e) {
      AuthService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async resetPassword(values: ResetPasswordValues): Promise<void> {
    try {
      await AuthService._authRepo.resetPassword(values);
      AuthService._authRepo.setToken(null);
      this.isAuthenticated = false;
      AuthService._appService.redirectTo(LOGIN_PAGE);

      AuthService._notificationService.notify({
        message: i18next.t("auth.resetCodeHasBeenSuccessfullySent"),
        status: "success",
      });
    } catch (e) {
      AuthService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async createDriverLicenceImage(
    values: Array<CreateMediaByBase64Values>
  ): Promise<void> {
    try {
      const { data: createdMediaIds } = await AuthService._mediaRepo.createMediaByBase64(values);
      if (createdMediaIds.length === 2) {
        this._driverLicenceMedias = createdMediaIds;
      } else {
        this._driverLicenceMedias = [...this.driverLicenceMedias, ...createdMediaIds]
      }

      AuthService._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      AuthService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public logout(page: string): void {
    AuthService._authRepo.setToken(null);
    this.isAuthenticated = false;
    AuthService._sessionUserService.reset();
    AuthService._appService.redirectTo(page);
  }

  get token(): string | null {
    return AuthService._authRepo.getToken();
  }

  get isTokenExist(): boolean {
    return !!AuthService._authRepo.getToken();
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get isOpenRestorePassword(): boolean {
    return this._isOpenRestorePassword;
  }

  get driverLicenceMedias(): Array<Media> {
    return this._driverLicenceMedias;
  }

  get openedMobileTab(): number {
    return this._openedMobileTab;
  }

  set openedMobileTab(value: number) {
    this._openedMobileTab = value;
  }

  set driverLicenceMedias(value: Array<Media>) {
    this._driverLicenceMedias = value;
  }

  set isOpenRestorePassword(value: boolean) {
    this._isOpenRestorePassword = value;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  private static get _history() {
    return injector.get<History>(HISTORY);
  }

  private static get _authRepo() {
    return injector.get<AuthRepository>(AUTH_REPOSITORY);
  }

  private static get _mediaRepo() {
    return injector.get<MediaRepository>(MEDIA_REPOSITORY);
  }

  private static get _sessionUserService() {
    return injector.get<SessionUserService>(SESSION_USER_SERVICE);
  }

  private static get _wsApiService() {
    return injector.get<WSApi>(WS_API);
  }

  private static get _socketsService() {
    return injector.get<SocketsService>(SOCKETS_SERVICE);
  }

  private static get _notificationsListService() {
    return injector.get<NotificationsListService>(NOTIFICATIONS_LIST_SERVICE);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private static get _appService() {
    return injector.get<AppService>(APP_SERVICE);
  }
}
