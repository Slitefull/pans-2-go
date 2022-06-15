import React, { FC } from 'react';
import { NotificationsListElement } from "@/admin/notifications-list/api/dto/notifications-list.dto";
import NotificationListElement
  from "@/admin/notifications-list/view/notification-list-element/notification-list-element.component";

import "./notifications-list.styles.scss";


interface NotificationsListProps {
  notifications: Array<NotificationsListElement>;
}

const NotificationsList: FC<NotificationsListProps> = ({ notifications }): JSX.Element => {
  return (
    <div className="notifications-list">
      <p className="notifications-list__title">
        Notifications
      </p>
      {notifications.map((notification) => (
        <NotificationListElement
          type={notification.type}
          message={notification.message}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
