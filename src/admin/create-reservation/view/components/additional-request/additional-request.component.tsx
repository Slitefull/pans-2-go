import React, { FC } from 'react';
import { observer } from "mobx-react";
import { AdditionalRequestTitles } from "@/common/constants/additionalRequests";

import './additional-request.styles.scss';


interface ReservationAdditionalRequestProps {
  title: AdditionalRequestTitles;
  price: number;
  isChecked: boolean;
  onCheckHandler: () => void;
}

const ReservationAdditionalRequest: FC<ReservationAdditionalRequestProps> = observer((
  {
    title,
    price,
    isChecked,
    onCheckHandler,
  }
): JSX.Element => {
  return (
    <div className="additional-request">
      <p className="additional-request__title">
        {title}
      </p>
      <div className="right-side">
        <p className="additional-request__price">
          {`+$${price}`}
        </p>
        <input
          type="checkbox"
          className="additional-request__checkbox"
          checked={isChecked}
          onClick={onCheckHandler}
        />
      </div>
    </div>
  );
});

export default ReservationAdditionalRequest;
