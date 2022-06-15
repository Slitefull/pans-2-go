import React, { FC, useEffect } from 'react';
import ReserveNowPageLayout from "@/client/view/reserve-now/components/page-layout/page-layout.component";
import { observer } from "mobx-react";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { injector } from "@/common/injector/Injector";
import { CARS_SERVICE, RESERVATION_SERVICE } from "@/common/injector/constants";
import CarType from "@/client/view/reserve-now/components/car-type/car-type.component";
import { ReservationService } from "@/common/reservation/domain/reservation.service";

import './car-type.styles.scss';


const CarTypeStep: FC = observer((): JSX.Element => {
  const carsService: CarsService = injector.get(CARS_SERVICE);
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  useEffect(() => {
    return () => {
      reservationService.getHourlyPackagesByCategory(reservationService.carType)
    }
  }, [])

  return (
    <ReserveNowPageLayout
      title="What’s a car type?"
      isDisabledNextButton={!reservationService.carType}
    >
      <div className="car-type-step">
        {carsService.carCategories.map((category) => <CarType
            key={category.id}
            id={category.id}
            rate={category.categoryRate}
            title={category.title}
            description={category.description}
            isSelected={category.id === reservationService.carType}
            image={category.imageUrl}
          />
        )}
      </div>
    </ReserveNowPageLayout>
  );
});

export default CarTypeStep;
