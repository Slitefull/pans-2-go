import { NewNotification } from "reapop";

export interface BaseNotificationService {
  notify(notification: NewNotification): void;
}
