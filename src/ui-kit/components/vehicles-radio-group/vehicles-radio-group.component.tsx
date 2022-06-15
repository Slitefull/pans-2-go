import React, { FC } from "react";
import { observer } from "mobx-react";
import { VehiclesRadio } from "@/ui-kit/components/vehicles-radio/vehicles-radio.component";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";

import "./vehicles-radio-group.styles.scss";


interface VehiclesRadioGroupProps {
  label?: string;
  radioValues: RadioValue[];
  deactive?: boolean;
}

interface RadioValue {
  id: string,
  title: string,
  description: string,
  categoryRate: {
    dailyRate: number,
    hourlyRate: number,
  },
  checked?: boolean,
}

const VehiclesRadioGroup: FC<VehiclesRadioGroupProps> = observer((
    {
      radioValues,
      label,
      deactive
    }
  ): JSX.Element => {
    const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

    const selectedRentType = reservationService.rentTypePick;

    return (
      <div className="vehicles-radio-group">
        <label className="vehicles-radio-group__label">{label}</label>
        <div className="vehicles-radio-group__wrapper">
          {radioValues.map((radio) => (
            <VehiclesRadio
              id={radio.id}
              price={
                selectedRentType === "Daily/Weekly"
                  ? radio.categoryRate.dailyRate
                  : radio.categoryRate.hourlyRate
              }
              description={radio.description}
              label={radio.title}
              checked={reservationService.selectedCarType.id === radio.id}
              deactive={deactive}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default VehiclesRadioGroup;
