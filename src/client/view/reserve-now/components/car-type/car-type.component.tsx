import React, { FC, useCallback, useEffect, useState } from 'react';
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { BodyTypes } from "@/common/constants/bodyTypes";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { createImageUrlFromBackend } from '@/common/helpers/createImageUrl.helper';
import { RentTypes } from "@/common/constants/rentTypes";
import { observer } from "mobx-react";

import './car-type.styles.scss'


interface CarTypeProps {
  id: string;
  rate: Rate,
  title: BodyTypes;
  description: string;
  isSelected: boolean;
  image: string;
}

interface Rate {
  dailyRate: number;
  hourlyRate: number;
}

const CarType: FC<CarTypeProps> = observer((
  {
    id,
    rate,
    title,
    description,
    isSelected,
    image,
  }
): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);
  const [selectedRate, setSelectedRate] = useState<number | null>(null)

  const onSetCarTypeHandler = useCallback(() => {
    reservationService.carType = id;
    reservationService.carTypeTitle = title;
    reservationService.carTypePrice = selectedRate;
  }, [reservationService, id, title, selectedRate])

  useEffect(() => {
    if (reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL) {
      if (reservationService.carType === id && reservationService.carTypePrice !== rate.hourlyRate) {
        reservationService.carTypePrice = rate.hourlyRate;
      }

      setSelectedRate(rate.hourlyRate);
      return;
    }

    if (reservationService.carType === id && reservationService.carTypePrice !== rate.dailyRate) {
      reservationService.carTypePrice = rate.dailyRate;
    }
    setSelectedRate(rate.dailyRate)
  }, [])

  return (
    <div
      className={`car-type ${isSelected ? 'active' : ''}`}
      onClick={onSetCarTypeHandler}
    >
      <p className="car-type__title">
        {title}
      </p>
      <img
        src={createImageUrlFromBackend(image)}
        className="car-type__image"
        alt="Car Type"
      />
      <div>
        <p className="car-type__starting-from">
          {reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL ? '1 hour' : '1 day'}
        </p>
        <p className="car-type__price">
          {reservationService.rentTypePick === RentTypes.HOURLY_PARTIAL ? `$${rate.hourlyRate}` : `$${rate.dailyRate}`}
        </p>
      </div>
      <p className="car-type__description">
        {description}
      </p>
    </div>
  );
});

export default CarType;
