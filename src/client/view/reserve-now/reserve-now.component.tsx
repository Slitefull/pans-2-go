import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { isMobile } from 'react-device-detect';
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import ReserveNowDesktop from "@/client/view/reserve-now/desktop/reserve-now.component";
import ReserveNowMobile from "@/client/view/reserve-now/mobile/reserve-now.component";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, CARS_SERVICE, NOTIFICATION_SERVICE, SESSION_USER_SERVICE } from "@/common/injector/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { limitedString, onlyNumbers } from "@/ui-kit/helpers/validators";
import { PersonalDetailsValues } from "@/common/auth/view/register/register.component";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { AppService } from "@/common/app/domain/app.service";
import { PROFILE_PAGE } from "@/common/constants/routes";
import * as yup from "yup";


const ReserveNow: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const carsService: CarsService = injector.get(CARS_SERVICE);
  const appService: AppService = injector.get(APP_SERVICE);
  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);
  const notificationService: NotificationService = injector.get(NOTIFICATION_SERVICE);

  const validationSchema = yup.object().shape({
    cardholderName: limitedString(t, { maxLength: 30 }, false),
    billingZipCode: onlyNumbers(t, { maxLength: 5 }, false),
  });

  const {
    control,
    formState: { errors },
  } = useForm<PersonalDetailsValues>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (sessionUserService.id && !sessionUserService.payment.cardNumbers) {
      notificationService.notify({
        message: "Fill your payment details!",
        status: "error",
      })
      appService.redirectTo(PROFILE_PAGE);
      return;
    }
    if (!carsService.carCategories.length) {
      carsService.getAllCategories()
    }
  }, [])

  return (
    <PageWrapper title="Reserve car" withClientHeader>
      {
        isMobile
          ? <ReserveNowMobile
            control={control}
            errors={errors}
          />
          : <ReserveNowDesktop
            control={control}
            errors={errors}
          />
      }
    </PageWrapper>
  );
});

export default ReserveNow;
