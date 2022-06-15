import React, { Suspense, useEffect } from "react";
import { observer } from "mobx-react";
import { Helmet } from "react-helmet";
import { Notifications } from "@/infrastructure/notification/components/notifications.component";
import { Modals } from "@/infrastructure/notification/components/modals.component";
import { SuspenseLoader } from "@/ui-kit/components/suspense-loader/suspense-loader.component";
import { RootCustomerRouter } from "@/infrastructure/router/root/root-customer.router";
import { AuthenticatedCustomer } from "@/infrastructure/guards/authenticated-customer.guard";
import { NotAuthenticatedCustomer } from "@/infrastructure/guards/not-authenticated-customer.guard";
import { AppService } from "@/common/app/domain/app.service";
import { injector } from "@/common/injector/Injector";
import { UserRoles } from "@/common/constants/roles";
import { SocketStatus, WSApi } from "@/infrastructure/api/wsapi";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { AuthService } from "@/common/auth/domain/auth.service";
import { APP_SERVICE, AUTH_SERVICE, SESSION_USER_SERVICE, WS_API } from "@/common/injector/constants";
import Overlay from "@/ui-kit/components/overlay/overlay.component";


const Customer = observer((): JSX.Element => {
  const appService: AppService = injector.get(APP_SERVICE);
  const wsAPIService: WSApi = injector.get(WS_API);
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);

  useEffect(() => {
    appService.currentApp = UserRoles.user;
  }, [appService]);

  useEffect(() => {
    if ((wsAPIService.socketStatus === SocketStatus.OPENED) && authService.isAuthenticated) {
      wsAPIService.send({ event: 'subscribe', type: 'client', id: sessionUserService.id })
    }
  }, [wsAPIService.socketStatus, authService.isAuthenticated])

  return (
    <Suspense fallback={<SuspenseLoader/>}>
      <Helmet titleTemplate="%s | Wheels2Go Customer"/>
      <RootCustomerRouter/>
      <AuthenticatedCustomer/>
      <NotAuthenticatedCustomer/>
      <Notifications/>
      <Modals/>
      {appService.isOverlay && <Overlay/>}
    </Suspense>
  );
});

export default Customer;
