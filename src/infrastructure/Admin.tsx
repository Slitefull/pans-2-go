import React, { Suspense, useEffect } from "react";
import { observer } from "mobx-react";
import { Helmet } from "react-helmet";
import { Notifications } from "@/infrastructure/notification/components/notifications.component";
import { Modals } from "@/infrastructure/notification/components/modals.component";
import { SuspenseLoader } from "@/ui-kit/components/suspense-loader/suspense-loader.component";
import { RootAdminRouter } from "@/infrastructure/router/root/root-admin.router";
import { AuthenticatedAdmin } from "@/infrastructure/guards/authenticated-admin.guard";
import { NotAuthenticatedAdmin } from "@/infrastructure/guards/not-authenticated-admin.guard";
import { AppService } from "@/common/app/domain/app.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, AUTH_SERVICE, NOTIFICATIONS_LIST_SERVICE, WS_API } from "@/common/injector/constants";
import { UserRoles } from "@/common/constants/roles";
import { NotificationsListService } from "@/admin/notifications-list/domain/notifications-list.service";
import { AuthService } from "@/common/auth/domain/auth.service";
import { SocketStatus, WSApi } from "@/infrastructure/api/wsapi";
import Overlay from "@/ui-kit/components/overlay/overlay.component";


const Admin = observer((): JSX.Element => {
  const appService: AppService = injector.get(APP_SERVICE);
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const notificationsListService: NotificationsListService = injector.get(NOTIFICATIONS_LIST_SERVICE);
  const wsAPIService: WSApi = injector.get(WS_API);

  useEffect(() => {
    appService.currentApp = UserRoles.admin;
  }, [appService]);

  useEffect(() => {
    if ((wsAPIService.socketStatus === SocketStatus.OPENED) && authService.isAuthenticated) {
      wsAPIService.send({ event: 'subscribe', type: 'admin', })
      notificationsListService.getAllNotifications();
    }
  }, [wsAPIService.socketStatus, authService.isAuthenticated])

  return (
    <Suspense fallback={<SuspenseLoader/>}>
      <Helmet titleTemplate="%s | Wheels2Go admin"/>
      <RootAdminRouter/>
      <AuthenticatedAdmin/>
      <NotAuthenticatedAdmin/>
      <Notifications/>
      <Modals/>
      {appService.isOverlay && <Overlay/>}
    </Suspense>
  );
});

export default Admin;
