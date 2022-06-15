import React, { useEffect, useMemo } from 'react';
import Table from "@/ui-kit/components/table/table.component";
import { observer } from "mobx-react";
import { CustomerService } from "@/admin/customer/domain/customer.service";
import { injector } from "@/common/injector/Injector";
import { CUSTOMER_SERVICE } from "@/common/injector/constants";
import { CustomerTabs } from '@/admin/customer/constants';

import "./reservation-history.styles.scss";


const ReservationHistoryTab = observer(() => {
  const customerService: CustomerService = injector.get(CUSTOMER_SERVICE);

  const columns = [
    {
      Header: '#',
      accessor: 'number',
      style: {
        width: '50%',
      },
    },
    {
      Header: 'Pick-up',
      accessor: 'pickUp',
      style: {
        width: '100%',
      },
    },
    {
      Header: 'Hours',
      accessor: 'hours',
      style: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }
    },
    {
      Header: 'Drop-off',
      accessor: 'dropOff',
      style: {
        width: '100%'
      }
    },
  ];

  const data = useMemo(() => customerService.reservationHistory, [customerService.reservationHistory]);

  useEffect(() => {
    customerService.tab = CustomerTabs.RESERVATION_HISTORY;
    if (customerService.selectedCustomer) {
      customerService.getReservationHistoryByUserId({
        userId: customerService.selectedCustomer.id,
        limit: 0,
        offset: 10,
      })
    }
  }, [customerService.tab])

  return (
    <div className="reservation-history">
      <Table columns={columns} data={data}/>
    </div>
  );
});

export default ReservationHistoryTab;
