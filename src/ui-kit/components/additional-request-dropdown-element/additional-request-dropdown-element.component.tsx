import React, { FC } from "react";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { ReservationService } from "@/common/reservation/domain/reservation.service";

import "./additional-request-dropdown-element.styles.scss";


interface AdditionalRequestDropdownElementProps {
  name: string;
  label: string;
  disabled: boolean;
  isChecked: boolean;
}

const AdditionalRequestDropdownElement: FC<AdditionalRequestDropdownElementProps> = observer((
  {
    name,
    label,
    disabled = false,
    isChecked
  }
): JSX.Element => {
  const { register } = useForm();
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const onChangeHandler = () => {
    if (!isChecked) {
      reservationService.selectedAdditionalRequest = [
        ...reservationService.selectedAdditionalRequest,
        name,
      ];
    } else {
      reservationService.selectedAdditionalRequest =
        reservationService.selectedAdditionalRequest.filter(
          (elem) => elem !== name
        );
    }
  };

  return (
    <div className="dropdown-item">
      <div className="dropdown-item__body">
        <div className="dropdown-item__body__label">
          {label}
        </div>
      </div>
      <div className="dropdown-item__body__payment">
        {`+$${label !== 'Additional driver' ? 10 : 5}`}
      </div>

      <input
        {...register(name)}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        className="dropdown-item__body__checkbox"
        onChange={onChangeHandler}
      />
    </div>
  );
});

export default AdditionalRequestDropdownElement;
