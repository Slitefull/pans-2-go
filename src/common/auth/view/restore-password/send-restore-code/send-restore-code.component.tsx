import React, { FC, useCallback } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { Button } from "@/ui-kit/components/button/button.component";
import { AuthService } from "@/common/auth/domain/auth.service";
import { injector } from "@/common/injector/Injector";
import { email } from "@/ui-kit/helpers/validators";
import { APP_SERVICE, AUTH_SERVICE } from "@/common/injector/constants";
import { AppService } from "@/common/app/domain/app.service";

import "./send-restore-code.styles.scss";


interface SendRestoreCodeValues {
  email: string;
  type: string;
}

const SendRestoreCode: FC = observer((): JSX.Element => {
    const { t } = useTranslation();

    const authService: AuthService = injector.get(AUTH_SERVICE);
    const appService: AppService = injector.get(APP_SERVICE);
    const role: string = appService.currentApp;

    const validationSchema = yup.object().shape({
      email: email(t, true),
    });

    const {
      control,
      handleSubmit,
      formState: { isSubmitting, errors },
    } = useForm<SendRestoreCodeValues>({
      // @ts-ignore
      resolver: yupResolver(validationSchema),
    });

    const onBackToLoginHandler = useCallback(() => {
      authService.isOpenRestorePassword = false;
    }, [authService])

    return (
      <div className="restore-password">
        <p className="restore-password__text">
          {t("auth.pleaseEnterYourEmailThatYouUsedWhenRegistering")}
        </p>
        <form className="restore-password-form">
          <FormsTextInput
            name="email"
            control={control}
            placeholder={t("client.email")}
            error={errors.email?.message}
            type="email"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            color="primary"
            style={{ width: "100%", margin: '30px 0 0' }}
            onClick={handleSubmit((values: SendRestoreCodeValues) =>
              authService.sendRestoreCode({ ...values, type: role })
            )}
          >
            {t("client.submit")}
          </Button>

          <div className="restore-password-form__footer">
            <p className="text">
              <span
                className="back-login"
                onClick={onBackToLoginHandler}
              >
                {t("auth.backToLogIn")}
              </span>
            </p>
          </div>
        </form>
      </div>
    );
  }
);

export default SendRestoreCode;
