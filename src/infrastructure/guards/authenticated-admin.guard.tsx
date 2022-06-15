import { injector } from "@/common/injector/Injector";
import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { AuthService } from "@/common/auth/domain/auth.service";
import { APP_SERVICE, AUTH_SERVICE } from "@/common/injector/constants";
import { AppService } from "@/common/app/domain/app.service";
import { LOGIN_PAGE, ROOT_PAGE } from "@/common/constants/routes";


export const AuthenticatedAdmin: FC = observer(() => {
  const appService: AppService = injector.get(APP_SERVICE);
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const currentPage = window.location.pathname;
  const redirectPages = [LOGIN_PAGE];

  if (redirectPages.includes(currentPage)) {
    appService.redirectTo(ROOT_PAGE);
  }

  useEffect(() => {
    if (authService.isTokenExist) {
      authService.getMe();
    }
  }, [])

  return null;
});
