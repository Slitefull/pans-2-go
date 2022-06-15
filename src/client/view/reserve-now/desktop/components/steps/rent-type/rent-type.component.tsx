import React, { FC } from 'react';
import ReserveNowPageLayout from "@/client/view/reserve-now/components/page-layout/page-layout.component";
import RentType from "@/client/view/reserve-now/components/rent-type/rent-type.component";
import { observer } from "mobx-react";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { reservationRentTypes } from "@/client/view/reserve-now/constants";

import './rent-type.styles.scss'


const RentTypeStep: FC = observer((): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  return (
    <ReserveNowPageLayout
      title="What’s a rent type?"
      isDisabledNextButton={!reservationService.rentTypePick}
    >
      <div className="rent-type-step">
        {reservationRentTypes(reservationService).map((rentType) => (
          <RentType
            type={rentType.type}
            price={rentType.price}
            description={rentType.description}
            isSelected={rentType.isSelected}
            image={rentType.image}
          />
        ))}
      </div>
    </ReserveNowPageLayout>
  )
})

export default RentTypeStep;
