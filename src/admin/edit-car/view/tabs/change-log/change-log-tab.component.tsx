import React, { useMemo } from 'react';
import moment from "moment";
import { observer } from "mobx-react";
import Table from "@/ui-kit/components/table/table.component";
import { injector } from "@/common/injector/Injector";
import { EDIT_CAR_SERVICE } from "@/common/injector/constants";
import { ChangeLogElement } from "@/admin/customer/api/dto/customer.dto";
import { Cell } from "react-table";
import { EditCarService } from "@/admin/edit-car/domain/edit-car.service";

import "./change-log-tab.styles.scss";


const ChangeLogTab = observer(() => {
  const editCarService: EditCarService = injector.get(EDIT_CAR_SERVICE);
  const data: Array<ChangeLogElement> = useMemo(() => editCarService.changeLogs, [editCarService.changeLogs]);

  const columns = [
    {
      Header: 'Date',
      accessor: 'createdAt',
      style: {
        width: '100%',
      },
      Cell: ({ row }: Cell) => (<p>{moment(row.values.createdAt).format('lll')}</p>)
    },
    {
      Header: 'Actions',
      accessor: 'action',
      style: {
        width: '100%',
        whiteSpace: 'normal',
      }
    },
  ];

  return (
    <div className="change-log">
      <Table columns={columns} data={data}/>
    </div>
  );
});

export default ChangeLogTab;
