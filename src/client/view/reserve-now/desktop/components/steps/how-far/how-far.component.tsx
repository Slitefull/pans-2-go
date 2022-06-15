import React, { FC, useEffect } from 'react';
import { observer } from "mobx-react";
import ReserveNowPageLayout from "@/client/view/reserve-now/components/page-layout/page-layout.component";
import ReservationMapElement from "@/client/view/reserve-now/components/map-element/map-element.component";
import { reservationMapElements } from "@/client/view/reserve-now/constants";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";

import './how-far.styles.scss';


const HowFarStep: FC = observer((): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  useEffect(() => {
    if (!reservationService.packages.length) {
      reservationService.getHourlyPackagesByCategory(reservationService.carType)
    }
  }, [reservationService.packages.length])

  return (
    <ReserveNowPageLayout
      title="How far are you driving?"
      isDisabledNextButton={!reservationService.area || (reservationService.area === 'outNY' && !reservationService.state)}
    >
      <div className="how-far-step">
        {reservationMapElements(reservationService).map((mapElement) => (
          <ReservationMapElement
            image={mapElement.image}
            description={mapElement.description}
            value={mapElement.value}
            isActive={mapElement.isActive}
            withRegionSelector={mapElement.withRegionSelector}
          />
        ))}
      </div>
    </ReserveNowPageLayout>
  );
});

export default HowFarStep;
