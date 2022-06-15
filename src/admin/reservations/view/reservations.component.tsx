import React, { BaseSyntheticEvent, FC, useCallback, useEffect } from 'react';
import FilterTabs from "@/ui-kit/components/filters/tabs/tabs.components";
import { History } from "history";
import { ReservationsService } from "@/admin/reservations/domain/reservations.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, HISTORY, RESERVATIONS_SERVICE } from "@/common/injector/constants";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import PlusIcon from "@/ui-kit/customized-icons/plus/plus.component";
import moment from "moment";
import SearchInput from "@/ui-kit/components/filters/search/search.component";
import searchIcon from "@/ui-kit/icons/search.svg";
import SelectFilter, { SelectOption } from "@/ui-kit/components/filters/select/select.component";
import { allTimesRanges, carTypesValues } from "@/common/constants/options";
import { Button } from "@/ui-kit/components/button/button.component";
import ScrollableTable from "@/ui-kit/components/scrolable-table/scrollable-table.component";
import RoundLoader from "@/ui-kit/components/loaders/round/round-loader.component";
import { AppService } from "@/common/app/domain/app.service";
import { NEW_RESERVATION } from "@/common/constants/routes";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { Cell } from "react-table";
import Status from "@/ui-kit/components/status/status.component";
import getStatusBackgroundColor from "@/common/helpers/getStatusBackgroundColor.helper";
import TableOptions from "@/ui-kit/components/scrolable-table/options/options.component";
import { ReservationStatuses } from "@/common/constants/reservationStatuses";
import getInvertedSort from "@/common/helpers/getInvertedSort.helper";

import "./reservations.styles.scss";


interface ReservationOption {
  key: string,
  label: string,
  handler: (reservationId: string) => void,
}

interface FilterTabsOption {
  key: string,
  name: string,
  count: number,
}

const Reservations: FC = observer(() => {
  const { t } = useTranslation();

  const history: History = injector.get(HISTORY);
  const appService: AppService = injector.get(APP_SERVICE);
  const reservationsService: ReservationsService = injector.get(RESERVATIONS_SERVICE);

  const reservationOptions: Array<ReservationOption> = [
    {
      key: 'view',
      label: 'View',
      handler: (id: string) => history.push(`/reservation/${id}`),
    },
    {
      key: 'reject',
      label: 'Reject',
      handler: (id) => reservationsService.changeReservationStatus({
        id,
        status: ReservationStatuses.Rejected
      }),
    },
    {
      key: 'approve',
      label: 'Approve',
      handler: (id) => reservationsService.changeReservationStatus({
        id,
        status: ReservationStatuses.Approved
      }),
    }
  ]

  const reservationOptionsCancel: Array<ReservationOption> = [
    {
      key: 'view',
      label: 'View',
      handler: (id: string) => history.push(`/reservation/${id}`),
    },
    {
      key: 'cancel',
      label: 'Cancel',
      handler: (id) => reservationsService.changeReservationStatus({
        id,
        status: ReservationStatuses.Cancelled
      }),
    }
  ]

  const reservationOptionsView: Array<ReservationOption> = [
    {
      key: 'view',
      label: 'View',
      handler: (id: string) => history.push(`/reservation/${id}`),
    }
  ]

  const filterTabsOptions: Array<FilterTabsOption> = [
    {
      key: "New",
      name: t("admin.new"),
      count: reservationsService.statusesCount?.new!,
    },
    {
      key: "Approved",
      name: t("admin.approved"),
      count: reservationsService.statusesCount?.approved!,
    },
    {
      key: "Upcoming",
      name: t("admin.upcoming"),
      count: reservationsService.statusesCount?.upcoming!,
    },
    {
      key: "Active",
      name: t("admin.active"),
      count: reservationsService.statusesCount?.active!,
    },
    {
      key: "Past",
      name: t("admin.past"),
      count: reservationsService.statusesCount?.past!,
    },
    {
      key: "Rejected",
      name: t("admin.rejected"),
      count: reservationsService.statusesCount?.rejected!,
    },
    {
      key: "Cancelled",
      name: t("admin.cancelled"),
      count: reservationsService.statusesCount?.cancelled!,
    },
  ]

  const onSortHandler = useCallback((sortBy: string, desc: string) => {
    reservationsService.reset();
    reservationsService.sortBy = sortBy;
    reservationsService.desc = desc;
    reservationsService.getReservationsWithFilters()
  }, [reservationsService])

  const columns = [
    {
      Header: t("admin.id"),
      accessor: 'number',
      sortByHandler: () => onSortHandler('number', getInvertedSort(reservationsService.desc!)),
      style: {
        width: '40%',
      },
    },
    {
      Header: t("admin.customerName"),
      accessor: 'user',
      sortByHandler: () => onSortHandler('customerName', getInvertedSort(reservationsService.desc!)),
      style: {
        width: '100%'
      },
      Cell: ({ row }: Cell) => <div>{`${row.values.user.firstName} ${row.values.user.lastName}`}</div>
    },
    {
      Header: t("admin.pickUpTime"),
      accessor: 'pickupDateTime',
      sortByHandler: () => onSortHandler('pickupDateTime', getInvertedSort(reservationsService.desc!)),
      style: {
        width: '100%'
      },
      Cell: ({ row }: Cell) => moment(row.values.pickupDateTime).format('LL h:mm a')
    },
    {
      Header: "Package",
      accessor: 'package',
      style: {
        width: '100%'
      },
    },
    {
      Header: t("admin.carType"),
      accessor: 'carType',
      sortByHandler: () => onSortHandler('carType', getInvertedSort(reservationsService.desc!)),
      style: {
        width: '100%'
      },
    },
    {
      Header: t("admin.status"),
      accessor: 'status',
      sortByHandler: () => onSortHandler('status', getInvertedSort(reservationsService.desc!)),
      style: {
        width: '100%'
      },
      Cell: ({ row }: Cell) => <Status
        name={row.values.status}
        color={getStatusBackgroundColor(row.values.status)}
      />
    },
    {
      Header: '',
      accessor: 'id',
      style: {
        width: '100%'
      },
      Cell: ({ row }: Cell) => <TableOptions
        options={row.values.status === 'New' ? reservationOptions : row.values.status === 'Upcoming' || row.values.status === 'Approved' ? reservationOptionsCancel : reservationOptionsView}
        selectedRow={row}
      />
    },
  ];

  const onChooseFilterHandler = useCallback((selectedFilter: string) => {
    reservationsService.reset();
    reservationsService.selectedFilterTab = selectedFilter;
    reservationsService.status = selectedFilter;
    reservationsService.getReservationsWithFilters()
  }, [reservationsService])

  const onSearchHandler = useCallback((e: BaseSyntheticEvent) => {
    reservationsService.reset();
    reservationsService.customerName = e.target.value;
    reservationsService.getReservationsWithFilters()
  }, [reservationsService])

  const onChooseReservationTypeHandler = useCallback((type: string) => {
    reservationsService.reset();
    reservationsService.carType = type;
    reservationsService.getReservationsWithFilters()
  }, [reservationsService])

  const onChooseReservationsTimeRangeHandler = useCallback((time: string) => {
    reservationsService.reset();
    reservationsService.pickUpTime = time;
    reservationsService.getReservationsWithFilters()
  }, [reservationsService])

  const onScrollHandler = useCallback(() => {
    reservationsService.getReservationsWithFiltersOnScroll()
  }, [reservationsService])

  const onCreateReservationHandler = useCallback(() => {
    appService.redirectTo(NEW_RESERVATION);
  }, [appService])

  useEffect(() => {
    reservationsService.reset();
    reservationsService.getReservationsWithFilters();
    reservationsService.getReservationsStatusesCount();
  }, [])

  return (
    <PageWrapper title="Reservations" withSidebar>
      <div className="reservations">
        <FilterTabs
          options={filterTabsOptions}
          selectedFilter={reservationsService.selectedFilterTab}
          onChooseFilterHandler={onChooseFilterHandler}
        />
        <div className="reservations-body">
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
                placeholder={t("admin.allCarTypes")}
                options={carTypesValues(t)}
                onChangeHandler={(option: SelectOption) => onChooseReservationTypeHandler(option.value!)}
              />
              <SelectFilter
                classPrefix="filters-dropdown"
                placeholder={t("admin.allTimesRange")}
                options={allTimesRanges}
                onChangeHandler={(option: SelectOption) => onChooseReservationsTimeRangeHandler(option.value!)}
              />
            </div>
            <Button
              color="primary"
              customizedIcon={<PlusIcon size={15} color="#FFFFFF"/>}
              onClick={onCreateReservationHandler}
            >
              {t("admin.createReservation")}
            </Button>
          </div>
          <ScrollableTable
            columns={columns}
            data={reservationsService.reservations}
            onScrollHandler={onScrollHandler}
            loader={<RoundLoader inContainer={true}/>}
            hasMore={!reservationsService.isHistoryEndReached}
            scrollBodyHeight={500}
            noDataMessage={<p>{t("admin.sorryThereIsNoReservationsThatMatchesYourRequest")}</p>}
          />
        </div>
      </div>
    </PageWrapper>
  );
})

export default Reservations;
