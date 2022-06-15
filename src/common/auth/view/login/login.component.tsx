import React, { FC, useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { History } from "history";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { Button } from "@/ui-kit/components/button/button.component";
import { email, password } from "@/ui-kit/helpers/validators";
import { injector } from "@/common/injector/Injector";
import { AuthService } from "@/common/auth/domain/auth.service";
import { REGISTRATION_PAGE, ROOT_PAGE } from "@/common/constants/routes";
import { APP_SERVICE, AUTH_SERVICE, HISTORY } from "@/common/injector/constants";
import { AppService } from "@/common/app/domain/app.service";
import { Checkbox } from "@/ui-kit/components/checkbox/checkbox.component";
import { UserRoles } from "@/common/constants/roles";

import "./login.styles.scss";


interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: FC = observer((): JSX.Element => {
  const { t } = useTranslation();

  const history: History = injector.get(HISTORY);
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const appService: AppService = injector.get(APP_SERVICE);

  const currentApp = appService.currentApp;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    email: email(t, true),
    password: password(t),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSignUpHandler = useCallback(() => {
    history.push(REGISTRATION_PAGE);
  }, [history])

  const onForgotPasswordHandler = useCallback(() => {
    authService.isOpenRestorePassword = true;
  }, [authService])

  return (
    <div className="login-form">
      <form
        onSubmit={handleSubmit((values: LoginValues) =>
          authService.login({ ...values, role: currentApp }, ROOT_PAGE)
        )}
      >
        <div className="login-form__body">
          <FormsTextInput
            name="email"
            useWrapper
            wrapperPrefix="login-form__body__element"
            control={control}
            placeholder={t("admin.email")}
            error={errors.email?.message}
            type="email"
          />
          <FormsTextInput
            name="password"
            useWrapper
            wrapperPrefix="login-form__body__element"
            control={control}
            placeholder={t("admin.password")}
            error={errors.password?.message}
            type="password"
          />
          <div className="additional">
            <div className="remember-me">
              <Checkbox
                label={t("auth.rememberMe")}
                isChecked={isChecked}
                setIsChecked={() => setIsChecked(!isChecked)}
              />
            </div>
            <span
              className="forgot-password"
              onClick={onForgotPasswordHandler}
            >
                {t("auth.forgotPassword")}
              </span>
          </div>
        </div>
        <Button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
          color="primary"
        >
          {t("auth.logIn").toUpperCase()}
        </Button>
      </form>
      {appService.currentApp === UserRoles.user && (
        <div className="login-form__footer">
          <p className="text">
            {t("auth.dontHaveAnAccount")}? <span
            onClick={onSignUpHandler}
            className="sign-up"
          >
                {t("auth.signUp")}
              </span>
          </p>
        </div>
      )}
    </div>
  );
});

export default LoginForm;
