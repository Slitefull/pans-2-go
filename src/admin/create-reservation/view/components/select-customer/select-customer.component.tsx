import React, { FC, useCallback } from 'react';
import { observer } from "mobx-react";
import { CustomersService } from "@/admin/customers/domain/customers.service";
import { injector } from "@/common/injector/Injector";
import { ADD_NEW_RESERVATION_BY_ADMIN_SERVICE, CUSTOMERS_SERVICE } from "@/common/injector/constants";
import { NewReservationByAdminService } from "@/admin/create-reservation/domain/create-reservation.service";
import CustomSelect from "@/ui-kit/components/select/select.component";

import './select-customer.styles.scss';


interface SelectValues<L = string, V = string> {
  label: L,
  value: V,
}

const SelectCustomer: FC = observer((): JSX.Element => {
  const newReservationByAdminService: NewReservationByAdminService = injector.get(ADD_NEW_RESERVATION_BY_ADMIN_SERVICE);
  const customersService: CustomersService = injector.get(CUSTOMERS_SERVICE);

  const convertedCustomers: Array<SelectValues> = customersService.customers.map((customer) => ({
    label: `${customer.firstName} ${customer.lastName}`,
    value: customer.id,
  }))

  const onChangeCustomerHandler = useCallback((customer: string) => {
    newReservationByAdminService.selectedCustomer = customer;
  }, [newReservationByAdminService])

  return (
    <div className="select-customer">
      <CustomSelect
        options={convertedCustomers}
        onChange={onChangeCustomerHandler}
        label="Select a Customer"
      />
    </div>
  );
});

export default SelectCustomer;
