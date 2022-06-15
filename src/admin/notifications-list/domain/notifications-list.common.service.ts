import { NotificationsListElement } from "@/admin/notifications-list/api/dto/notifications-list.dto";


export interface BaseNotificationsListService {
  notifications: Array<NotificationsListElement>;
  isOpenNotificationList: boolean;

  reset(): void;
}
