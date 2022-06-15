import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthService } from "@/common/auth/domain/auth.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, AUTH_SERVICE } from "@/common/injector/constants";
import { LOGIN_PAGE } from "@/common/constants/routes";
import { confirmPassword, password } from "@/ui-kit/helpers/validators";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { Button } from "@/ui-kit/components/button/button.component";
import { AppService } from "@/common/app/domain/app.service";

import "./restore-password.styles.scss";


interface RestorePasswordValues {
  token: string;
  password: string;
  rePassword: string;
}

const RestorePassword: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const token = new URLSearchParams(window.location.search).get("token")!;

  const validationSchema = yup.object().shape({
    password: password(t),
    rePassword: confirmPassword(t, "password"),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RestorePasswordValues>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="restore-password-form">
      <h3 className="restore-password-form__title">
        {t("client.restorePassword")}
      </h3>
      <form
        onSubmit={handleSubmit((values: RestorePasswordValues) =>
          authService.restorePasswordActivation({ ...values, token }, LOGIN_PAGE)
        )}
      >
        <FormsTextInput
          name="password"
          control={control}
          label={t("client.newPassword")}
          placeholder={t("client.newPassword")}
          error={errors.password?.message}
          type="password"
        />
        <FormsTextInput
          name="rePassword"
          control={control}
          label={t("client.repeatPassword")}
          placeholder={t("client.repeatPassword")}
          error={errors.rePassword?.message}
          type="password"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          color="primary"
          style={{ marginTop: 10 }}
        >
          {t("client.confirm")}
        </Button>
      </form>
    </div>
  );
};

export default RestorePassword;
