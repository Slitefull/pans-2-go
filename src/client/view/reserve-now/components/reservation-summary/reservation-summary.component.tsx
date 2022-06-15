import React, { FC, useCallback, useEffect } from 'react';
import { observer } from "mobx-react";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { injector } from "@/common/injector/Injector";
import { NOTIFICATION_SERVICE, RESERVATION_SERVICE } from "@/common/injector/constants";
import { RentTypes } from "@/common/constants/rentTypes";
import { AdditionalRequests, AdditionalRequestValues } from "@/common/constants/additionalRequests";
import moment from "moment";

import './reservation-summary.styles.scss';


const ReservationSummary: FC = observer((): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);
  const notificationService: NotificationService = injector.get(NOTIFICATION_SERVICE);

  const getStep = (selectedStep: number): number => {
    if (reservationService.rentTypePick === RentTypes.DAILY_WEEKLY) return selectedStep - 1;
    return selectedStep;
  }

  const onClickEventHandler = useCallback((step: number) => {
    reservationService.currentStep = step;
  }, [reservationService])

  const getStepForDailyWeekly = useCallback(() => {
    if (reservationService.rentTypePick === RentTypes.DAILY_WEEKLY) {
      reservationService.currentStep = 2;
      return;
    }
    reservationService.currentStep = 4;
  }, [reservationService])

  const getAdditionalRequestTitle = (request: AdditionalRequestValues): string => AdditionalRequests[request].title;

  useEffect(() => {
    if (reservationService.carType) {
      reservationService.getSummaryPrice()
    } else {
      notificationService.notify({
        message: "Choose the car type, please!",
        status: "error",
      })
    }
  }, [])

  return (
    <div className="reservation-summary">
      <div className="vehicle title">
        Vehicle
      </div>
      <div className="vehicle-type text">
        {reservationService.carTypeTitle}
      </div>
      <div
        className="vehicle-price event"
        onClick={() => onClickEventHandler(1)}
      >
        {reservationService.carType &&
          `$${reservationService.carTypePrice}/${reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL
            ? 'h'
            : 'd'
          }`
        }
      </div>
      <div className="pick-up-title title">
        Pick-up time
      </div>
      <div
        className="pick-up-time event"
        onClick={() => onClickEventHandler(getStep(3))}
      >
        {moment(reservationService.pickUp).format('MMMM Do YYYY, h:mma')}
      </div>
      <div className="drop-off-title title">
        Drop-off time
      </div>
      <div
        className="drop-off-time event"
        onClick={getStepForDailyWeekly}
      >
        {moment(reservationService.dropOff).format('MMMM Do YYYY, h:mma')}
      </div>
      <div className="full-day-title title">
        {reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL ? 'Hourly rate' : 'Full day'}
      </div>
      <div
        className="full-day-price event"
        onClick={getStepForDailyWeekly}
      >
        {`$${reservationService.totalPrice.fullDay}`}
      </div>
      <div className="reservation-additional-request">
        {reservationService.additionalRequestsForNewReservation.map((additionalRequest) => (
          <div className="reservation-additional-request__element">
            <div className="title">
              {getAdditionalRequestTitle(additionalRequest)}
            </div>
            <span
              className="event"
              onClick={() => onClickEventHandler(getStep(4))}
            >
              {additionalRequest === AdditionalRequestValues.ADDITIONAL_DRIVER ? "5$" : "10$"}
            </span>
          </div>
        ))}
      </div>
      <div className="total">
        <p className="total__title">
          Total
        </p>
        <p className="total__price">
          {`$${reservationService.totalPrice.totalPrice}`}
        </p>
      </div>
    </div>
  );
});

export default ReservationSummary;
