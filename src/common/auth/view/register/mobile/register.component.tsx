import React, { Dispatch, FC, SetStateAction, useCallback } from "react";
import { observer } from "mobx-react";
import { Button } from "@/ui-kit/components/button/button.component";
import { useTranslation } from "react-i18next";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { PersonalDetailsValues } from "@/common/auth/view/register/register.component";
import Tab from "@/ui-kit/components/tabs/tab/tab.component";
import SecondStep from "@/common/auth/view/register/mobile/steps/second/second-step.component";
import ThirdStep from "@/common/auth/view/register/mobile/steps/third/third-step.component";
import FourthStep from "@/common/auth/view/register/mobile/steps/fourth/fourth-step.component";
import FifthStep from "@/common/auth/view/register/mobile/steps/fifth/fifth-step.component";
import { AuthService } from "@/common/auth/domain/auth.service";
import { injector } from "@/common/injector/Injector";
import { AUTH_SERVICE } from "@/common/injector/constants";
import RegisterTabs from "@/common/auth/view/register/mobile/tabs/register-tabs.component";
import arrowBack from "@/ui-kit/icons/arrow-back.svg";

import "./register.styles.scss";


interface RegisterMobileProps {
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<any>;
  control: Control<any>;
  onSubmitHandler: (values: PersonalDetailsValues) => void;
  errors: FieldErrors;
  notificationType: string | undefined;
  newDriverLicenceImages: Array<File | string>;
  setNewDriverLicenceImages: Dispatch<SetStateAction<Array<File | string>>>;
  newNotificationType: (value: string | undefined) => void;
  backgroundDriverLicenceHandler: (acceptedFiles: Array<File>) => void;
  removeDriverLicencesHandler: () => void;
}

const RegisterMobile: FC<RegisterMobileProps> = observer((
  {
    isSubmitting,
    handleSubmit,
    onSubmitHandler,
    errors,
    control,
    notificationType,
    newNotificationType,
    backgroundDriverLicenceHandler,
    newDriverLicenceImages,
    removeDriverLicencesHandler,
  }
): JSX.Element => {
  const { t } = useTranslation();
  const authService: AuthService = injector.get(AUTH_SERVICE);

  const onPrevSelectedTab = useCallback(() => {
    if (authService.openedMobileTab === 0) return;
    authService.openedMobileTab = authService.openedMobileTab - 1;
  }, [authService])

  const onNextSelectedTab = useCallback(() => {
    if (authService.openedMobileTab >= 3) return;
    authService.openedMobileTab = authService.openedMobileTab + 1;
  }, [authService])

  return (
    <PageWrapper
      title="Sign Up"
      withBacklinkButton
      backLinkText={"Sign Up"}
      buttons={
        <div className="register-form__footer" style={{ gap: 10 }}>
          {authService.openedMobileTab > 0 && (
            <Button
              disabled={isSubmitting}
              color="primary"
              className="register-form__footer__prev"
              onClick={onPrevSelectedTab}
            >
              <img src={arrowBack} alt="Arrow back"/>
            </Button>
          )}

          {authService.openedMobileTab < 3 && (
            <Button
              disabled={isSubmitting}
              color="primary"
              className="register-form__footer__next"
              onClick={onNextSelectedTab}
            >
              {t("client.next")}
            </Button>
          )}

          {authService.openedMobileTab === 3 && (
            <Button
              type="submit"
              disabled={isSubmitting}
              color="primary"
              className="register-form__footer__next"
              onClick={handleSubmit((values: PersonalDetailsValues) => onSubmitHandler(values))}
            >
              {t("client.finish")}
            </Button>
          )}
        </div>
      }>
      <div className="register-form-mobile">
        <RegisterTabs>
          <Tab title="1">
            <SecondStep
              control={control}
              errors={errors}
            />
          </Tab>
          <Tab title="2">
            <ThirdStep
              control={control}
              errors={errors}
              notificationType={notificationType}
              newNotificationType={newNotificationType}
            />
          </Tab>
          <Tab title="3">
            <FourthStep
              control={control}
              errors={errors}
              removeDriverLicencesHandler={removeDriverLicencesHandler}
              backgroundDriverLicenceHandler={backgroundDriverLicenceHandler}
              newDriverLicenceImages={newDriverLicenceImages}
            />
          </Tab>
          <Tab title="4">
            <FifthStep
              control={control}
              errors={errors}
            />
          </Tab>
        </RegisterTabs>
      </div>
    </PageWrapper>
  );
});

export default RegisterMobile;
