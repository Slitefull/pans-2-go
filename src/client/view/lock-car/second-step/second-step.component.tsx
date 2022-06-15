import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from "mobx-react";
import { MY_RESERVATIONS_PAGE } from "@/common/constants/routes";
import { History } from "history";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, HISTORY, LOCK_CAR_SERVICE } from "@/common/injector/constants";
import { useTranslation } from "react-i18next";
import Table from "@/ui-kit/components/table/table.component";
import { LockCarService } from "@/common/lock-car/domain/lock-car.service";
import { Button } from "@/ui-kit/components/button/button.component";
import { PaymentTypes } from "@/common/constants/paymentTypes";
import Bullet from "@/ui-kit/components/bullet/bullet.component";
import { AppService } from "@/common/app/domain/app.service";
import { getAdditionalRequestPrice } from '@/common/helpers/getAdditionalRequestPrice.helper';
import { parseAdditionalRequestTitle } from "@/common/helpers/parseAdditionalRequestTitle.helper";
import { Cell } from "react-table";

import "./second-step.styles.scss";


const LockCarSecondStep: FC = observer((): JSX.Element => {
  const { t } = useTranslation();

  const history: History = injector.get(HISTORY)
  const appService: AppService = injector.get(APP_SERVICE);
  const lockCarService: LockCarService = injector.get(LOCK_CAR_SERVICE);

  const columns = useMemo(() => [
      {
        Header: '#',
        accessor: 'number',
        style: {
          width: '15%',
        },
      },
      {
        Header: t("client.itemName"),
        accessor: 'itemName',
        style: {
          width: '100%',
        },
        Cell: ({ row }: Cell) => <p>{parseAdditionalRequestTitle(row.values.itemName)}</p>
      },
      {
        Header: t("client.unitPrice"),
        accessor: 'unitPrice',
        style: {
          width: '100%',
          textAlign: 'center'
        },
        Cell: ({ row }: Cell) =>
          <p>{getAdditionalRequestPrice(row.values.itemName, lockCarService.selectedReservation?.price)}$</p>
      },
    ], []
  )

  const additionalRequestsElements = lockCarService.selectedReservation!.additionalRequest.map((item, index) => ({
    number: index + 2,
    itemName: item,
  }))

  const data = [{
    number: 1,
    itemName: "Standard car renting"
  }, ...additionalRequestsElements]

  const onSelectPaymentMethodHandler = useCallback((paymentMethod: string) => {
    lockCarService.selectedPaymentMethod = paymentMethod;
  }, [lockCarService])

  const onReturnHandler = useCallback(() => {
    history.push(MY_RESERVATIONS_PAGE);
  }, [history])

  const onFinishTripHandler = useCallback(() => {
    lockCarService.lockCar({
      carId: lockCarService.selectedReservation!.car.id,
      deviceKey: lockCarService.selectedReservation!.car.deviceKey,
      reservationType: "upcoming",
    })
    lockCarService.onSubmitLockCar();
  }, [lockCarService])

  useEffect(() => {
    if (!lockCarService.selectedReservation) {
      appService.redirectTo(MY_RESERVATIONS_PAGE);
    }
  }, [])

  return (
    <div className="second-step">
      <p className="content">
        1. {t("client.checkYourPrice")}
      </p>
      <div className="border-for-table">
        <Table columns={columns} data={data}/>
      </div>
      <p className="total-price">
        {`${t("client.total")}:`}
        <span>{`$${lockCarService.selectedReservation?.totalPrice}`}</span>
      </p>
      <div className="payment-method-section">
        <p className="content">
          2. {t("client.selectThePaymentMethod")}
        </p>
        <div className="bullets-wrapper">
          <Bullet
            name={PaymentTypes.Card}
            title={t("client.creditCard")}
            isActive={lockCarService.selectedPaymentMethod === PaymentTypes.Card}
            onClickHandler={onSelectPaymentMethodHandler}
          />
        </div>
      </div>
      <div className="second-step__buttons">
        <Button
          color="secondary"
          onClick={onReturnHandler}
        >
          {t("client.return")}
        </Button>
        <Button
          color="primary"
          onClick={onFinishTripHandler}
          disabled={!lockCarService.selectedPaymentMethod}
        >
          Finish trip
        </Button>
      </div>
    </div>
  );
});

export default LockCarSecondStep;
