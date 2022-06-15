import { NotificationsListElement } from "@/admin/notifications-list/api/dto/notifications-list.dto";


export interface NotificationsListRepository {
  getAllNotifications(): Promise<Array<NotificationsListElement>>;

  getNotificationById(id: string): Promise<NotificationsListElement>;
}
