import React, { FC, useEffect, useState } from 'react';
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { observer } from "mobx-react";
import moment from "moment";
import { LockCarService } from "@/common/lock-car/domain/lock-car.service";
import { injector } from "@/common/injector/Injector";
import { DRONE_MOBILE_REPOSITORY, HISTORY, LOCK_CAR_SERVICE } from "@/common/injector/constants";
import { MY_RESERVATIONS_PAGE } from "@/common/constants/routes";
import { History } from "history";
import LockCarFirstStep from "@/client/view/lock-car/first-step/first-step.component";
import LockCarSecondStep from "@/client/view/lock-car/second-step/second-step.component";
import RoundLoader from "@/ui-kit/components/loaders/round/round-loader.component";
import { DroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo";
import { IconSvg } from "@/ui-kit/components/icon-svg/icon-svg.component";

import './lock-car.styles.scss';


const LockCar: FC = observer((): JSX.Element => {
  const history: History = injector.get(HISTORY)
  const lockCarService: LockCarService = injector.get(LOCK_CAR_SERVICE);
  const droneMobileRepo: DroneMobileRepository = injector.get(DRONE_MOBILE_REPOSITORY);

  const [carImage, setCarImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

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
    return () => {
      lockCarService.reset()
    }
  }, [])

  useEffect(() => {
    if (!lockCarService.selectedReservation) {
      history.push(MY_RESERVATIONS_PAGE)
    }

    setIsLoadingImage(true);
    if (lockCarService.selectedReservation) {
      if (lockCarService.selectedReservation.car.deviceKey) {
        droneMobileRepo.getVehicle(lockCarService.selectedReservation!.car.deviceKey).then((response) => {
          getAddress(response.last_known_state.latitude, response.last_known_state.longitude);
          setCarImage(response.image)
          setIsLoadingImage(false);
        })
      }
    }
  }, [])

  return (
    <PageWrapper title="Finish Trip" withSidebar={false} withClientHeader>
      <div className="lock-car">
        <div className="car-info-wrapper">
          <div className="car-info">
            {lockCarService.selectedReservation?.car.title &&
              <p className="text">
                {lockCarService.selectedReservation?.car.title}
              </p>
            }
            {lockCarService.selectedReservation?.car.plateNumber &&
              <p className="text">
                {lockCarService.selectedReservation?.car.plateNumber}
              </p>
            }
            {address &&
              <p className="address text">
                <IconSvg name={"address"}/> {address}
              </p>
            }
          </div>
          <div className="car-image">
            {isLoadingImage
              ? <RoundLoader inContainer={true}/>
              : carImage
                ? <img src={carImage} className="car-info-wrapper__image" alt="Car"/>
                : null
            }
          </div>
          <div className="reservation-time">
            <p className="time">
              {`${moment(lockCarService.selectedReservation?.pickupDateTime).format('MM/DD, h:mm a')} 
                - 
                ${moment(lockCarService.selectedReservation?.dropOffDateTime).format('MM/DD, h:mm a')}`}
            </p>
          </div>

        </div>
        {lockCarService.currentStep === 1
          ? <LockCarFirstStep/>
          : <LockCarSecondStep/>
        }
      </div>
    </PageWrapper>
  );
});

export default LockCar;
