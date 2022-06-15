import React, { FC, useCallback } from 'react';
import { observer } from "mobx-react";
import { MY_RESERVATIONS_PAGE } from "@/common/constants/routes";
import { History } from "history";
import { injector } from "@/common/injector/Injector";
import { HISTORY, LOCK_CAR_SERVICE } from "@/common/injector/constants";
import { Button } from "@/ui-kit/components/button/button.component";
import { LockCarService } from "@/common/lock-car/domain/lock-car.service";
import { useTranslation } from "react-i18next";

import "./first-step.styles.scss";


const UnlockCarFirstStep: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const history: History = injector.get(HISTORY)
  const lockCarService: LockCarService = injector.get(LOCK_CAR_SERVICE);

  const onCancelHandler = useCallback(() => {
    lockCarService.reset();
    history.push(MY_RESERVATIONS_PAGE);
  }, [history, lockCarService])

  const onUnlockHandler = useCallback(() => {
    lockCarService.currentStep = 2;
  }, [lockCarService])

  return (
    <div className="first-step">
      <div className="first-step__body">
        <div className="first-step__body__section__unlock">
          <p className="section-title">
            {t("client.weAlreadyInspectedForAnyPreviousDamagesButForYourOwnSafetyPleaseCheckTheCar")}
          </p>
        </div>
      </div>
      <div className="first-step__buttons">
        <Button
          color="secondary"
          onClick={onCancelHandler}
        >
          {t("client.cancel")}
        </Button>
        <Button
          color="primary"
          onClick={onUnlockHandler}
        >
          {t("client.unlock")}
        </Button>
      </div>
    </div>
  );
});

export default UnlockCarFirstStep;
