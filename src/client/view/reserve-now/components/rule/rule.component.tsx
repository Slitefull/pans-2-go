import React, { FC } from 'react';

import './rule.styles.scss';


interface ReservationRuleProps {
  isChecked: boolean;
  onCheckHandler: () => void;
}

const ReservationRule: FC<ReservationRuleProps> = (
  {
    children,
    isChecked,
    onCheckHandler,
  }
): JSX.Element => {
  return (
    <div className="reservation-rule">
      {children}
      <input
        type="checkbox"
        className="reservation-rule__checkbox"
        checked={isChecked}
        onClick={onCheckHandler}
      />
    </div>
  );
};

export default ReservationRule;
