import React, { FC, useCallback, useEffect } from 'react';
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Map } from "@/ui-kit/components/map/map.component";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { injector } from "@/common/injector/Injector";
import { CARS_SERVICE, EDIT_CAR_SERVICE } from "@/common/injector/constants";
import { EditCarService } from "@/admin/edit-car/domain/edit-car.service";
import { FormsCustomSelect } from "@/ui-kit/components/forms/select/custom-select.component";
import { FormsCustomDatepicker } from "@/ui-kit/components/forms/datepicker/custom-datepicker.component";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { Control, DefaultValues, FieldErrors } from "react-hook-form";
import { CoverageTypesValues, createNewCarYearOptions, fuelTypesValues, StateValues } from "@/common/constants/options";
import generalInfoIcon from '../../../../../ui-kit/icons/edit-page/general-info.svg';
import specificationIcon from '../../../../../ui-kit/icons/edit-page/specification.svg';
import insuranceIcon from '../../../../../ui-kit/icons/edit-page/insurance.svg';
import registrationIcon from '../../../../../ui-kit/icons/edit-page/registration.svg';
import serviceInspectionIcon from '../../../../../ui-kit/icons/edit-page/service-inspection.svg';
import {
  FilesDropzoneUploaderMinimized
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";

import "./info-tab.styles.scss";


const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_FILES_COUNT = 1;
const ACCEPT_FILE_TYPES = 'image/jpeg, image/png, image/jpg';

interface InfoTabProps {
  defaultValues: DefaultValues<any>;
  control: Control<any>;
  reset: any;
  errors: FieldErrors<any>;
}

const InfoTab: FC<InfoTabProps> = observer((
  {
    defaultValues,
    control,
    reset,
    errors,
  }
): JSX.Element => {
  const { t } = useTranslation();

  const carsService: CarsService = injector.get(CARS_SERVICE);
  const editCarService: EditCarService = injector.get(EDIT_CAR_SERVICE);

  const convertedCarMakes = carsService.carMakes.map((carMake) => ({
    label: carMake.title,
    value: carMake.id,
  }))

  const convertedCarsCategories = carsService.carsCategories.map((carCategories) => ({
    label: carCategories.title,
    value: carCategories.id,
  }))

  const defaultFuelType = {
    label: defaultValues.fuelType!,
    value: defaultValues.fuelType!
  };

  const defaultYear = {
    label: new Date(editCarService.selectedCar?.year!).getFullYear()!,
    value: new Date(editCarService.selectedCar?.year!).getFullYear()!,
  };

  const defaultCoverage = {
    label: defaultValues.insurance.coverage!,
    value: defaultValues.insurance.coverage!,
  };

  const defaultState = {
    label: defaultValues.registration.state!,
    value: defaultValues.registration.state!
  };

  const selectedCarMake = {
    label: editCarService.selectedCar?.make.title!,
    value: defaultValues.makeId!
  };

  const selectedCategory = {
    label: editCarService.selectedCar?.category.title!,
    value: defaultValues.categoryId!,
  };

  const onSetInsuranceImageHandler = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: editCarService.createInsuranceMedia.bind(editCarService),
    })
  }, [editCarService]);

  const onSetRegistrationImageHandler = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: editCarService.createRegistrationMedia.bind(editCarService),
    })
  }, [editCarService]);

  const onSetServiceInspectionImageHandler = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: editCarService.createServiceInspectionMedia.bind(editCarService),
    })
  }, [editCarService]);

  const onRemoveInsuranceImageHandler = useCallback(() => editCarService.removeInsuranceMedia(), [editCarService]);
  const onRemoveRegistrationImageHandler = useCallback(() => editCarService.removeRegistrationMedia(), [editCarService]);
  const onRemoveServiceInspectionImageHandler = useCallback(() => editCarService.removeServiceInspectionMedia(), [editCarService]);

  useEffect(() => {
    reset(defaultValues)
    if (editCarService.selectedCar?.media) editCarService.carPhotoMedia = [editCarService.selectedCar.media];
    editCarService.insuranceMedia = [editCarService.selectedCar!.insurance.media];
    editCarService.registrationMedia = [editCarService.selectedCar!.registration.media];
    editCarService.serviceInspectionMedia = [editCarService.selectedCar!.serviceInspection.media];
  }, [editCarService.selectedCar?.id])

  useEffect(() => {
    carsService.getAllCarMakes();
    carsService.getAllCategories();
  }, [])

  return (
    <div className="info-tab">
      <div className="car-location">
        <p className="title">
          {t("admin.carLocation")}
        </p>
        {editCarService.selectedCar?.location && <Map
          defaultZoom={10}
          googleMapURL={`${process.env.REACT_APP_GOOGLE_MAP_URL}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
          loadingElement={<div className="loading-element"/>}
          containerElement={<div className="container-element"/>}
          mapElement={<div className="map-element"/>}
          defaultCenter={{
            lat: editCarService.selectedCar?.location?.latitude!,
            lng: editCarService.selectedCar?.location?.longitude!,
          }}
          markers={[{
            latitude: editCarService.selectedCar?.location?.latitude!,
            longitude: editCarService.selectedCar?.location?.longitude!,
          }]}
        />}
      </div>

      <form className="info-tab-form">
        <section className="general-info">
          <div className="title">
            <img
              className="title-icon"
              src={generalInfoIcon}
              alt="General Info"
            />
            {t("admin.generalInfo")}
          </div>
          <div className="car-title">
            <FormsTextInput
              name="title"
              control={control}
              label={t("admin.title")}
              placeholder={t("admin.title")}
              error={errors.title?.message}
              type="text"
            />
          </div>
          <div className="plate">
            <FormsTextInput
              name="plateNumber"
              control={control}
              label={t("admin.plateNumber")}
              placeholder={t("admin.plateNumber")}
              error={errors.plateNumber?.message}
              type="text"
            />
          </div>
          <div className="vin">
            <FormsTextInput
              name="VIN"
              control={control}
              label={t("admin.vin")}
              placeholder={t("admin.vin")}
              error={errors.VIN?.message}
              type="text"
            />
          </div>
        </section>

        <section className="specification">
          <div className="title">
            <img
              className="title-icon"
              src={specificationIcon}
              alt="Specification"
            />
            {t("admin.specification")}
          </div>
          <div className="make">
            <FormsCustomSelect
              name="makeId"
              options={convertedCarMakes}
              control={control}
              defaultValue={editCarService.selectedCar?.make.id ? selectedCarMake : undefined}
              label={t("admin.make")}
            />
          </div>
          <div className="body-type">
            <FormsCustomSelect
              name="categoryId"
              options={convertedCarsCategories}
              control={control}
              defaultValue={editCarService.selectedCar?.category.id ? selectedCategory : undefined}
              label={t("admin.bodyType")}
            />
          </div>
          <div className="fuel-type">
            <FormsCustomSelect
              name="fuelType"
              options={fuelTypesValues}
              control={control}
              defaultValue={editCarService.selectedCar?.fuelType ? defaultFuelType : undefined}
              label={t("admin.fuelType")}
            />
          </div>
          <div className="model">
            <FormsTextInput
              name="model"
              control={control}
              label={t("admin.model")}
              placeholder={t("admin.model")}
              error={errors.model?.message}
              type="text"
            />
          </div>
          <div className="year">
            <FormsCustomSelect
              name="year"
              options={createNewCarYearOptions}
              defaultValue={editCarService.selectedCar?.year ? defaultYear : undefined}
              control={control}
              label={t("admin.year")}
            />
          </div>
          <div className="doors">
            <FormsTextInput
              name="doors"
              control={control}
              label={t("admin.doors")}
              placeholder={t("admin.doors")}
              error={errors.doors?.message}
              type="text"
            />
          </div>
          <div className="seats">
            <FormsTextInput
              name="seats"
              control={control}
              label={t("admin.seats")}
              placeholder={t("admin.seats")}
              error={errors.seats?.message}
              type="text"
            />
          </div>
          <div className="color">
            <FormsTextInput
              name="color"
              control={control}
              label={t("admin.color")}
              placeholder={t("admin.color")}
              error={errors.color?.message}
              type="text"
            />
          </div>
        </section>

        <section className="insurance">
          <div className="title">
            <img
              className="title-icon"
              src={insuranceIcon}
              alt="Insurance"
            />
            {t("admin.insurance")}
          </div>
          <div className="coverage">
            <FormsCustomSelect
              name="insurance.coverage"
              options={CoverageTypesValues}
              defaultValue={editCarService.selectedCar?.insurance.coverage ? defaultCoverage : undefined}
              control={control}
              className="coverage"
              label={t("admin.coverage")}
            />
          </div>
          <div className="policy-number">
            <FormsTextInput
              name="insurance.policyNumbers"
              control={control}
              label={t("admin.policyNumber")}
              placeholder={t("admin.policyNumber")}
              error={errors.insurance?.policyNumbers?.message}
              type="text"
            />
          </div>
          <div className="exp-date">
            <FormsCustomDatepicker
              name="insurance.expDate"
              control={control}
              label={t("admin.expDate")}
              error={errors.insurance?.expDate?.message}
            />
          </div>
          <div className="uploader">
            <FilesDropzoneUploaderMinimized
              label={t("admin.uploadScanCopyFile")}
              onDeleteHandler={onRemoveInsuranceImageHandler}
              defaultFiles={editCarService.insuranceMedia}
              options={{
                onDrop: onSetInsuranceImageHandler,
                maxSize: MAX_FILE_SIZE,
                maxFiles: MAX_FILES_COUNT,
                accept: ACCEPT_FILE_TYPES,
              }}
            />
          </div>
        </section>

        <section className="registration">
          <div className="title">
            <img
              className="title-icon"
              src={registrationIcon}
              alt="Registration"
            />
            {t("admin.registration")}
          </div>
          <div className="exp-date">
            <FormsCustomDatepicker
              name="registration.expDate"
              control={control}
              label={t("admin.expDate")}
              error={errors.registration?.expDate?.message}
            />
          </div>
          <div className="uploader">
            <FilesDropzoneUploaderMinimized
              label={t("admin.uploadScanCopyFile")}
              onDeleteHandler={onRemoveRegistrationImageHandler}
              defaultFiles={editCarService.registrationMedia}
              options={{
                onDrop: onSetRegistrationImageHandler,
                maxSize: MAX_FILE_SIZE,
                maxFiles: MAX_FILES_COUNT,
                accept: ACCEPT_FILE_TYPES,
              }}
            />
          </div>
          <div className="place">
            <FormsCustomSelect
              name="registration.state"
              className="place"
              defaultValue={editCarService.selectedCar?.registration.state ? defaultState : undefined}
              options={StateValues}
              control={control}
              label={t("admin.state")}
            />
          </div>
        </section>

        <section className="service-inspection">
          <div className="title">
            <img
              className="title-icon"
              src={serviceInspectionIcon}
              alt="Service Inspection"
            />
            {t("admin.serviceInspection")}
          </div>
          <div className="exp-date">
            <FormsCustomDatepicker
              name="serviceInspection.expDate"
              control={control}
              label={t("admin.expDate")}
              error={errors.serviceInspection?.expDate?.message}
            />
          </div>
          <div className="uploader">
            <FilesDropzoneUploaderMinimized
              label={t("admin.uploadScanCopyFile")}
              onDeleteHandler={onRemoveServiceInspectionImageHandler}
              defaultFiles={editCarService.serviceInspectionMedia}
              options={{
                onDrop: onSetServiceInspectionImageHandler,
                maxSize: MAX_FILE_SIZE,
                maxFiles: MAX_FILES_COUNT,
                accept: ACCEPT_FILE_TYPES,
              }}
            />
          </div>
          <div className="last-inspection-date">
            <FormsCustomDatepicker
              name="serviceInspection.lastInspectionDate"
              control={control}
              label={t("admin.lastInspectionDate")}
              error={errors.serviceInspection?.lastInspectionDate?.message}
            />
          </div>
        </section>
      </form>
    </div>
  );
});

export default InfoTab;
