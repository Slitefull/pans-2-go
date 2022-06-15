import React, { FC, useCallback } from 'react';
import { REGISTRATION_PAGE, RESERVE_NOW_PAGE } from "@/common/constants/routes";
import { AppService } from "@/common/app/domain/app.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, AUTH_SERVICE } from "@/common/injector/constants";
import { AuthService } from "@/common/auth/domain/auth.service";
import { Button } from "@/ui-kit/components/button/button.component";
import phones from "@/ui-kit/images/promo/phones.png";

import './main.styles.scss';


const Main: FC = (): JSX.Element => {
  const appService: AppService = injector.get(APP_SERVICE);
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const onClickHandler = useCallback(() => {
    if (authService.isAuthenticated) {
      appService.redirectTo(RESERVE_NOW_PAGE);
      return;
    }
    appService.redirectTo(REGISTRATION_PAGE);
  }, [appService, authService]);

  return (
    <div className="main-section">
      <div className="left-section">
        <h2 className="title">No wheels to go?</h2>
        <h2 className="subtitle">We have some!</h2>

        <p className="text">
          Multiple solutions with flexible rates for all <br/> your car needs for your daily requests
        </p>
        <Button
          className="main-section__button"
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
      <div className="right-section">
        <img
          src={phones}
          alt="Wheels2Go"
          className="right-section__image"
        />
      </div>
    </div>
  );
};

export default Main;
