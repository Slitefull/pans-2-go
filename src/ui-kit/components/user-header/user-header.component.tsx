import React, { FC } from 'react';
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthService } from "@/common/auth/domain/auth.service";
import { injector } from "@/common/injector/Injector";
import { AUTH_SERVICE } from "@/common/injector/constants";
import { LOGIN_PAGE } from "@/common/constants/routes";
import UserMenu from "@/ui-kit/components/user-header/user-menu/user-menu.component";

import "./user-header.styles.scss";


export const UserHeader: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const authService: AuthService = injector.get(AUTH_SERVICE);

  return (
    <section className="main-header">
      <h5 className='hide-for-mobile'>{
        t("auth.wheels2go")}
      </h5>
      {authService.isAuthenticated
        ? <UserMenu/>
        : <Link
          to={LOGIN_PAGE}
          className="btn btn-blue"
        >
          {t("auth.logIn").toUpperCase()}
        </Link>
      }
    </section>
  )
});
