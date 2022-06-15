import { NewNotification, Notification, POSITIONS, STATUSES } from "reapop";
import { IObservableArray, makeAutoObservable, toJS } from "mobx";
import i18next from "i18next";

import { getIncrementalId } from "@/ui-kit/helpers/generate-id";
import {
  Modal,
  ModalAppearance,
  ModalType,
  ResultButton,
} from "./notification.repo";

interface ConfirmPropsDefault {
  text: string;
  title?: string;
  appearance?: ModalAppearance;
}

interface ConfirmPropsWithCustomButtons<T> extends ConfirmPropsDefault {
  resultOptions: Array<ResultButton<T>>;
  closeValue: T;
}

const DEFAULT_NOTIFICATION_TIME = 5000;

export class NotificationService {
  private _notifications: Array<Notification> = [];

  private _modalQueue: Array<Modal<any>> = [];

  constructor() {
    makeAutoObservable(this);
  }

  private addNotification(notificationShape: NewNotification): void {
    const notification: Notification = {
      ...this.getNotificationDefaults(),
      ...notificationShape,
    };

    this._notifications.push(notification);

    window.setTimeout(
      this.removeNotification,
      notification.dismissAfter,
      notification.id
    );
  }

  private getNotificationDefaults(): Notification {
    return {
      id: getIncrementalId().toString(),
      status: STATUSES.info,
      position: POSITIONS.topRight,
      buttons: [],
      dismissAfter: DEFAULT_NOTIFICATION_TIME,
      dismissible: true,
      showDismissButton: true,
    };
  }

  notify(notification: NewNotification = {}): void {
    this.addNotification({
      ...notification,
      title: notification.title && i18next.t(notification.title),
      message: notification.message && i18next.t(notification.message),
    });
  }

  removeNotification = (id: string): void => {
    (this._notifications as IObservableArray).replace(
      this._notifications.filter((notification) => notification.id !== id)
    );
  };

  alert(alertProps: {
    text: string;
    title?: string;
    appearance?: ModalAppearance;
  }): void {
    this._modalQueue.push({
      id: getIncrementalId(),
      type: ModalType.ALERT,
      ...alertProps,
    });
  }

  confirm(confirmProps: ConfirmPropsDefault): Promise<boolean> {
    return this.confirmAdvanced({
      ...confirmProps,
      resultOptions: [
        {
          label: "notification.ok",
          value: true,
          type: "main",
        },
        {
          label: "notification.cancel",
          value: false,
          type: "outline",
        },
      ],
      closeValue: false,
    });
  }

  confirmAdvanced<T>(
    confirmProps: ConfirmPropsWithCustomButtons<T>
  ): Promise<T> {
    return new Promise((resolve) => {
      this._modalQueue.push({
        id: getIncrementalId(),
        type: ModalType.CONFIRM,
        onResult: (result: T) => resolve(result),
        onClose: () => resolve(confirmProps.closeValue),
        ...confirmProps,
      });
    });
  }

  removeFirstModal = (): void => {
    this._modalQueue.shift();
  };

  get notifications() {
    return toJS(this._notifications);
  }

  get modal(): Modal<any> | undefined {
    // toJS is important
    toJS(this._modalQueue);
    return this._modalQueue[0];
  }
}
