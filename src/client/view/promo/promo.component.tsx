import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { AuthService } from "@/common/auth/domain/auth.service";
import { injector } from "@/common/injector/Injector";
import { AUTH_SERVICE } from "@/common/injector/constants";
import PromoDesktop from "@/client/view/promo/desktop/promo.component";

import './promo.styles.scss';


const Promo: FC = observer((): JSX.Element => {
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (token) authService.userActivation(token);
  }, []);

  return (
    <div className="promo">
      <PromoDesktop/>
    </div>
  );
});

export default Promo;
