import { api } from "@/common/api";
import { NotificationsListRepository } from "@/admin/notifications-list/api/notifications-list.repo";
import { NotificationsListElement } from "@/admin/notifications-list/api/dto/notifications-list.dto";


export class HttpNotificationsListRepository implements NotificationsListRepository {
  async getAllNotifications(): Promise<Array<NotificationsListElement>> {
    const response = await api.get(`/notification`);
    return response.data;
  }

  async getNotificationById(id: string): Promise<NotificationsListElement> {
    const response = await api.get(`/notification/${id}`);
    return response.data;
  }
}
