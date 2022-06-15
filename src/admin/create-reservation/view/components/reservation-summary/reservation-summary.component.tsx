import React, { FC, useEffect } from 'react';
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { ADD_NEW_RESERVATION_BY_ADMIN_SERVICE } from "@/common/injector/constants";
import { RentTypes } from "@/common/constants/rentTypes";
import { AdditionalRequests, AdditionalRequestValues } from "@/common/constants/additionalRequests";
import { NewReservationByAdminService } from "@/admin/create-reservation/domain/create-reservation.service";

import './reservation-summary.styles.scss';


const ReservationSummaryAdmin: FC = observer((): JSX.Element => {
  const newReservationServiceAdmin: NewReservationByAdminService = injector.get(ADD_NEW_RESERVATION_BY_ADMIN_SERVICE);

  useEffect(() => {
    if (newReservationServiceAdmin.dropOffWithPackage) {
      newReservationServiceAdmin.dropOff = newReservationServiceAdmin.dropOffWithPackage;
    }
    if (!newReservationServiceAdmin.pickUp || !newReservationServiceAdmin.dropOff || !newReservationServiceAdmin.selectedCarCategory) {
      return
    }
    newReservationServiceAdmin.getSummaryPrice();
  }, [newReservationServiceAdmin.selectedRentType,
    newReservationServiceAdmin.selectedPackage,
    newReservationServiceAdmin.selectedAdditionalRequests.length,
    newReservationServiceAdmin.selectedCarType,
    newReservationServiceAdmin.selectedCarCategory,
    newReservationServiceAdmin.pickUp,
    newReservationServiceAdmin.dropOff,
    newReservationServiceAdmin.area,
    newReservationServiceAdmin.place,
  ])

  return (
    <div className="reservation-summary">
      <p className="summary-title title">
        Reservation summary
      </p>
      <div className="full-day-title title">
        {newReservationServiceAdmin.selectedRentType === RentTypes.HOURLY_PARTIAL ? 'Hourly rate' : 'Full day'}
      </div>
      <div className="full-day-price event">
        {newReservationServiceAdmin.price ? `$${newReservationServiceAdmin.price?.fullDay}` : `$0`}
      </div>
      <div className="reservation-additional-request">
        {newReservationServiceAdmin.selectedAdditionalRequests.map((additionalRequest) => (
          <div className="reservation-additional-request__element">
            <div className="title">
              {AdditionalRequests[additionalRequest].title}
            </div>
            <span className="event">
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
          {newReservationServiceAdmin.price ? `$${newReservationServiceAdmin.price?.totalPrice}` : `$0`}
        </p>
      </div>
    </div>
  );
});

export default ReservationSummaryAdmin;
