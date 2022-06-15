import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import DatePicker from "react-datepicker";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, RESERVATION_SERVICE } from "@/common/injector/constants";
import { Button } from "@/ui-kit/components/button/button.component";
import ModalFullScreen from "@/ui-kit/components/modal/modal-full-screen.component";
import ArrowBackIcon from "@/ui-kit/customized-icons/arrow/arrow-back.component";
import { MY_RESERVATIONS_PAGE } from "@/common/constants/routes";
import { AppService } from "@/common/app/domain/app.service";

import './change-date.styles.scss';


interface ChangeDateMobileProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  reservationId: string;
  pickUp: Date | string;
  dropOff: Date | string;
  reservationNumber: number;
}

const ChangeDateMobile: FC<ChangeDateMobileProps> = (
  {
    isOpen,
    setIsOpen,
    reservationId,
    pickUp,
    dropOff,
    reservationNumber,
  }
): JSX.Element => {
  const appService: AppService = injector.get(APP_SERVICE);
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const [updatedDropOffDate, setUpdatedDropOffDate] = useState<Date | null>(null);

  const onSetUpdatedDropOffDate = useCallback((date: Date) => {
    setUpdatedDropOffDate(date)
  }, []);

  const onBackLinkHandler = useCallback(() => {
    setIsOpen(false);
    appService.redirectTo(MY_RESERVATIONS_PAGE);
  }, []);

  const onCloseModalHandler = useCallback(() => {
    setIsOpen(false);
  }, [])

  const onChangeReservationDateHandler = useCallback(() => {
    reservationService.updateReservationDates(
      reservationId,
      pickUp,
      updatedDropOffDate || dropOff,
      reservationNumber,
    )
    setIsOpen(false);
  }, [updatedDropOffDate, reservationId])

  return (
    <ModalFullScreen
      isOpen={isOpen}
      classPrefix="change-date-mobile"
      header={
        <div className="link-arrow" onClick={onBackLinkHandler}>
          <ArrowBackIcon color="#000000" size={20}/>
          <p className="link-arrow__text">
            Edit reservation time
          </p>
        </div>
      }
      body={
        <>
          <p className="datepicker-text">Change Drop-off time</p>
          <div className="datepicker-wrapper">
            <DatePicker
              selected={updatedDropOffDate || new Date(dropOff)}
              onChange={(date) => onSetUpdatedDropOffDate(date!)}
              className="datepicker"
              timeIntervals={15}
              showTimeSelect
              dateFormat="MMM, d yyyy h:mm aa"
            />
          </div>
        </>
      }
      footer={
        <div className="change-date-wrapper">
          <Button
            type="button"
            color="secondary"
            onClick={onCloseModalHandler}
            style={{ margin: "0 10px 0 0" }}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={onChangeReservationDateHandler}
          >
            CONFIRM
          </Button>
        </div>
      }
    />
  )
};

export default ChangeDateMobile;
