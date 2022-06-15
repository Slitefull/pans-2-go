import React, {FC, useEffect} from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { Button } from "@/ui-kit/components/button/button.component";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { injector } from "@/common/injector/Injector";
import {confirmPassword, confirmRePassword, password} from "@/ui-kit/helpers/validators";
import { AppService } from "@/common/app/domain/app.service";
import { APP_SERVICE, AUTH_SERVICE, SESSION_USER_SERVICE, } from "@/common/injector/constants";
import { AuthService } from "@/common/auth/domain/auth.service";

import "./change-password.styles.scss";


interface ChangePasswordValues {
  oldPassword: string;
  password: string;
  rePassword: string;
}

const ChangePasswordForm: FC = observer((): JSX.Element => {
  const { t } = useTranslation();

  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const appService: AppService = injector.get(APP_SERVICE);

  const validationSchema = yup.object().shape({
    oldPassword: password(t),
    password: confirmPassword(t, "rePassword"),
    rePassword: confirmRePassword(t, "password"),
  });

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ChangePasswordValues>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
     reset({
         oldPassword: watch('oldPassword'),
         password: watch('password'),
         rePassword: watch('rePassword'),
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('password'), watch('rePassword')]);

  return (
    <div className="change-password-form">
      <h3 className="title">
        {t("admin.password")}
      </h3>
      <form
        onSubmit={handleSubmit((values: ChangePasswordValues) =>
          authService.resetPassword({
            ...values,
            userId: sessionUserService.id,
            type: appService.currentApp,
          })
        )}
      >
        <div className="change-password-container">
          <FormsTextInput
            name="oldPassword"
            control={control}
            className="old-password"
            placeholder={t("client.oldPassword")}
            error={errors.oldPassword?.message}
            type="password"
          />
          <FormsTextInput
            name="password"
            control={control}
            className="new-password"
            placeholder={t("client.newPassword")}
            error={errors.password?.message}
            type="password"
          />
          <FormsTextInput
            name="rePassword"
            control={control}
            className="confirm-new-password"
            placeholder={t("client.confirmNewPassword")}
            error={errors.rePassword?.message}
            type="password"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          color="primary"
        >
          {t("auth.updatePassword")}
        </Button>
      </form>
    </div>
  );
});

export default ChangePasswordForm;
