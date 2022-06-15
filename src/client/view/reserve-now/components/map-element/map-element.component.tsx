import React, { FC, useCallback, useEffect, useState } from 'react';
import { isMobile } from "react-device-detect";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";
import AutoCompleteAreaMobile
  from "@/client/view/reserve-now/components/autocomplete-area-mobile/autocomplete-area.component";
import CustomAutocomplete from '@/ui-kit/components/autocomplete/autocomplete.component';
import { StatesData } from '../../desktop/const/states-const';
import { Button } from "@/ui-kit/components/button/button.component";

import './map-element.styles.scss';


export interface IReservationMapElement {
  image: string;
  description: string;
  value: AllowedAreasValues;
  isActive: boolean;
  withRegionSelector?: boolean;
}

const ReservationMapElement: FC<IReservationMapElement> = (
  {
    image,
    description,
    value,
    isActive,
    withRegionSelector,
  }
): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const [region, setRegion] = useState<string>('');
  const [isOpenStateModal, setIsOpenStateModal] = useState<boolean>(false);

  const onSelectAreaHandler = useCallback(() => {
    reservationService.area = value;
    reservationService.package = null;

    if (value === AllowedAreasValues.outNY) {
      setIsOpenStateModal(true);
    }
  }, [reservationService, value, region])

  const onOpenModalHandler = useCallback(() => {
    reservationService.area = AllowedAreasValues.outNY;
    setIsOpenStateModal(true);
  }, [])

  useEffect(() => {
    reservationService.state = (value === AllowedAreasValues.outNY) ? region : null;
  }, [region]);

  return (
    <div className="map-element">
      <div
        className={`map-element__map ${isActive ? "active" : ""}`}
        onClick={onSelectAreaHandler}
      >
        <figure className="map-element__map__figure">
          <img
            src={image}
            alt={description}
            className={`map-element__map__figure__image`}
          />
          <figcaption className="map-element__map__description">
            {description}
          </figcaption>
        </figure>
      </div>
      {(withRegionSelector && isMobile) && (
        <Button color="primary" className="choose-region-button" onClick={onOpenModalHandler}>
          CHOOSE REGION
        </Button>
      )}
      {(!isMobile && withRegionSelector) &&
        <div className="region-dropdown__wrapper">
          <CustomAutocomplete
            items={StatesData()}
            value={region}
            onChangeHandler={val => setRegion(val)}
            isDisabled={reservationService.area !== AllowedAreasValues.outNY}
            placeholder="State, city"
          />
        </div>
      }
      {(isMobile && isOpenStateModal) && (
        <AutoCompleteAreaMobile
          isOpen={isOpenStateModal}
          setIsOpen={setIsOpenStateModal}
          region={region}
          setRegion={setRegion}
        />
      )}
    </div>
  );
};

export default ReservationMapElement;
