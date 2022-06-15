import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import ReserveNowPageLayout from "@/client/view/reserve-now/components/page-layout/page-layout.component";
import ReservationRule from '../../../../components/rule/rule.component';
import ReservationSummary from '../../../../components/reservation-summary/reservation-summary.component';
import PaymentDetails from '@/client/view/reserve-now/components/payment-details/payment-details.component';
import { Control, FieldErrors } from "react-hook-form";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE, SESSION_USER_SERVICE } from "@/common/injector/constants";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { Card } from "@/ui-kit/components/card/card.component";

import './finish.styles.scss'
import { toJS } from "mobx";


interface ReservationRuleArgs {
  id: number;
  text: ReactNode;
  isChecked: boolean;
}

interface SixthStepProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

const SixthStep: FC<SixthStepProps> = (
  {
    control,
    errors,
  }
): JSX.Element => {
  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const [selectedRules, setSelectedRules] = useState<Array<number>>([]);
  const [isOpenEditCard, setIsOpenEditCard] = useState<boolean>(false);

  const rules: Array<ReservationRuleArgs> = [
    {
      id: 1,
      text: <p className='reservation-rule__text'>
        No smoking in the car. Fine of <span className="reservation-rule__price">$100!</span>
      </p>,
      isChecked: selectedRules.includes(1),
    },
    {
      id: 2,
      text: <p className='reservation-rule__text'>
        In case of incident happen: crash, car damage or breakdown, you have to contact the renting office!
      </p>,
      isChecked: selectedRules.includes(2),
    },
    {
      id: 3,
      text: <p className='reservation-rule__text'>
        No overnight parking in clean up zones! Fine of <span className="reservation-rule__price">$300</span> +
        government fine!
      </p>,
      isChecked: selectedRules.includes(3),
    }
  ]

  const onCheckRuleHandler = useCallback((ruleId: number) => {
    if (selectedRules.includes(ruleId)) {
      const filteredRules = selectedRules.filter((rule) => rule !== ruleId)
      setSelectedRules(filteredRules)
    } else {
      setSelectedRules([...selectedRules, ruleId])
    }
  }, [selectedRules])

  const onChangeIsOpenEditCard = (): void => setIsOpenEditCard(!isOpenEditCard);

  useEffect(() => {
    reservationService.isDisabledFinishButton = selectedRules.length !== 3;
  }, [selectedRules.length])

  return (
    <ReserveNowPageLayout title="Final">
      <div className="sixth-step">
        <div className="reservation-summary-title section-title">
          Reservation Summary
        </div>
        <ReservationSummary/>
        <div className="payment-details-title section-title">
          Payment Details
        </div>
        {
          isOpenEditCard
            ? <PaymentDetails
              control={control}
              errors={errors}
            />
            : <Card
              digits={sessionUserService.payment.cardNumbers}
              onChange={onChangeIsOpenEditCard}
            />
        }
        <div className="rules-title section-title">
          Rules
        </div>
        <div className="rules">
          {rules.map((rule) => (
            <ReservationRule
              isChecked={rule.isChecked}
              onCheckHandler={() => onCheckRuleHandler(rule.id)}
            >
              {rule.text}
            </ReservationRule>
          ))}
        </div>
      </div>
    </ReserveNowPageLayout>
  );
};

export default SixthStep;
