import React, { BaseSyntheticEvent, FC, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import PlusIcon from "@/ui-kit/customized-icons/plus/plus.component";
import SearchInput from "@/ui-kit/components/filters/search/search.component";
import searchIcon from "@/ui-kit/icons/search.svg";
import SelectFilter, { SelectOption } from "@/ui-kit/components/filters/select/select.component";
import { customerStatusValues } from "@/common/constants/options";
import { Button } from "@/ui-kit/components/button/button.component";
import ScrollableTable from "@/ui-kit/components/scrolable-table/scrollable-table.component";
import RoundLoader from "@/ui-kit/components/loaders/round/round-loader.component";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { CustomersService } from "@/admin/customers/domain/customers.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, CUSTOMER_SERVICE, CUSTOMERS_SERVICE } from "@/common/injector/constants";
import { AppService } from "@/common/app/domain/app.service";
import { ADD_NEW_CUSTOMER, CUSTOMER_PAGE } from "@/common/constants/routes";
import { Cell } from "react-table";
import Status from "@/ui-kit/components/status/status.component";
import TableOptions from "@/ui-kit/components/scrolable-table/options/options.component";
import getCustomerStatusBackgroundColorAdmin from "@/common/helpers/getCustomerStatusBackgroundColorAdmin.helper";
import { CustomerService } from '@/admin/customer/domain/customer.service';
import { LS_SELECTED_EDIT_CUSTOMER_ID } from "@/common/constants/localStorage";

import "./customers.styles.scss";


interface CustomerOption {
  key: string,
  label: string,
  handler: (reservationId: string) => void,
}

const Customers: FC = observer(() => {
  const { t } = useTranslation();
  const outsideRef = useRef(null);

  const appService: AppService = injector.get(APP_SERVICE);
  const customerService: CustomerService = injector.get(CUSTOMER_SERVICE);
  const customersService: CustomersService = injector.get(CUSTOMERS_SERVICE);

  const customerOptions: Array<CustomerOption> = [
    {
      key: 'pending',
      label: 'Set Pending',
      handler: (id: string) => onSetPendingCustomerHandler(id),
    },
    {
      key: 'block',
      label: 'Block',
      handler: (id: string) => onBlockCustomerHandler(id),
    },
    {
      key: 'view',
      label: 'View',
      handler: (id: string) => onViewCustomerHandler(id),
    },
  ]

  const columns = [
    {
      Header: t("admin.id"),
      accessor: 'number',
      style: {
        width: 100
      }
    },
    {
      Header: t("admin.customerName"),
      accessor: 'firstName',
      style: {
        width: 250
      },
      Cell: ({ row }: Cell) => <>{`${row.values.firstName} ${row.values.lastName}`}</>
    },
    {
      Header: '',
      accessor: 'lastName',
      style: {
        display: 'none'
      },
    },
    {
      Header: t("admin.email"),
      accessor: 'email',
      style: {
        width: 300
      }
    },
    {
      Header: t("admin.phone"),
      accessor: 'mobilePhone',
      style: {
        width: 250
      }
    },
    {
      Header: t("admin.status"),
      accessor: 'status',
      style: {
        width: 180
      },
      Cell: ({ row }: Cell) => <Status
        name={row.values.status}
        color={getCustomerStatusBackgroundColorAdmin(row.values.status)}
      />
    },
    {
      Header: '',
      accessor: 'id',
      style: {
        width: '100%'
      },
      Cell: ({ row }: Cell) => <TableOptions
        options={customerOptions}
        selectedRow={row}
      />
    },
  ];

  const onSetPendingCustomerHandler = useCallback((userId: string) => {
    customersService.pendingCustomer(userId);
  }, [customersService]);

  const onBlockCustomerHandler = useCallback((userId: string) => {
    customersService.blockCustomer(userId)
  }, [customersService]);

  const onViewCustomerHandler = useCallback((userId: string) => {
    localStorage.setItem(LS_SELECTED_EDIT_CUSTOMER_ID, userId);
    customerService.selectedCustomerId = userId;
    appService.redirectTo(CUSTOMER_PAGE);
  }, [appService, customerService]);

  const onCreateNewCustomerHandler = useCallback(() => {
    appService.redirectTo(ADD_NEW_CUSTOMER);
  }, [appService])

  const onSearchHandler = useCallback((e: BaseSyntheticEvent) => {
    customersService.reset();
    customersService.search = e.target.value;
    customersService.getCustomersWithFilters();
  }, [customersService])

  const onSearchByStatusHandler = useCallback((status: SelectOption) => {
    customersService.status = status.value;
    customersService.getCustomersWithFilters();
  }, [customersService])

  const onScrollHandler = useCallback(() => {
    customersService.getCustomersWithFiltersOnScroll()
  }, [customersService])

  useEffect(() => {
    customersService.reset();
    customersService.getCustomersWithFilters();
  }, [])

  return (
    <PageWrapper title="Customers" withSidebar>
      <div className="customers" ref={outsideRef}>
        <div className="customers-body">
          <div className="filters">
            <div className="filters-box">
              <SearchInput
                classPrefix="filters-search-input"
                placeholder={t("admin.searchByName")}
                onChangeHandler={onSearchHandler}
                icon={searchIcon}
              />
              <SelectFilter
                classPrefix="filters-dropdown"
                placeholder="All statuses"
                options={customerStatusValues}
                onChangeHandler={(option: SelectOption) => onSearchByStatusHandler(option)}
              />
            </div>
            <Button
              color="primary"
              customizedIcon={<PlusIcon size={15} color="#FFFFFF"/>}
              onClick={onCreateNewCustomerHandler}
            >
              {t("admin.addNewCustomer")}
            </Button>
          </div>
          <ScrollableTable
            columns={columns}
            data={customersService.customers}
            onScrollHandler={onScrollHandler}
            loader={<RoundLoader inContainer={true}/>}
            hasMore={!customersService.isHistoryEndReached}
            scrollBodyHeight={500}
            noDataMessage={<p>{t("admin.sorryThereIsNoCustomersThatMatchesYourRequest")}</p>}
          />
        </div>
      </div>
    </PageWrapper>
  );
})

export default Customers;
