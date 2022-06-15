import React, { FC, useCallback } from 'react';
import logo from '../../../../../../ui-kit/icons/logo-full.svg';
import { Button } from "@/ui-kit/components/button/button.component";
import { AppService } from "@/common/app/domain/app.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, AUTH_SERVICE } from "@/common/injector/constants";
import { LOGIN_PAGE } from "@/common/constants/routes";
import { AuthService } from "@/common/auth/domain/auth.service";
import UserMenu from "@/ui-kit/components/user-header/user-menu/user-menu.component";

import './header.styles.scss';


const Header: FC = (): JSX.Element => {
  const appService: AppService = injector.get(APP_SERVICE);
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const onLoginHandler = useCallback(() => {
    appService.redirectTo(LOGIN_PAGE);
  }, [appService])

  return (
    <div className="header">
      <img src={logo} alt="logo"/>
      {authService.isAuthenticated
        ? <UserMenu/>
        : <Button
          className="header-login-button"
          color="primary"
          onClick={onLoginHandler}
        >
          LOG IN
        </Button>
      }
    </div>
  );
};

export default Header;
