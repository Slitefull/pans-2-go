import React, { FC, useCallback, useEffect, useState } from 'react';
import moment from "moment";
import { observer } from "mobx-react";
import { IconSvg } from "@/ui-kit/components/icon-svg/icon-svg.component";
import { Button } from '@/ui-kit/components/button/button.component';
import { History } from "history";
import { LockCarService } from "@/common/lock-car/domain/lock-car.service";
import { injector } from "@/common/injector/Injector";
import { DRONE_MOBILE_REPOSITORY, HISTORY, LOCK_CAR_SERVICE, RESERVATION_SERVICE } from "@/common/injector/constants";
import { LOCK_CAR_PAGE, UNLOCK_CAR_PAGE } from "@/common/constants/routes";
import { useTranslation } from "react-i18next";
import { MyReservation } from "@/common/my-reservations/api/my-reservations.repo";
import { DroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import RoundLoader from "@/ui-kit/components/loaders/round/round-loader.component";
import CustomModal from "@/ui-kit/components/modal/custom-modal.component";
import DatePicker from "react-datepicker";
import { isMobile } from "react-device-detect";
import { CarStatusesTypes } from "@/common/constants/carStatuses";
import ChangeDateMobile from "@/client/view/my-reservations/change-date-mobile/change-date.component";

import "./reservation-upcoming.styles.scss";


interface ReservationUpcomingProps {
  selectedReservation: MyReservation;
}

const ReservationUpcoming: FC<ReservationUpcomingProps> = observer((
  {
    selectedReservation
  }
): JSX.Element => {
  const { t } = useTranslation();
  const history: History = injector.get(HISTORY);
  const lockCarService: LockCarService = injector.get(LOCK_CAR_SERVICE);
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);
  const droneMobileRepo: DroneMobileRepository = injector.get(DRONE_MOBILE_REPOSITORY);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [carImage, setCarImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [dropOffTime, setDropOffTime] = useState<Date | null>(null);
  const [address, setAddress] = useState<string>('');

  const onUnlockFirstTimeCarHandler = useCallback(() => {
    lockCarService.selectedReservation = selectedReservation;
    history.push(UNLOCK_CAR_PAGE);
  }, [lockCarService, history, selectedReservation]);

  const onFinishTripHandler = useCallback(() => {
    lockCarService.selectedReservation = selectedReservation;
    history.push(LOCK_CAR_PAGE);
  }, [lockCarService, history, selectedReservation]);

  const onLockCarHandler = useCallback(() => {
    lockCarService.lockCar({
      carId: selectedReservation.car.id,
      deviceKey: selectedReservation.car.deviceKey,
      reservationType: "upcoming",
    })
  }, [])

  const onUnlockCarHandler = useCallback(() => {
    lockCarService.unlockCar({
      carId: selectedReservation.car.id,
      deviceKey: selectedReservation.car.deviceKey,
      reservationType: "upcoming",
    })
  }, [])

  const onChangeReservationDateHandler = useCallback(() => {
    reservationService.updateReservationDates(
      selectedReservation.id,
      selectedReservation.pickupDateTime,
      dropOffTime || selectedReservation.dropOffDateTime,
      selectedReservation.number,
    )
    setIsOpenModal(false);
  }, [dropOffTime, selectedReservation])

  const onOpenModalHandler = useCallback(() => {
    setIsOpenModal(true);
  }, [])

  const onCloseModalHandler = useCallback(() => {
    setIsOpenModal(false);
  }, [])

  const onSetNewDropOffTimeHandler = useCallback((date: Date) => {
    setDropOffTime(date)
  }, [dropOffTime])

  const getAddress = (lat: number, long: number) => {
    fetch(`${process.env.REACT_APP_GOOGLE_MAP_GEOCODING_URL}?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
      .then(res => res.json())
      .then(address => setZIP(address))
      .catch(err => console.log(err));
  };

  const setZIP = (address: any) => {
    let city = address?.results[0]?.address_components[2]?.short_name;
    let state = address?.results[0]?.address_components[4]?.short_name;
    let postal = address?.results[0]?.address_components[0]?.short_name;

    console.log('Address:', `${city} ${state} ${postal}`);
    setAddress(`${city} ${state} ${postal}`);
  };

  useEffect(() => {
    if (selectedReservation.car.deviceKey) {
      setIsLoadingImage(true);
      droneMobileRepo.getVehicle(selectedReservation.car.deviceKey).then((response) => {
        getAddress(response.last_known_state.latitude, response.last_known_state.longitude);
        setCarImage(response.image)
        setIsLoadingImage(false);
      }).catch(() => {
        setIsLoadingImage(false);
      })
    }
  }, [])

  return (
    <div className="reservation-upcoming">
      <div
        className="upcoming-info"
        style={{
          display: (!carImage && !isLoadingImage)
            ? "block"
            : "grid"
        }}
      >
        <div className="car-info">
          <div className="upcoming-info__text">
            {selectedReservation.car.title &&
              <p className="title">
                {selectedReservation.car.title}
              </p>
            }
            {selectedReservation.car.plateNumber &&
              <p className="plate-number">
                {selectedReservation.car.plateNumber}
              </p>
            }
            {address &&
              <p className="address">
                <IconSvg name={"address"}/> {address}
              </p>
            }
          </div>
        </div>
        <div className="car-image">
          {isLoadingImage
            ? <RoundLoader inContainer={true}/>
            : carImage
              ? <img src={carImage} className="upcoming-info__image" alt="Car"/>
              : null
          }
        </div>
        <div className="reservation-time">
          <p className="time link" onClick={onOpenModalHandler}>
            {
              `${moment(selectedReservation.pickupDateTime).format('MM/DD, h:mm a')} 
              - 
              ${moment(selectedReservation.dropOffDateTime).format('MM/DD, h:mm a')}`
            }
          </p>
        </div>
      </div>
      {Object.keys(selectedReservation.car).length
        ? (
          (selectedReservation && !selectedReservation.car.isFirstUnlock)
            ? <Button
              color="primary"
              onClick={onUnlockFirstTimeCarHandler}
            >
              UNLOCK
            </Button>
            : <div className="reservations-buttons-wrapper">
              <Button
                color="primary"
                disabled={lockCarService.isLoadingLockUnlock}
                onClick={(selectedReservation.car.status === CarStatusesTypes.Active || selectedReservation.car.status === CarStatusesTypes.Unlocked)
                  ? onLockCarHandler
                  : onUnlockCarHandler
                }
              >
                LOCK/UNLOCK
              </Button>
              <Button
                color="primary"
                className="finish-trip-button"
                onClick={onFinishTripHandler}
              >
                FINISH TRIP
              </Button>
            </div>
        )
        : <Button
          color="secondary"
          disabled
        >
          {t("client.noCar")}
        </Button>
      }
      {isOpenModal ?
        isMobile ? (
            <ChangeDateMobile
              isOpen={isOpenModal}
              setIsOpen={setIsOpenModal}
              reservationId={selectedReservation.id}
              reservationNumber={selectedReservation.number}
              pickUp={selectedReservation.pickupDateTime}
              dropOff={selectedReservation.dropOffDateTime}
            />
          )
          : (
            <CustomModal
              isOpen={isOpenModal}
              body={
                <>
                  <p className="modal-title">
                    Change Drop-off time
                  </p>
                  <div className="datepicker-wrapper">
                    <DatePicker
                      selected={dropOffTime || new Date(selectedReservation.dropOffDateTime)}
                      onChange={(date) => onSetNewDropOffTimeHandler(date!)}
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
        : null
      }
    </div>
  );
});

export default ReservationUpcoming;
