import React, { FC } from "react"
import { observer } from "mobx-react";


type TabTitleProps = {
  title: string;
  isActive: boolean;
  stepNumber: number;
}

const ReserveNowTabTitle: FC<TabTitleProps> = observer((
  {
    title,
    isActive,
    stepNumber,
  }
): JSX.Element => {
  return (
    <div className="reserve-now-tabs-pane-header__element">
      <span className={`step-number ${isActive ? 'active' : ''}`}>
        {stepNumber}
      </span>
      <span className="step-title">
        {title}
      </span>
    </div>
  )
})

export default ReserveNowTabTitle
