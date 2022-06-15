import { injector } from "@/common/injector/Injector";
import { FC } from "react";
import { observer } from "mobx-react";
import { AuthService } from "@/common/auth/domain/auth.service";
import { APP_SERVICE, AUTH_SERVICE } from "@/common/injector/constants";
import { AppService } from "@/common/app/domain/app.service";

import {
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  RESERVE_NOW_PAGE,
  RESTORE_PASSWORD_PAGE,
  ROOT_PAGE
} from "@/common/constants/routes";


const TOKEN_NAME = "token";

export const NotAuthenticatedCustomer: FC = observer(() => {
  const appService: AppService = injector.get(APP_SERVICE);
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const currentPage = window.location.pathname;
  const token = new URLSearchParams(window.location.search).get(TOKEN_NAME);
  const availablePages = [RESTORE_PASSWORD_PAGE, RESERVE_NOW_PAGE, REGISTRATION_PAGE, ROOT_PAGE, LOGIN_PAGE];

  if (token) return null

  if (availablePages.includes(currentPage)) return null

  if (!authService.isTokenExist) {
    appService.redirectTo(LOGIN_PAGE);
  }

  return null;
});
