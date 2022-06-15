import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from "mobx-react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { injector } from "@/common/injector/Injector";
import { ADD_NEW_RESERVATION_BY_ADMIN_SERVICE } from "@/common/injector/constants";
import { NewReservationByAdminService } from "@/admin/create-reservation/domain/create-reservation.service";

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
  const newReservationService: NewReservationByAdminService = injector.get(ADD_NEW_RESERVATION_BY_ADMIN_SERVICE);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const isNotEnabled = isChecked
    || newReservationService.isTouchedDate
    || newReservationService.selectedPackage === hours || isDisabled

  const onSelectPackageHandler = useCallback((reservationPackage: number) => {
    const fullHours = new Date(newReservationService.pickUp!).getHours();
    const fullMinutes = new Date(newReservationService.pickUp!).getMinutes();

    if (hours === 1.5) {
      newReservationService.dropOffWithPackage = setMinutes(new Date(newReservationService.pickUp!),
        fullMinutes + 90)
    } else {
      newReservationService.dropOffWithPackage = setHours(new Date(newReservationService.pickUp!),
        fullHours + reservationPackage
      );
    }

    newReservationService.selectedPackage = reservationPackage;
    setIsChecked(true);
  }, [hours, newReservationService])

  useEffect(() => {
    if (newReservationService.selectedPackage !== hours) {
      setIsChecked(false);
    }
  }, [newReservationService.selectedPackage])

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
