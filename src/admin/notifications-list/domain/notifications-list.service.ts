import { injector } from "@/common/injector/Injector";
import { NOTIFICATION_SERVICE, NOTIFICATIONS_LIST_REPOSITORY } from "@/common/injector/constants";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { action, makeAutoObservable } from "mobx";
import { BaseNotificationsListService } from "@/admin/notifications-list/domain/notifications-list.common.service";
import { NotificationsListElement } from "@/admin/notifications-list/api/dto/notifications-list.dto";
import { NotificationsListRepository } from "@/admin/notifications-list/api/notifications-list.repo";


export class NotificationsListService implements BaseNotificationsListService {
  private _notifications: Array<NotificationsListElement>;
  private _isOpenNotificationList: boolean;

  constructor() {
    this._notifications = [];
    this._isOpenNotificationList = false;

    makeAutoObservable(this);
  }

  @action
  async getAllNotifications(): Promise<void> {
    try {
      this._notifications = await NotificationsListService._notificationListRepo.getAllNotifications();
    } catch (e) {
      NotificationsListService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getNotificationById(id: string): Promise<void> {
    try {
      await NotificationsListService._notificationListRepo.getNotificationById(id);
    } catch (e) {
      NotificationsListService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  reset(): void {
    this._notifications = [];
    this._isOpenNotificationList = false;
  }

  get notifications(): Array<NotificationsListElement> {
    return this._notifications;
  }

  get isOpenNotificationList(): boolean {
    return this._isOpenNotificationList;
  }

  set isOpenNotificationList(value: boolean) {
    this._isOpenNotificationList = value;
  }

  set notifications(value: Array<NotificationsListElement>) {
    this._notifications = value;
  }

  private static get _notificationListRepo() {
    return injector.get<NotificationsListRepository>(NOTIFICATIONS_LIST_REPOSITORY);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }
}
