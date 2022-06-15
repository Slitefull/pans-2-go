import React, { createRef, ReactNode, Ref, useEffect, useState } from "react";
import ReserveNowTabTitle from "./tab-title/tab-title.component";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";

import "./tabs.styles.scss";


interface TabsProps {
  step: number;
  tabs: Array<TabElement>;
}

export interface TabElement {
  title: string;
  step: ReactNode;
  isAdditionalStep?: boolean;
}

const ReserveNowTabs: React.FC<TabsProps> = (
  {
    step,
    children,
    tabs,
  }
): JSX.Element => {
  const headerRef: Ref<HTMLDivElement> = createRef();
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const [prevStep, setPrevStep] = useState<number>(0);

  useEffect(() => {
    if (reservationService.currentStep === 0 && prevStep === 0) return;

    if (prevStep > reservationService.currentStep) {
      headerRef.current!.scrollLeft -= 105;
    } else {
      headerRef.current!.scrollLeft += 105;
    }
    setPrevStep(reservationService.currentStep);
  }, [reservationService.currentStep])

  return (
    <div className="reserve-now-tabs-pane">
      <div ref={headerRef} className="reserve-now-tabs-pane-header">
        {tabs.map((item, index) => (
          <ReserveNowTabTitle
            key={index}
            title={item.title}
            stepNumber={index + 1}
            isActive={(step) === index}
          />
        ))}
      </div>
      <div className="reserve-now-tabs-pane__content">
        {children}
      </div>
    </div>
  )
}

export default ReserveNowTabs;
