import React, { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";

import "./vehicles-radio.styles.scss";
import InfoIcon from "@/ui-kit/customized-icons/info/info.component";


interface VehiclesRadioProps {
  id: string;
  price: number;
  description: string;
  label: string;
  checked?: boolean;
  deactive?: boolean;
}

export const VehiclesRadio: FC<VehiclesRadioProps> = observer((
    {
      id,
      price,
      description,
      label,
      checked,
      deactive = false
    }
  ): JSX.Element => {
    const { register } = useForm();
    const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);
    const [isOpenDescription, setIsOpenDescription] = useState(false);

    const onChangeHandler = useCallback(() => {
      reservationService.selectedCarType.id = id;
      reservationService.selectedCarType.label = label;
      reservationService.selectedCarType.price = price;
    }, [reservationService, id, label, price]);

    return (
      <div
        className={`vehicles-radio ${checked ? "checked" : ""}`}
        onClick={(!deactive) ? onChangeHandler : () => {
        }}
      >
        <input
          {...register(id)}
          type="radio"
          checked={checked}
          className={`vehicles-radio__input ${checked ? "checked" : ""}`}
          onChange={onChangeHandler}
          disabled={deactive}
        />
        <p className="vehicles-radio__price">
          ${`${price} ${reservationService.rentTypePick === "Daily/Weekly" ? "/d" : "/h"}`}
        </p>
        <label className="vehicles-radio__label">
          {label} <InfoIcon
          size={20}
          onClickHandler={() => setIsOpenDescription(!isOpenDescription)}
        />
        </label>
        {isOpenDescription && <p className="vehicles-radio__description">
          {description}
        </p>}
      </div>
    );
  }
);
