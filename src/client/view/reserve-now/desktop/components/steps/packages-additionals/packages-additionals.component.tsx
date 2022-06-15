import React, { FC, useCallback, useEffect } from 'react';
import { observer } from "mobx-react";
import ReserveNowPageLayout from "@/client/view/reserve-now/components/page-layout/page-layout.component";
import ReservationPackage from "@/client/view/reserve-now/components/package/package.components";
import DatePicker from "react-datepicker";
import ReservationAdditionalRequest
  from "@/client/view/reserve-now/components/additional-request/additional-request.component";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { RentTypes } from "@/common/constants/rentTypes";
import { reservationAdditionalRequests } from '@/client/view/reserve-now/constants';
import { AdditionalRequestValues } from "@/common/constants/additionalRequests";
import { arrayRemove } from "@/common/helpers/arrayRemove.helper";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";
import { HourlyPackage } from "@/common/reservation/api/reservation.repo";

import './packages-additionals.styles.scss';


const PackagesAdditionalStep: FC = observer((): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const getFilteredPackages = (): Array<HourlyPackage> => {
    if (reservationService.area !== AllowedAreasValues.Brooklyn) {
      return reservationService.packages!.filter((el) => el.hours !== 1.5);
    }
    return reservationService.packages!;
  }

  const onCheckHandler = useCallback((additionalRequest: AdditionalRequestValues) => {
    if (reservationService.additionalRequestsForNewReservation.includes(additionalRequest)) {
      reservationService.additionalRequestsForNewReservation = arrayRemove(reservationService.additionalRequestsForNewReservation, additionalRequest)
    } else {
      reservationService.additionalRequestsForNewReservation.push(additionalRequest);
    }
  }, [reservationService])

  const onSetDropOffHandler = useCallback((date: Date) => {
    reservationService.dropOff = date;
    reservationService.isTouchedDate = true;
  }, [reservationService])

  const onClearPackageHandler = useCallback(() => {
    reservationService.package = null;
    reservationService.dropOff = null;
    reservationService.dropOffWithPackage = null;
  }, [reservationService])

  const onClearTimeHandler = useCallback(() => {
    reservationService.dropOff = null;
    reservationService.dropOffWithPackage = null;
    reservationService.isTouchedDate = false
  }, [reservationService])

  const getIsDisabledNextStep = () => {
    if (reservationService.dropOff) return false;
    return !reservationService.dropOffWithPackage;
  }

  useEffect(() => {
    return () => {
      if (reservationService.dropOffWithPackage) {
        reservationService.dropOff = reservationService.dropOffWithPackage
      }
    }
  }, [])

  return (
    <ReserveNowPageLayout
      title={reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL
        ? 'Packages & additionals'
        : 'Need longer? Select here!'
      }
      isDisabledNextButton={getIsDisabledNextStep()}
    >
      <div className="fifth-step">
        {reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL && (
          <>
            <div className="packages">
              {getFilteredPackages().map(
                (reservationPackage) => (
                  <ReservationPackage
                    hours={reservationPackage.hours}
                    price={reservationPackage.price}
                    isSelected={reservationService.package === reservationPackage.hours}
                    isDisabled={reservationService.package === reservationPackage.hours}
                  />
                ))}
            </div>
            {reservationService.package && (
              <p
                className="clear-button"
                onClick={onClearPackageHandler}
              >
                Clear
              </p>
            )}
          </>
        )}
        <div className="drop-off">
          {reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL && (
            <p className="step-title">
              Need longer? Select here
            </p>
          )}

          <div className="reservation-datepicker-desktop__wrapper">
            <DatePicker
              selected={reservationService.dropOffWithPackage ? reservationService.dropOffWithPackage : reservationService.dropOff}
              className={`reservation-datepicker-desktop ${!!reservationService.package ? 'disabled' : ''}`}
              onChange={(date) => onSetDropOffHandler(date!)}
              timeIntervals={15}
              showTimeSelect
              disabled={!!reservationService.package}
              placeholderText="Select package or time"
              dateFormat="MMM, d yyyy h:mm aa"
            />
          </div>

          {reservationService.isTouchedDate && (
            <p
              className="clear-button"
              style={{ marginTop: 10 }}
              onClick={onClearTimeHandler}
            >
              Clear
            </p>
          )}
        </div>

        <div className="additional-requests">
          <p className="step-title">
            Do you need additional requests?
          </p>

          {reservationAdditionalRequests(reservationService).map((request) => (
            <ReservationAdditionalRequest
              title={request.title}
              price={request.price}
              isChecked={request.isChecked}
              onCheckHandler={() => onCheckHandler(request.value)}
            />
          ))}
        </div>
      </div>
    </ReserveNowPageLayout>
  );
});

export default PackagesAdditionalStep;
