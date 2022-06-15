import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { CARS_SERVICE, RESERVATION_SERVICE } from "@/common/injector/constants";
import AdditionalRequestDropdown
  from "@/ui-kit/components/additional-request-dropdown/additional-request-dropdown.component";
import { DropdownInput } from "@/ui-kit/components/dropdown-input/dropdown-input.component";
import { TextInput } from "@/ui-kit/components/text-input/text-input.component";
import { toJS } from "mobx";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { getFilteredPackages } from "@/common/helpers/getFilteredPackages";
import { useParams } from "react-router-dom";
import CustomDatepicker from "@/ui-kit/components/datepicker/datepicker.component";
import ReservationPackage from "@/admin/create-reservation/view/components/package/package.components";

import "./info.styles.scss";


const Info = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams() as any;
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);
  const carsService: CarsService = injector.get(CARS_SERVICE);

  const carCategories = toJS(carsService.carCategories);
  const cars = toJS(carsService.cars);
  const carList: any[] = [];
  const carCategoriesList: any[] = [];
  const rentTypesList: any[] = [
    { id: 'Daily/Weekly', value: 'Daily/Weekly' },
    { id: 'Hourly/PartialDay', value: 'Hourly/PartialDay' }
  ];
  const areaTypes: any[] = [
    { id: 'NY', value: 'NY' },
    { id: 'outNY', value: 'outNY' },
    { id: 'Brooklyn', value: 'Brooklyn' }
  ];
  const [carLink, setCarLink] = useState<string | undefined>('');
  const [carRentType, setCarRentType] = useState<string | undefined>('');
  const [carCategory, setCarCategory] = useState<string | undefined>('');
  // const [message, setMessage] = useState(
  //   ""
  // );
  // const [range, setRange] = useState(0);
  const [checkStatus, setCheckStatus] = useState(false);
  // const onChangeMessage = (event: BaseSyntheticEvent) => {
  //   setMessage(event.target.value);
  // };

  const onSetPickUpDateHandler = (time: Date) => {
    reservationService.pickUp = time;
  };

  // const onSetPickUpTimeHandler = (e: BaseSyntheticEvent) => {
  //   reservationService.pickUpTime = e.target.value;
  // };

  const onSetDropOffDateHandler = (time: Date) => {
    reservationService.dropOff = time;
  };

  // const onSetDropOffTimeHandler = (e: BaseSyntheticEvent) => {
  //   reservationService.dropOffTime = e.target.value;
  // };

  const onChangeRentType = (value: string) => {
    setCarRentType(reservationService.rentTypePick as any);
    // reservationService.rentTypePick = value as any;
  };

  const onChangeCarCategory = (value: string) => {
    setCarCategory(reservationService.selectedCarType.id);
    //  reservationService.carType = value;
  };

  const onChangeCar = (value: string) => {
    setCarLink(value);
    reservationService.selectedCar = value;
  };

  // const onChangeRange = (value: number) => {
  //   setRange(value);
  // };

  const onChangeStatus = () => {
    switch (reservationService.status) {
      case 'Upcoming': {
        reservationService.updateReservation(id, {
          carId: carLink,
          additionalRequest: toJS(reservationService.selectedAdditionalRequest).length > 0 ? reservationService.selectedAdditionalRequest : null,
          //  distance: range,
          //  comment: message,
          totalPrice: reservationService.totalPrice.fullDay + (!toJS(reservationService.selectedAdditionalRequest).includes('AdditionalDriver') ?
            toJS(reservationService.selectedAdditionalRequest).length * 10 :
            (toJS(reservationService.selectedAdditionalRequest).length - 1) * 10 + 5),
          timeZone: new Date().getTimezoneOffset() / 60,
        });
        break;
      }
      /* case 'Active': {
           reservationService.updateReservation(id, { pickupDateTime: mergedPickUpDateTime });
           break;
       }
       case 'Finished': {
           reservationService.updateReservation(id, { dropOffDateTime: mergedDropOffDateTime });
           break;
       } */
      default:
        break;
    }
  };

  // const mergedPickUpDateTime = mergeDateTime(reservationService.pickUpDate, reservationService.pickUpTime);
  // const mergedDropOffDateTime = mergeDateTime(reservationService.dropOffDate, reservationService.dropOffTime);

  useEffect(() => {
    setCarLink(reservationService?.car?.id)
    reservationService.selectedCar = reservationService?.car?.id;
  }, [reservationService?.car?.id]);

  useEffect(() => {
    setCarRentType(reservationService.rentTypePick as any);
  }, [reservationService.rentTypePick]);

  useEffect(() => {
    setCarCategory(reservationService.selectedCarType.id);
    reservationService.getHourlyPackagesByCategory(reservationService.selectedCarType.id);
  }, [reservationService.selectedCarType]);

  useMemo(() => {
    cars.forEach((car, key) => {
      carList.push({
        id: car.id,
        value: car.title
      });
    });
  }, [cars]);

  useMemo(() => {
    carCategories.forEach((carCategory, key) => {
      carCategoriesList.push({
        id: carCategory.id,
        value: carCategory.title
      });
    });
  }, [carCategories]);

  useEffect(() => {
    if (checkStatus) {
      onChangeStatus();
    }
    setCheckStatus(true);
  }, [reservationService.status]);

  useEffect(() => {
    reservationService.selectedCarType.id = carCategories.find((category) => category.title.split(/\s+/)
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join('') === reservationService.selectedCarType.label)?.id as string;
  }, [carCategories]);

  return (
    <div className="info">
      <div className="block-with-info">
        <div className={'block-with-info__field'}>
          <p className="carsRentTypes__label">
            {t("admin.rentType")}
          </p>
          <DropdownInput disable={true} value={carRentType} onChange={(e: any) => onChangeRentType(e)}
                         placeholder={t("admin.pleaseLinkARentType")} options={rentTypesList}/>
        </div>
      </div>
      <div className="block-with-info">
        <div className={'block-with-info__field'}>
          <p className="carsCategories__label">
            {t("admin.carCategory")}
          </p>
          <DropdownInput disable={true} value={carCategory} onChange={(e: any) => onChangeCarCategory(e)}
                         placeholder={t("admin.pleaseLinkACarCategory")} options={carCategoriesList}/>
        </div>
        <div className={'block-with-info__field'}>
          <p className="carsCategories__label">
            {t("admin.carsList")}
          </p>
          <DropdownInput value={carLink} onChange={(e: any) => onChangeCar(e)} placeholder={t("admin.pleaseLinkACar")}
                         options={carList}/>
        </div>
      </div>
      {/*<VehiclesRadioGroup*/}
      {/*  radioValues={carCategories}*/}
      {/*  label={t("admin.carType")}*/}
      {/*  deactive={true}*/}
      {/*/>*/}
      {/*<div className="pick-up">*/}
      {/*  <div className="pick-up__date">*/}
      {/*    <p className="pick-up__date__label">{t("admin.pickUpDate")}</p>*/}
      {/*    <input*/}
      {/*      type="date"*/}
      {/*      value={reservationService.pickUpDate}*/}
      {/*      className="pick-up__time__picker"*/}
      {/*      onChange={(e) => onSetPickUpDateHandler(e)}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="pick-up__time">*/}
      {/*    <p className="pick-up__time__label">{t("admin.pickUpTime")}</p>*/}
      {/*    <input*/}
      {/*      type="time"*/}
      {/*      value={reservationService.pickUpTime}*/}
      {/*      className="pick-up__time__picker"*/}
      {/*      onChange={(e) => onSetPickUpTimeHandler(e)}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="drop-off">
        <div className="pick-up__date">
          {/*<p className="drop-off__date__label">*/}
          {/*  {t("admin.dropOffDate")}*/}
          {/*</p>*/}
          {/*<input*/}
          {/*  type="date"*/}
          {/*  value={reservationService.dropOffDate}*/}
          {/*  className="drop-off__date__picker"*/}
          {/*  onChange={(e) => onSetDropOffDateHandler(e)}*/}
          {/*/>*/}
          <div className="pick-up__date__picker">
            <CustomDatepicker
              selected={reservationService.pickUp!}
              disabled={true}
              onChangeHandler={(date) => onSetPickUpDateHandler(date!)}
              isShowTimeSelect
              label="Pick up"
            />
          </div>
        </div>
        <div className="drop-off__time">
          {/*<p className="drop-off__time__label">*/}
          {/*  {t("admin.dropOffTime")}*/}
          {/*</p>*/}
          {/*<input*/}
          {/*  type="time"*/}
          {/*  value={reservationService.dropOffTime}*/}
          {/*  className="drop-off__time__picker"*/}
          {/*  onChange={(e) => onSetDropOffTimeHandler(e)}*/}
          {/*/>*/}
          <div className="drop-off__date__picker">
            <CustomDatepicker
              selected={reservationService.dropOff!}
              disabled={true}
              onChangeHandler={(date) => onSetDropOffDateHandler(date!)}
              isShowTimeSelect
              label="Drop off"
            />
          </div>
        </div>
      </div>

      {carRentType === 'Hourly/PartialDay' ? <div className="block-with-info">
        <div className={'block-with-info__field'}>
          <p className="carsCategories__label">
            {t("admin.howFar")}
          </p>
          <DropdownInput disable={true} value={reservationService.area} onChange={(e: any) => {
          }} placeholder={t("admin.howFar")} options={areaTypes}/>
        </div>
        <div className={'block-with-info__field'}>
          <p className="area__label">
            {t("admin.state")}
          </p>
          <TextInput
            value={reservationService.state as string}
            placeholder={t("admin.state")}
            onChange={() => {
            }}
            disabled={true}
            hasError={false}
          />
        </div>
      </div> : ''}

      {carRentType === 'Hourly/PartialDay' ? <div className="block-with-info">
        <div className={'block-with-info__field'}>
          <p className="carsPackages__label">Packages</p>
          <div className="carsPackages__row">
            {getFilteredPackages(reservationService.packages, reservationService.area as any)
              .map((element) => (
                <ReservationPackage
                  hours={element.hours}
                  price={element.price}
                  isSelected={reservationService.package === element.hours}
                  isDisabled={true}
                />
              ))}
          </div>
        </div>
      </div> : ''}

      {/*<div className="block-with-info">*/}
      {/*  <p className="range__label">*/}
      {/*    {t("admin.range")}*/}
      {/*  </p>*/}
      {/*  <RangeSelect max={250} min={5} onChange={onChangeRange} step={5} value={range}/>*/}
      {/*</div>*/}

      {/*<div className="block-with-info">*/}
      {/*  <p className="comment__label">*/}
      {/*    {t("admin.comment")}*/}
      {/*  </p>*/}
      {/*  <TextInput*/}
      {/*    value={message}*/}
      {/*    placeholder={t("admin.startTyping")}*/}
      {/*    onChange={onChangeMessage}*/}
      {/*    hasError={false}*/}
      {/*  />*/}
      {/*</div>*/}

      <AdditionalRequestDropdown
        options={reservationService.allAdditionalRequests}
        selectedOptions={reservationService.selectedAdditionalRequest}
        disabled={true}
        label={t("admin.additionalRequests")}
      />
    </div>
  )
});

export default Info;
