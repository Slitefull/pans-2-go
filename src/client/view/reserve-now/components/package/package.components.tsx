import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from "mobx-react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { ReservationService } from '@/common/reservation/domain/reservation.service';

import './package.styles.scss';


interface ReservationPackageProps {
  hours: number;
  price: number;
  isSelected: boolean;
  isDisabled: boolean;
}

const ReservationPackage: FC<ReservationPackageProps> = observer((
  {
    hours,
    price,
    isSelected,
    isDisabled,
  }
): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const isNotEnabled = isChecked || reservationService.isTouchedDate || reservationService.package === hours || isDisabled;

  const onSelectPackageHandler = useCallback((reservationPackage: number) => {
    const fullHours = new Date(reservationService.pickUp!).getHours();
    const fullMinutes = new Date(reservationService.pickUp!).getMinutes();

    if (hours === 1.5) {
      reservationService.dropOffWithPackage = setMinutes(new Date(reservationService.pickUp!),
        fullMinutes + 90)
    } else {
      reservationService.dropOffWithPackage = setHours(new Date(reservationService.pickUp!),
        fullHours + reservationPackage
      );
    }

    reservationService.package = reservationPackage;
    setIsChecked(true);
  }, [hours, reservationService])

  useEffect(() => {
    if (reservationService.package !== hours) {
      setIsChecked(false);
    }
  }, [reservationService.package])

  return (
    <button
      className={`reservation-package ${isSelected ? "active" : ""} ${isNotEnabled ? "disabled" : ""}`}
      onClick={() => onSelectPackageHandler(hours)}
      disabled={isNotEnabled}
    >
      <p className="reservation-package__hours">
        {`${hours} hrs`}
      </p>
      <p className="reservation-package__price">
        {`$${price}`}
      </p>
    </button>
  );
});

export default ReservationPackage;
