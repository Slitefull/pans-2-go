import React, { BaseSyntheticEvent, useCallback, useEffect } from 'react';
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, CARS_SERVICE, EDIT_CAR_SERVICE } from "@/common/injector/constants";
import { AppService } from "@/common/app/domain/app.service";
import { EDIT_CAR_PAGE, NEW_CAR_PAGE } from "@/common/constants/routes";
import SearchInput from "@/ui-kit/components/filters/search/search.component";
import SelectFilter, { SelectOption } from "@/ui-kit/components/filters/select/select.component";
import { carStatusesValues } from "@/common/constants/options";
import { Button } from "@/ui-kit/components/button/button.component";
import ScrollableTable from "@/ui-kit/components/scrolable-table/scrollable-table.component";
import { EditCarService } from "@/admin/edit-car/domain/edit-car.service";
import RoundLoader from "@/ui-kit/components/loaders/round/round-loader.component";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import PlusIcon from "@/ui-kit/customized-icons/plus/plus.component";
import { Cell } from 'react-table';
import { Map } from "@/ui-kit/components/map/map.component";
import { LS_SELECTED_EDIT_CAR_ID } from "@/common/constants/localStorage";
import StatusSelect from "@/admin/cars/view/components/status-select.component";
import { CarStatuses } from "@/admin/cars/view/constants";

import "./cars.styles.scss"


const Cars = observer(() => {
  const { t } = useTranslation();
  const appService: AppService = injector.get(APP_SERVICE);
  const carsService: CarsService = injector.get(CARS_SERVICE);

  const editCarService: EditCarService = injector.get(EDIT_CAR_SERVICE);

  const columns = [
    {
      Header: '',
      accessor: 'id',
      style: {
        display: 'none',
      },
    },
    {
      Header: t("cars.title"),
      accessor: 'title',
      style: {
        width: '100%',
        whiteSpace: 'pre-wrap',
      },
    },
    {
      Header: t("cars.plate"),
      accessor: 'plateNumber',
      style: {
        width: '100%',
        whiteSpace: 'pre-wrap',
      },
    },
    {
      Header: t("cars.status"),
      accessor: 'status',
      style: {
        width: '100%'
      },
      Cell: ({ row }: Cell) => <StatusSelect
        options={CarStatuses}
        status={row.values.status}
        carId={row.values.id}
      />
    },
  ];

  const onEditCarHandler = useCallback((carId: any) => {
    editCarService.setSelectedCar(carId);
    localStorage.setItem(LS_SELECTED_EDIT_CAR_ID, carId);
    appService.redirectTo(EDIT_CAR_PAGE);
  }, [editCarService, appService])

  const onSearchHandler = useCallback((e: BaseSyntheticEvent) => {
    carsService.searchName = e.target.value;
    carsService.searchPlateNumber = e.target.value;
    carsService.getCarsWithFilters()
  }, [carsService])

  const onChooseCarTypeHandler = useCallback((type: string) => {
    carsService.selectedCarType = type;
    carsService.getCarsWithFilters()
  }, [carsService])

  const onChooseCarStatusHandler = useCallback((status: string) => {
    carsService.selectedStatus = status;
    carsService.getCarsWithFilters()
  }, [carsService])

  const onScrollHandler = useCallback(() => {
    carsService.getCarsWithFiltersOnScroll()
  }, [carsService])

  const onAddNewCarHandler = useCallback(() => {
    appService.redirectTo(NEW_CAR_PAGE)
  }, [appService])

  const carsCategories: Array<SelectOption> = carsService.carsCategories.map((category) => ({
    label: category.title,
    value: category.id,
  }))

  const carsTypes: Array<SelectOption> = [{
    label: "All car types",
    value: null,
  }, ...carsCategories]

  useEffect(() => {
    return () => {
      carsService.reset();
    }
  }, [])

  useEffect(() => {
    carsService.reset();
    carsService.getAllCategories();
    carsService.getCarsWithFilters();
  }, [])

  return (
    <PageWrapper title="Cars" withSidebar>
      <div className="cars">
        <div className="filters">
          <div className="filters-box">
            <SearchInput
              classPrefix="filters-search-input"
              placeholder={t("cars.searchByCarNameOrPlate")}
              onChangeHandler={onSearchHandler}
            />
            <SelectFilter
              classPrefix="filters-dropdown"
              placeholder={t("cars.allCarTypes")}
              options={carsTypes}
              onChangeHandler={(option: SelectOption) => onChooseCarTypeHandler(option.value!)}
            />
            <SelectFilter
              classPrefix="filters-dropdown"
              placeholder={t("cars.allStatuses")}
              options={carStatusesValues(t)}
              onChangeHandler={(option: SelectOption) => onChooseCarStatusHandler(option.value!)}
            />
          </div>
          <Button
            color="primary"
            customizedIcon={<PlusIcon color={"#FFFFFF"} size={18}/>}
            onClick={onAddNewCarHandler}
          >
            {t("cars.addNewCar").toUpperCase()}
          </Button>
        </div>
        <div className="info-tabs">
          <div className="maps">
            <Map
              defaultZoom={10}
              googleMapURL={`${process.env.REACT_APP_GOOGLE_MAP_URL}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
              loadingElement={<div className="loading-element"/>}
              containerElement={<div className="container-element"/>}
              mapElement={<div className="map-element"/>}
              defaultCenter={{
                lat: 40.712776,
                lng: -74.005974,
              }}
              markers={carsService.carsLocations}
            />
          </div>
          <div className="cars-table">
            <ScrollableTable
              columns={columns}
              data={carsService.cars}
              onScrollHandler={onScrollHandler}
              onRowClickHandler={onEditCarHandler}
              loader={<RoundLoader inContainer={true}/>}
              hasMore={!carsService.isHistoryEndReached}
              scrollBodyHeight={400}
              noDataMessage={<p>{t("cars.sorryThereIsNoCarsThatMatchesYourRequest")}</p>}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
})

export default Cars;
