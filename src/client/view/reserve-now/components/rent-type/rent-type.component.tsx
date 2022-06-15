import React, { FC, useCallback } from 'react';
import { RentTypes } from "@/common/constants/rentTypes";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";

import './rent-type.styles.scss'


interface RentTypeProps {
  type: RentTypes,
  price: number;
  description: string;
  isSelected: boolean;
  image: string;
}

const RentType: FC<RentTypeProps> = (
  {
    type,
    price,
    description,
    isSelected,
    image,
  }
): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const onSetRentTypeHandler = useCallback(() => {
    reservationService.rentTypePick = type;
  }, [reservationService, type])

  return (
    <div
      className={`rent-type ${isSelected ? 'active' : ''}`}
      onClick={onSetRentTypeHandler}
    >
      <p className="rent-type__title">
        {type}
      </p>
      <img
        className="rent-type__image"
        src={image}
      />
      <div>
        <p className="rent-type__starting-from">
          starting from
        </p>
        <p className="rent-type__price">
          {`$${price}/${type === RentTypes.HOURLY_PARTIAL ? "hourly" : "day"}`}
        </p>
      </div>
      <p className="rent-type__description">
        {description}
      </p>
    </div>
  );
};

export default RentType;
