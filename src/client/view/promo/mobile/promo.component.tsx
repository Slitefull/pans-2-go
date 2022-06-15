import React, { FC, useCallback } from 'react';
import logo from "@/ui-kit/icons/logo-full.svg";
import { Button } from "@/ui-kit/components/button/button.component";
import { AppService } from "@/common/app/domain/app.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, AUTH_SERVICE } from "@/common/injector/constants";
import { LOGIN_PAGE, REGISTRATION_PAGE, RESERVE_NOW_PAGE } from "@/common/constants/routes";
import { AuthService } from "@/common/auth/domain/auth.service";
import image from '../../../../ui-kit/images/promo/promo-mobile.png';
import UserMenu from "@/ui-kit/components/user-header/user-menu/user-menu.component";

import './promo.styles.scss';


const PromoMobile: FC = (): JSX.Element => {
  const appService: AppService = injector.get(APP_SERVICE);
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const onLoginHandler = useCallback(() => {
    appService.redirectTo(LOGIN_PAGE);
  }, [appService])

  const onClickHandler = useCallback(() => {
    if (authService.isAuthenticated) {
      appService.redirectTo(RESERVE_NOW_PAGE);
      return;
    }
    appService.redirectTo(REGISTRATION_PAGE);
  }, [appService, authService]);

  return (
    <div className="promo-mobile">
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
      <div className="body">
        <div className="text-wrapper">
          <p className="title">
            No wheels to go now?
          </p>
          <p className="subtitle">
            We have some!
          </p>
        </div>
        <img
          src={image}
          alt="Promo"
          className="image"
        />
        <Button
          className="body__button"
          onClick={onClickHandler}
        >
          Reserve car now
          <div className="arrows">
            <div className="glyphicon glyphicon-chevron-right bounce">›</div>
            <div className="glyphicon glyphicon-chevron-right bounce">›</div>
            <div className="glyphicon glyphicon-chevron-right bounce">›</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default PromoMobile;
