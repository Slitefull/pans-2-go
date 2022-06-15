import { injector } from "@/common/injector/Injector";
import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { AuthService } from "@/common/auth/domain/auth.service";
import { APP_SERVICE, AUTH_SERVICE } from "@/common/injector/constants";
import { AppService } from "@/common/app/domain/app.service";
import { LOGIN_PAGE, REGISTRATION_PAGE, ROOT_PAGE } from "@/common/constants/routes";


const TOKEN_NAME = "token";

export const AuthenticatedCustomer: FC = observer(() => {
  const appService: AppService = injector.get(APP_SERVICE);
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const currentPage = window.location.pathname;
  const token = new URLSearchParams(window.location.search).get(TOKEN_NAME);
  const redirectPages = [REGISTRATION_PAGE, LOGIN_PAGE];

  if (token) return null

  if (authService.isTokenExist && redirectPages.includes(currentPage)) {
    appService.redirectTo(ROOT_PAGE);
  }

  useEffect(() => {
    if (authService.isTokenExist) {
      authService.getMe();
    }
  }, [])

  return null;
});
