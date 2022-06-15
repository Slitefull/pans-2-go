import React, { FC, ReactNode, useCallback } from 'react';
import ReservationArrowIcon from "@/ui-kit/customized-icons/reservation-arrow/arrow.component";
import { observer } from "mobx-react";
import { Button } from "@/ui-kit/components/button/button.component";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import {RESERVATION_SERVICE, SESSION_USER_SERVICE} from "@/common/injector/constants";
import { RentTypes } from "@/common/constants/rentTypes";

import './page-layout.styles.scss';
import {SessionUserService} from "@/common/session-user/domain/session-user.service";


interface ReserveNowPageLayoutProps {
  children: ReactNode;
  title: string;
  isDisabledNextButton?: boolean;
}

const ReserveNowPageLayout: FC<ReserveNowPageLayoutProps> = observer((
  {
    children,
    title,
    isDisabledNextButton,
  }
): JSX.Element => {
  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const onPrevStepHandler = useCallback(() => {
    reservationService.currentStep = reservationService.currentStep - 1;
  }, [reservationService])

  const onNextStepHandler = useCallback(() => {
    if (reservationService.currentStep === 5) return;
    reservationService.currentStep = reservationService.currentStep + 1;
  }, [reservationService])

  const onFinishHandler = useCallback(() => {
    reservationService.createReservation(sessionUserService.notificationType);
  }, [reservationService])

  const getIsFinalStep = (currentStep: number) => {
    if (reservationService.rentTypePick === RentTypes.DAILY_WEEKLY && currentStep === 3) return true;
    return reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL && currentStep === 5;
  }

  return (
    <div className="reserve-now-page-layout">
      <div className="layout-header">
        <p className="layout-header__title">
          {title}
        </p>
        <div className="layout-header__buttons">
          {reservationService.currentStep !== 0 &&
            <Button
              onClick={onPrevStepHandler}
              className="prev-button"
              color="secondary"
            >
              <ReservationArrowIcon size={15} color={"#FFFFFF"}/>
            </Button>
          }
          {getIsFinalStep(reservationService.currentStep)
            ? <Button
              onClick={onFinishHandler}
              disabled={reservationService.isDisabledFinishButton}
              className="next-button"
            >
              FINISH RESERVATION
            </Button>
            : <Button
              onClick={onNextStepHandler}
              disabled={isDisabledNextButton}
              className="next-button"
            >
              NEXT
            </Button>
          }
        </div>
      </div>
      {children}
    </div>
  );
});

export default ReserveNowPageLayout;
