import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import Table from "@/ui-kit/components/table/table.component";

import "./invoices.styles.scss";


const Invoices = observer(() => {
  const { t } = useTranslation();
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const columns = [
    {
      Header: '#',
      accessor: 'number',
      style: {
        width: '100%',
      },
    },
    {
      Header: t("invoice.name"),
      accessor: 'name',
      style: {
        width: '100%'
      }
    },
    {
      Header: t("invoice.unitPrice"),
      accessor: 'unitPrice',
      style: {
        width: '100%'
      }
    },
    {
      Header: t("invoice.unitNumber"),
      accessor: 'unitNumber',
      style: {
        width: '100%'
      }
    },
    {
      Header: t("invoice.totalPrice"),
      accessor: 'totalPrice',
      style: {
        width: '100%'
      }
    },
  ];

  const additions: any[] = reservationService.selectedAdditionalRequest;

  const item: any[] = [{
    number: '1',
    name: reservationService.selectedCarType.label,
    unitPrice: reservationService.totalPrice.fullDay,
    unitNumber: '1',
    totalPrice: reservationService.totalPrice.fullDay,
  }];

  useMemo(() => {
    additions.forEach((addition, key) => {
      item.push({
        number: (key + 2).toString(),
        name: addition,
        unitPrice: addition !== 'AdditionalDriver' ? '10' : '5',
        unitNumber: '1',
        totalPrice: addition !== 'AdditionalDriver' ? '10' : '5'
      });
    });
  }, []);

  return (
    <div className="invoices">
      <h3>Invoice</h3>
      <div className="for-table">
        <Table
          columns={columns}
          data={item}
        />
      </div>
      <b className="invoices__totalPrice">Total: <span>{reservationService.totalPrice.totalPrice}</span></b>
    </div>
  )
});

export default Invoices;
