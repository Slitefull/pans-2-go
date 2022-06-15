import React, { FC, useMemo } from 'react';
import { observer } from "mobx-react";
import { Control, FieldErrors } from "react-hook-form";
import ReserveNowTabs, { TabElement } from '../components/tabs/tabs.component';
import RentTypeStep from "@/client/view/reserve-now/desktop/components/steps/rent-type/rent-type.component";
import CarTypeStep from "@/client/view/reserve-now/desktop/components/steps/car-type/car-type.component";
import HowFarStep from "@/client/view/reserve-now/desktop/components/steps/how-far/how-far.component";
import TimeStep from "@/client/view/reserve-now/desktop/components/steps/time/time.component";
import PackagesAdditionalStep
  from "@/client/view/reserve-now/desktop/components/steps/packages-additionals/packages-additionals.component";
import FinishStep from "@/client/view/reserve-now/desktop/components/steps/finish/finish.component";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { RentTypes } from "@/common/constants/rentTypes";


interface ReserveNowDesktopProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

const ReserveNowDesktop: FC<ReserveNowDesktopProps> = observer((
  {
    control,
    errors,
  }
): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const tabs: Array<TabElement> = useMemo(() => {
    const elements: Array<TabElement> = [
      {
        title: "Rent type",
        step: <RentTypeStep/>,
      },
      {
        title: "Car type",
        step: <CarTypeStep/>,
      },
      {
        title: "How far",
        step: <HowFarStep/>,
        isAdditionalStep: true,
      },
      {
        title: "Time",
        step: <TimeStep/>,
      },
      {
        title: "Packages & Additionals",
        step: <PackagesAdditionalStep/>,
        isAdditionalStep: true,
      },
      {
        title: "Final",
        step: <FinishStep
          control={control}
          errors={errors}
        />,
      }
    ]

    if (reservationService.rentTypePick === RentTypes.DAILY_WEEKLY) {
      return elements.filter((el) => !el.isAdditionalStep)
    }

    return elements;
  }, [control, errors, reservationService.rentTypePick])

  return (
    <ReserveNowTabs
      step={reservationService.currentStep}
      tabs={tabs}
    >
      {tabs[reservationService.currentStep].step}
    </ReserveNowTabs>
  );
});

export default ReserveNowDesktop;
