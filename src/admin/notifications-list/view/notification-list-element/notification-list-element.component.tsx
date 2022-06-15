import React, { FC } from 'react';
import AlertIcon from "@/ui-kit/customized-icons/alert-circle/alert-circle.component";

import "./notification-list-element.styles.scss";


interface NotificationListElementProps {
  type: "success" | "warning" | "error";
  message: string;
}

const NotificationListElement: FC<NotificationListElementProps> = (
  {
    message,
    type
  }): JSX.Element => {
  const notificationTypeProxy = (notificationKind: "success" | "warning" | "error") => {
    switch (notificationKind) {
      case "success":
        return "green";
      case "warning":
        return "#cfae36";
      case "error":
        return "red";
      default:
        return "red";
    }
  }

  return (
    <div className="notification-element">
      <div className="kind">
        <AlertIcon color={notificationTypeProxy(type)}/>
      </div>
      <p className="text">
        {message}
      </p>
    </div>
  );
};

export default NotificationListElement;
