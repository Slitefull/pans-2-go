import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { AuthService } from "@/common/auth/domain/auth.service";
import { injector } from "@/common/injector/Injector";
import { AUTH_SERVICE } from "@/common/injector/constants";
import LoginForm from "@/common/auth/view/login/login.component";
import SendRestoreCode from './restore-password/send-restore-code/send-restore-code.component';
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";

import "./auth.styles.scss";


const AuthPage: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const authService: AuthService = injector.get(AUTH_SERVICE);

  return (
    <PageWrapper>
      <div className="auth-page">
        <h3 className="login-form__title">
          {t("auth.logInToYourAccount")}
        </h3>
        {authService.isOpenRestorePassword
          ? <SendRestoreCode/>
          : <LoginForm/>
        }
      </div>
    </PageWrapper>
  );
});

export default AuthPage;
