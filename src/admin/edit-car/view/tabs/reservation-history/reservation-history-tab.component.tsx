import React, { useEffect, useMemo } from 'react';
import Table from "@/ui-kit/components/table/table.component";
import { observer } from "mobx-react";
import { EditCarService } from "@/admin/edit-car/domain/edit-car.service";
import { injector } from "@/common/injector/Injector";
import { EDIT_CAR_SERVICE } from "@/common/injector/constants";

import "./reservation-history-tab.styles.scss";


const ReservationHistoryTab = observer(() => {
  const editCarService: EditCarService = injector.get(EDIT_CAR_SERVICE);

  const columns = [
    {
      Header: '#',
      accessor: 'number',
      style: {
        width: '100px',
      },
    },
    {
      Header: 'Customer',
      accessor: 'customer',
      style: {
        width: '100%',
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
        textAlign: 'center',
        margin: 'auto'
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

  const data = useMemo(() => editCarService.reservationHistory, [editCarService.reservationHistory]);

  useEffect(() => {
    if (editCarService.selectedCar) {
      editCarService.getReservationHistoryByCarId({
        carId: editCarService.selectedCar.id,
        limit: 0,
        offset: 10,
      })
    }
  }, [])

  return (
    <div className="reservation-history">
      <Table columns={columns} data={data}/>
    </div>
  );
});

export default ReservationHistoryTab;
