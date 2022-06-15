import React, { FC } from "react";

import "./card.styles.scss";


export interface CardProps {
  digits: string,
  onChange?: () => void;
  classPrefix?: string;
}

export const Card: FC<CardProps> = (
  {
    digits,
    onChange,
    classPrefix,
  }): JSX.Element => {
  return (
    <div className={`ui-card-input ${classPrefix}`}>
      <div className="ui-card-input--info">
        <div className="ui-card-input--info--digits">****{digits}</div>
        <div className="ui-card-input--info--btn" onClick={onChange}>Change card</div>
      </div>
    </div>
  );
};
