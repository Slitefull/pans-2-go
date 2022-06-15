import React, { FC, useEffect } from 'react';
import { observer } from "mobx-react";
import ReserveNowPageLayout from "@/client/view/reserve-now/components/page-layout/page-layout.component";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { injector } from "@/common/injector/Injector";
import { CARS_SERVICE, RESERVATION_SERVICE } from "@/common/injector/constants";
import CarType from "@/client/view/reserve-now/components/car-type/car-type.component";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import Slider from "react-slick";


const CarTypeStep: FC = observer((): JSX.Element => {
  const carsService: CarsService = injector.get(CARS_SERVICE);
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const sliderSettings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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
      <Slider {...sliderSettings}>
        {carsService.carCategories?.map((category) => <CarType
            key={category.id}
            id={category.id}
            rate={category.categoryRate}
            title={category.title}
            description={category.description}
            isSelected={category.id === reservationService.carType}
            image={category.imageUrl}
          />
        )}
      </Slider>
    </ReserveNowPageLayout>
  );
});

export default CarTypeStep;
