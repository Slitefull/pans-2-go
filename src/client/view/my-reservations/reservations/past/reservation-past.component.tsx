import React, { FC, useCallback, useEffect, useState } from 'react';
import moment from "moment";
import getPaymentStatusBackgroundColor from "@/common/helpers/getPaymentStatusBackgroundColor.helper";
import { isMobile } from 'react-device-detect';
import { MyReservation } from "@/common/my-reservations/api/my-reservations.repo";
import { injector } from "@/common/injector/Injector";
import { DRONE_MOBILE_REPOSITORY, LOCK_CAR_SERVICE } from "@/common/injector/constants";
import { DroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo";
import RoundLoader from "@/ui-kit/components/loaders/round/round-loader.component";
import { CarStatusesTypes } from "@/common/constants/carStatuses";
import { Button } from "@/ui-kit/components/button/button.component";
import { LockCarService } from "@/common/lock-car/domain/lock-car.service";
import { observer } from "mobx-react";

import "./reservation-past.styles.scss";


interface ReservationPastProps {
  selectedReservation: MyReservation;
}

const ReservationPast: FC<ReservationPastProps> = observer(({ selectedReservation }): JSX.Element => {
  const droneMobileRepo: DroneMobileRepository = injector.get(DRONE_MOBILE_REPOSITORY);
  const lockCarService: LockCarService = injector.get(LOCK_CAR_SERVICE);

  const [carImage, setCarImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

  const onLockCarHandler = useCallback(() => {
    lockCarService.lockCar({
      carId: selectedReservation.car.id,
      deviceKey: selectedReservation.car.deviceKey,
      reservationType: "past",
    })
  }, [])

  const onUnlockCarHandler = useCallback(() => {
    lockCarService.unlockCar({
      carId: selectedReservation.car.id,
      deviceKey: selectedReservation.car.deviceKey,
      reservationType: "past",
    })
  }, [])

  useEffect(() => {
    droneMobileRepo.getVehicle(selectedReservation.car.deviceKey).then((response) => {
      setCarImage(response.image)
      setIsLoadingImage(false);
    })
  }, [])

  return (
    <div className="reservation-past">
      <div className="left-part">
        {isLoadingImage
          ? <RoundLoader inContainer={true}/>
          : carImage
            ? <img src={carImage} className="reservation-past__image" alt="Car"/>
            : null
        }
        <div className="reservation-past__text">
          {selectedReservation.car.title &&
            <p className="title">{selectedReservation.car.title}</p>
          }

          {!isMobile && <p className="plate-number">
            {selectedReservation.car.plateNumber}
          </p>}

          {!isMobile && <div
            className="reservation-past__status"
            style={{ backgroundColor: getPaymentStatusBackgroundColor(selectedReservation.paymentStatus) }}
          >
            {selectedReservation.paymentStatus}
          </div>}
        </div>
      </div>
      <div className="right-part">
        <div className="reservation-past__text">
          {isMobile && <p className="plate-number">
            {selectedReservation.car.plateNumber}
          </p>}

          <p className="time">
            {`${moment(selectedReservation.pickupDateTime).format('MM/DD, h:mm a')} 
            -
             ${moment(selectedReservation.dropOffDateTime).format('MM/DD, h:mm a')}`}
          </p>

          <p className="total-hours">
            {Math.round(moment.duration(moment(selectedReservation.dropOffDateTime).diff(moment(selectedReservation.pickupDateTime))).asHours()) + ' hours'}
          </p>

          {!isMobile && <p className="price">
            ${selectedReservation.totalPrice}
          </p>}

          {!isMobile && selectedReservation.car.isAvailableToUnlock && (
            <Button
              color="primary"
              className="lock-unlock-button"
              disabled={lockCarService.isLoadingLockUnlock}
              onClick={(selectedReservation.car.status === CarStatusesTypes.Active || selectedReservation.car.status === CarStatusesTypes.Unlocked)
                ? onLockCarHandler
                : onUnlockCarHandler
              }
            >
              LOCK/UNLOCK
            </Button>
          )}
        </div>
      </div>
      {isMobile && <div className="mobile">${selectedReservation.totalPrice}
        <div
          className="mobile__status"
          style={{ backgroundColor: getPaymentStatusBackgroundColor(selectedReservation.paymentStatus) }}
        >
          {selectedReservation.paymentStatus}
        </div>
      </div>}
      {isMobile && selectedReservation.car.isAvailableToUnlock && (
        <Button
          color="primary"
          className="lock-unlock-button"
          disabled={lockCarService.isLoadingLockUnlock}
          onClick={(selectedReservation.car.status === CarStatusesTypes.Active || selectedReservation.car.status === CarStatusesTypes.Unlocked)
            ? onLockCarHandler
            : onUnlockCarHandler
          }
        >
          LOCK/UNLOCK
        </Button>
      )}
    </div>
  );
});

export default ReservationPast;
