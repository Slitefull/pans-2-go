import React, { FC, useCallback, useEffect } from 'react';
import { observer } from "mobx-react";
import ReserveNowPageLayout from "@/client/view/reserve-now/components/page-layout/page-layout.component";
import DatePicker from "react-datepicker";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { RentTypes } from "@/common/constants/rentTypes";
import { reservationAdditionalRequests } from "@/client/view/reserve-now/constants";
import ReservationAdditionalRequest
  from "@/client/view/reserve-now/components/additional-request/additional-request.component";
import { AdditionalRequestValues } from "@/common/constants/additionalRequests";
import { arrayRemove } from "@/common/helpers/arrayRemove.helper";

import './time.styles.scss';


const TimeStep: FC = observer((): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const onSetStartDateHandler = useCallback((date: Date) => {
    reservationService.pickUp = date;
  }, [reservationService])

  const onSetDropOffHandler = useCallback((date: Date) => {
    reservationService.dropOff = date;
  }, [reservationService])

  const onCheckHandler = useCallback((additionalRequest: AdditionalRequestValues) => {
    if (reservationService.additionalRequestsForNewReservation.includes(additionalRequest)) {
      reservationService.additionalRequestsForNewReservation = arrayRemove(reservationService.additionalRequestsForNewReservation, additionalRequest)
    } else {
      reservationService.additionalRequestsForNewReservation.push(additionalRequest);
    }
  }, [reservationService])

  useEffect(() => {
    if (!reservationService.pickUp) {
      reservationService.pickUp = new Date();
    }
    if (!reservationService.dropOff && reservationService.rentTypePick === RentTypes.DAILY_WEEKLY) {
      reservationService.dropOff = new Date();
    }
  }, [])

  return (
    <ReserveNowPageLayout title={reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL
      ? "What’s a pick-up time?"
      : "What’s a pick-up/drop-off time?"
    }>
      <div className="time-step">
        <div className="reservation-datepicker__wrapper">
          <DatePicker
            selected={reservationService.pickUp}
            className="reservation-datepicker"
            onChange={(date) => onSetStartDateHandler(date!)}
            timeIntervals={15}
            showTimeSelect
            dateFormat="MMM, d yyyy h:mm aa"
          />
        </div>

        {reservationService.rentTypePick === RentTypes.DAILY_WEEKLY && (
          <>
            <div className="drop-off">
              <div className="reservation-datepicker__wrapper">
                <DatePicker
                  selected={reservationService.dropOff}
                  className='reservation-datepicker'
                  onChange={(date) => onSetDropOffHandler(date!)}
                  timeIntervals={15}
                  showTimeSelect
                  dateFormat="MMM, d yyyy h:mm aa"
                />
              </div>
            </div>

            <div className="additional-requests">
              <p className="step-title">
                Do you need an additional requests?
              </p>

              {reservationAdditionalRequests(reservationService).map((request) => (
                <ReservationAdditionalRequest
                  title={request.title}
                  price={request.price}
                  isChecked={request.isChecked}
                  onCheckHandler={() => onCheckHandler(request.value)}
                />))}
            </div>
          </>
        )}
      </div>
    </ReserveNowPageLayout>
  );
});

export default TimeStep;
