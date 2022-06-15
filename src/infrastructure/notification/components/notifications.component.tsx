import NotificationsSystem, { atalhoTheme } from "reapop";
import React from "react";
import { observer } from "mobx-react";
import { NotificationService } from "../notification.service";
import { injector } from "@/common/injector/Injector";

export const Notifications = observer(() => {
  const notificationService = injector.get<NotificationService>(
    "NOTIFICATION_SERVICE"
  );

  return (
    <NotificationsSystem
      notifications={notificationService.notifications}
      dismissNotification={notificationService.removeNotification}
      theme={atalhoTheme}
    />
  );
});
