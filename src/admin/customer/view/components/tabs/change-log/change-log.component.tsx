import React, { useEffect, useMemo } from 'react';
import moment from "moment";
import { observer } from "mobx-react";
import { CustomerService } from "@/admin/customer/domain/customer.service";
import { injector } from "@/common/injector/Injector";
import { CUSTOMER_SERVICE } from "@/common/injector/constants";
import { ChangeLogElement } from "@/admin/customer/api/dto/customer.dto";
import { Cell } from "react-table";
import { CustomerTabs } from '@/admin/customer/constants';
import Table from "@/ui-kit/components/table/table.component";

import "./change-log.styles.scss";


const ChangeLogTab = observer(() => {
  const customerService: CustomerService = injector.get(CUSTOMER_SERVICE);
  const data: Array<ChangeLogElement> = useMemo(() => customerService.changeLogs, [customerService.changeLogs]);

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
        width: '100%'
      }
    },
  ];

  useEffect(() => {
    customerService.tab = CustomerTabs.CHANGE_LOG;
  }, [customerService.tab]);

  return (
    <div className="change-log">
      <Table columns={columns} data={data}/>
    </div>
  );
});

export default ChangeLogTab;
