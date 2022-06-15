import React, { FC, useCallback, useEffect } from 'react';
import { observer } from "mobx-react";
import CustomSelect from "@/ui-kit/components/select/select.component";
import { RentTypesSelectValues } from '../../constants/rent-types';
import { injector } from "@/common/injector/Injector";
import { ADD_NEW_RESERVATION_BY_ADMIN_SERVICE, CARS_SERVICE } from "@/common/injector/constants";
import { NewReservationByAdminService } from "@/admin/create-reservation/domain/create-reservation.service";
import { RentTypes } from "@/common/constants/rentTypes";
import { BodyTypes } from "@/common/constants/bodyTypes";
import CustomDatepicker from "@/ui-kit/components/datepicker/datepicker.component";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { CarCategory } from "@/admin/cars/api/dto/cars.dto";
import { StatesData } from "@/client/view/reserve-now/desktop/const/states-const";
import CustomAutocomplete from "@/ui-kit/components/autocomplete/autocomplete.component";
import ReservationPackage from "@/admin/create-reservation/view/components/package/package.components";
import ReservationAdditionalRequest
  from "@/admin/create-reservation/view/components/additional-request/additional-request.component";
import { newReservationByAdminAdditionalRequests } from "@/admin/create-reservation/view/constants/additional-requests";
import { AdditionalRequestValues } from "@/common/constants/additionalRequests";
import { arrayRemove } from "@/common/helpers/arrayRemove.helper";
import { BaseCar } from "@/common/car/api/dto/car.dto";
import { getFilteredPackages } from "@/common/helpers/getFilteredPackages";
import { AllowedAreasSelectValues, AllowedAreasTitles, AllowedAreasValues } from "@/common/constants/allowedAreas";

import "./main-form.styles.scss";


interface SelectOption<L = string, V = string> {
  label: L;
  value: V;
}

type CarCategorySelect = Pick<CarCategory, "id" | "title">

const MainForm: FC = observer((): JSX.Element => {
  const carsService: CarsService = injector.get(CARS_SERVICE);
  const newReservationService: NewReservationByAdminService = injector.get(ADD_NEW_RESERVATION_BY_ADMIN_SERVICE);

  const convertedCars: Array<SelectOption> = carsService.cars
    .map((car: BaseCar) => ({
      label: car.title,
      value: car.id,
    }))

  const convertedCarCategories: Array<SelectOption<BodyTypes, CarCategorySelect>> = carsService.carCategories
    .map((category: CarCategory) => ({
      label: category.title,
      value: {
        title: category.title,
        id: category.id,
      },
    }))

  const defaultRentType: SelectOption<RentTypes, RentTypes> = {
    label: newReservationService.selectedRentType,
    value: newReservationService.selectedRentType,
  }

  const defaultCarType: SelectOption<BodyTypes, CarCategorySelect> = {
    label: convertedCarCategories[0]?.label,
    value: convertedCarCategories[0]?.value,
  }

  const defaultArea: SelectOption<AllowedAreasTitles, AllowedAreasValues> = {
    label: AllowedAreasTitles.Brooklyn,
    value: AllowedAreasValues.Brooklyn,
  }

  const isDisabledPlaceSelect = newReservationService.area === AllowedAreasValues.Brooklyn || newReservationService.area === AllowedAreasValues.NY;

  const onChangeRentTypeHandler = useCallback((rentType: RentTypes) => {
    newReservationService.selectedRentType = rentType;
    newReservationService.resetRentType();
  }, [newReservationService])

  const onChangeCarTypeHandler = useCallback((carType: CarCategorySelect) => {
    newReservationService.selectedCarType = carType.title;
    newReservationService.selectedCarCategory = carType.id;
  }, [newReservationService])

  const onChangePickUpHandler = useCallback((time: Date) => {
    newReservationService.pickUp = time;
  }, [newReservationService])

  const onChangeDropOffHandler = useCallback((time: Date) => {
    newReservationService.dropOff = time;
    newReservationService.isTouchedDate = true;
  }, [newReservationService])

  const onChangeAreaHandler = useCallback((area: AllowedAreasValues) => {
    newReservationService.area = area;
  }, [newReservationService])

  const onChangeCarHandler = useCallback((carId: string) => {
    newReservationService.selectedCar = carId;
  }, [newReservationService])

  const onChangePlaceHandler = useCallback((place: string) => {
    newReservationService.place = place;
  }, [newReservationService])

  const onCheckAdditionalRequestHandler = useCallback((additionalRequest: AdditionalRequestValues) => {
    if (newReservationService.selectedAdditionalRequests.includes(additionalRequest)) {
      newReservationService.selectedAdditionalRequests = arrayRemove(newReservationService.selectedAdditionalRequests, additionalRequest)
    } else {
      newReservationService.selectedAdditionalRequests.push(additionalRequest);
    }
  }, [newReservationService])

  const onClearTimeHandler = useCallback(() => {
    newReservationService.dropOff = null;
    newReservationService.dropOffWithPackage = null;
    newReservationService.isTouchedDate = false;
    newReservationService.resetSummary();
  }, [newReservationService])

  const onClearPackageHandler = useCallback(() => {
    newReservationService.selectedPackage = null;
    newReservationService.dropOff = null;
    newReservationService.dropOffWithPackage = null;
    newReservationService.resetSummary();
  }, [newReservationService])

  useEffect(() => {
    if (newReservationService.selectedCarType) {
      newReservationService.getHourlyPackagesByCategory(newReservationService.selectedCarCategory!);
    }
  }, [newReservationService.selectedCarType])

  useEffect(() => {
    carsService.getCarsByCategory(newReservationService.selectedCarCategory ? newReservationService.selectedCarCategory : defaultCarType.value.id)
  }, [newReservationService.selectedCarCategory]);

  useEffect(() => {
    if (!newReservationService.pickUp) {
      newReservationService.pickUp = new Date();
    }
    if (!newReservationService.dropOff) {
      newReservationService.dropOff = new Date();
    }
  }, [])

  return (
    <div className="main-form">
      <div className="elements-wrapper">
        <CustomSelect
          className="rent-type"
          options={RentTypesSelectValues}
          onChange={(rentType: RentTypes) => onChangeRentTypeHandler(rentType)}
          defaultValue={defaultRentType}
          label="Rent type"
        />
      </div>

      <div className="elements-wrapper">
        <CustomSelect
          options={convertedCarCategories}
          onChange={(carType: CarCategorySelect) => onChangeCarTypeHandler(carType)}
          defaultValue={defaultCarType}
          label="Car type"
        />
        <CustomSelect
          options={convertedCars}
          onChange={(carId: string) => onChangeCarHandler(carId)}
          label="Car booked"
        />
      </div>

      <div className="elements-wrapper">
        <CustomDatepicker
          selected={newReservationService.pickUp!}
          onChangeHandler={(date) => onChangePickUpHandler(date!)}
          isShowTimeSelect
          label="Pick up"
        />
        <CustomDatepicker
          selected={newReservationService.dropOffWithPackage
            ? newReservationService.dropOffWithPackage
            : newReservationService.dropOff
          }
          isShowTimeSelect={true}
          disabled={!!newReservationService.selectedPackage}
          placeholderText={newReservationService.selectedRentType === RentTypes.HOURLY_PARTIAL ? "Select package or time" : "Select time"}
          onChangeHandler={(date) => onChangeDropOffHandler(date!)}
          label="Drop off"
        />
        {newReservationService.isTouchedDate && (
          <p
            className="clear-button"
            onClick={onClearTimeHandler}
          >
            Clear
          </p>
        )}
      </div>

      {newReservationService.selectedRentType === RentTypes.HOURLY_PARTIAL && (
        <>
          <div className="elements-wrapper">
            <CustomSelect
              options={AllowedAreasSelectValues}
              onChange={onChangeAreaHandler}
              defaultValue={defaultArea}
              label="How far?"
            />
            <CustomAutocomplete
              items={StatesData()}
              value={newReservationService.place}
              onChangeHandler={onChangePlaceHandler}
              isDisabled={isDisabledPlaceSelect}
              placeholder="State, city"
              label="Place"
              withoutZIndex={true}
            />
          </div>

          <div className="elements-wrapper flex-start column">
            <p className="section-title">Packages</p>
            <div className="row">
              {getFilteredPackages(newReservationService.packages, newReservationService.area)
                .map((element) => (
                  <ReservationPackage
                    hours={element.hours}
                    price={element.price}
                    isSelected={newReservationService.selectedPackage === element.hours}
                    isDisabled={newReservationService.selectedPackage === element.hours}
                  />
                ))}
            </div>
            {newReservationService.selectedPackage && (
              <p
                className="clear-button"
                onClick={onClearPackageHandler}
              >
                Clear
              </p>
            )}
          </div>
        </>
      )}

      <div className="elements-wrapper column">
        <p className="section-title">Do you need an additional requests?</p>
        {newReservationByAdminAdditionalRequests(newReservationService).map((request) => (
          <ReservationAdditionalRequest
            title={request.title}
            price={request.price}
            isChecked={request.isChecked}
            onCheckHandler={() => onCheckAdditionalRequestHandler(request.value)}
          />
        ))}
      </div>
    </div>
  );
});

export default MainForm;
