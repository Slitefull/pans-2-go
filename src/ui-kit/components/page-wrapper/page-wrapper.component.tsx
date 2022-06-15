import React, { FC, ReactNode, useCallback, useMemo, useRef } from "react";
import { observer } from "mobx-react";
import Sidebar from "@/ui-kit/components/sidebar/sidebar.component";
import { useTranslation } from "react-i18next";
import { sidebarMenuOptions } from "@/common/constants/menus";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, NOTIFICATIONS_LIST_SERVICE, SIDEBAR_SERVICE } from "@/common/injector/constants";
import { SidebarService } from "@/common/sidebar/domain/sidebar.service";
import { UserHeader } from "@/ui-kit/components/user-header/user-header.component";
import NotificationsIcon from "@/ui-kit/customized-icons/notifications/notifications.component";
import ArrowBackIcon from "@/ui-kit/customized-icons/arrow/arrow-back.component";
import { ROOT_PAGE } from "@/common/constants/routes";
import { AppService } from "@/common/app/domain/app.service";
import { isMobile } from "react-device-detect";
import { NotificationsListService } from "@/admin/notifications-list/domain/notifications-list.service";
import { UserRoles } from "@/common/constants/roles";
import { useOutsideClick } from "@/ui-kit/hooks/use-outsid-click";
import NotificationsList from "@/admin/notifications-list/view/notifications-list.components";

import "./page-wrapper.styles.scss";


interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  withSidebar?: boolean;
  withClientHeader?: boolean;
  buttons?: ReactNode;
  withBacklinkButton?: boolean;
  backLinkText?: string;
}

const PageWrapper: FC<PageWrapperProps> = observer(
  ({
     children,
     title,
     withSidebar,
     withClientHeader,
     buttons,
     withBacklinkButton,
     backLinkText,
   }
  ): JSX.Element => {
    const { t } = useTranslation();
    const appService: AppService = injector.get(APP_SERVICE);
    const sidebarService: SidebarService = injector.get(SIDEBAR_SERVICE);
    const notificationsListService: NotificationsListService = injector.get(NOTIFICATIONS_LIST_SERVICE);

    const notificationsListRef = useRef<HTMLDivElement>(null);

    const reversedNotifications = [...notificationsListService.notifications].reverse(); // 4 3 2 1

    const notifications = useMemo(
      () => reversedNotifications,
      [notificationsListService.notifications]
    );

    const onBackLinkHandler = useCallback(() => {
      appService.redirectTo(ROOT_PAGE);
    }, []);

    const onOpenNotificationListToggle = useCallback(() => {
      notificationsListService.isOpenNotificationList = !notificationsListService.isOpenNotificationList;
    }, [notificationsListService]);

    useOutsideClick(notificationsListRef, () => {
      notificationsListService.isOpenNotificationList = false;
    });

    return (
      <>
        {withSidebar && (
          <Sidebar
            options={sidebarMenuOptions(t, sidebarService.selectedItem)}
          />
        )}
        <div className="page-wrapper">
          {withClientHeader && <UserHeader/>}
          {(title || buttons) && (
            <div className="title-wrapper">
              <div className="link-wrapper-page">
                {withBacklinkButton && (
                  <ArrowBackIcon
                    onClickHandler={onBackLinkHandler}
                    color="#000000"
                    size={20}
                  />
                )}
                {(isMobile && backLinkText) && <p className="page-title">{backLinkText}</p>}
                {!isMobile && <p className="page-title">{title}</p>}
              </div>
              <div className="right-side">
                {appService.currentApp === UserRoles.admin && (
                  <div className="notifications-wrapper" ref={notificationsListRef}>
                    <div onClick={onOpenNotificationListToggle} className="notifications">
                      <NotificationsIcon color="#FFFFFF"/>
                    </div>
                    {notificationsListService.isOpenNotificationList && (
                      <NotificationsList notifications={notifications}/>
                    )}
                  </div>
                )}
                <div className="buttons">
                  {buttons}
                </div>
              </div>
            </div>
          )}
          {children}
        </div>
      </>
    );
  }
);

export default PageWrapper;
