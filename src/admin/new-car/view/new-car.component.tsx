import React, { FC, useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/ui-kit/components/button/button.component";
import { NewCarService } from "@/admin/new-car/domain/new-car.service";
import { injector } from "@/common/injector/Injector";
import { CARS_SERVICE, HISTORY, NEW_CAR_SERVICE } from "@/common/injector/constants";
import { CARS_PAGE } from "@/common/constants/routes";
import { FuelTypes } from "@/common/constants/fuelTypes";
import { CarStatusesTypes } from "@/common/constants/carStatuses";
import { History } from "history";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { CustomSelectOption } from "@/ui-kit/components/forms/select/custom-select.component";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { limitedString, maxDate, minDate, requiredNumber } from "@/ui-kit/helpers/validators";
import { createImageUrl } from "@/common/helpers/createImageUrl.helper";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { createNewCarYearOptions } from "@/common/constants/options";
import Specification from "@/admin/new-car/view/specification/specification.component";
import DeviceKeyModal from "@/admin/new-car/view/deviceKeyModal/deviceKeyModal.component";
import Insurance from "./insurance/insurance.component";
import Registration from "./registration/registration.component";
import ServiceInspection from "./service-inspection/service-inspection.component";
import {
  FilesDropzoneUploader,
  ImagePreview
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";

import "./new-car.styles.scss";


export interface NewCarValues {
  title: string;
  VIN: string;
  plateNumber: string;
  makeId: string;
  categoryId: string;
  model: string;
  year: string | null;
  deviceKey: string;
  fuelType: FuelTypes;
  doors: string;
  seats: string;
  color: string;
  status: CarStatusesTypes;
  insurance: Insurance;
  registration: Registration;
  serviceInspection: ServiceInspection;
}

interface Insurance {
  policyNumbers: string;
  coverage: string;
  expDate: string;
  mediaId: string;
}

interface Registration {
  state: string;
  expDate: string;
  mediaId: string;
}

interface ServiceInspection {
  lastInspectionDate: string;
  expDate: string;
  mediaId: string;
}

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_FILES_COUNT = 1;

const NewCar: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const history: History = injector.get(HISTORY);
  const carsService: CarsService = injector.get(CARS_SERVICE);
  const newCarService: NewCarService = injector.get(NEW_CAR_SERVICE);

  const insuranceMediaId = newCarService.insuranceMedia[0]?.id;
  const registrationMediaId = newCarService.registrationMedia[0]?.id;
  const serviceInspectionMediaId = newCarService.serviceInspectionMedia[0]?.id;

  const carDM = newCarService.selectedCarDM;

  const isDisabledField: boolean = (!newCarService.isAddedDeviceKey);

  const convertedCarMakes = carsService.carMakes.map((carMake) => ({
    label: carMake.title,
    value: carMake.id,
  }))

  const convertedCarsCategories = carsService.carsCategories.map((carCategories) => ({
    label: carCategories.title,
    value: carCategories.id,
  }))

  const makeIdDM: CustomSelectOption | undefined = convertedCarMakes
    .find((category) => category.label === carDM?.vehicle_make);

  const deviceKeyMask = '***********';

  const validationSchema = yup.object().shape({
    title: limitedString(t, { maxLength: 100 }, true),
    VIN: limitedString(t, { maxLength: 17 }, true),
    plateNumber: limitedString(t, { maxLength: 10 }, true),
    makeId: limitedString(t, { maxLength: 100 }, true),
    categoryId: limitedString(t, { maxLength: 100 }, true),
    model: limitedString(t, { maxLength: 100 }, true),
    fuelType: limitedString(t, { maxLength: 100 }, true),
    year: requiredNumber(t, {
      maxLength: 10,
      validationMessage: t("ui-kit.you-can-use-only-digits-in-this-field"),
      required: true,
    }),
    doors: requiredNumber(t, {
      maxLength: 1,
      validationMessage: t("ui-kit.you-can-use-only-digits-in-this-field"),
      required: true,
    }),
    seats: requiredNumber(t, {
      maxLength: 1,
      validationMessage: t("ui-kit.you-can-use-only-digits-in-this-field"),
      required: true,
    }),
    color: limitedString(t, { maxLength: 40 }, true),
    status: limitedString(t, { maxLength: 40 }, false),
    insurance: yup.object().shape({
      coverage: limitedString(t, { maxLength: 100 }, false),
      policyNumbers: requiredNumber(t, {
        maxLength: 20,
        validationMessage: t("ui-kit.you-can-use-only-digits-in-this-field"),
        required: false
      }),
      expDate: maxDate(t, {
        biggerThan: new Date(),
        validationMessage: t("admin.expirationDateMustBeLaterThanNow")
      }),
    }),
    registration: yup.object().shape({
      expDate: maxDate(t, {
        biggerThan: new Date(),
        validationMessage: t("admin.expirationDateMustBeLaterThanNow")
      }),
    }),
    serviceInspection: yup.object().shape({
      lastInspectionDate: minDate(t, {
        lessThan: new Date(),
        validationMessage: t("admin.lastInspectionDateMustBeEarlierThanNow"),
      }),
      expDate: maxDate(t, {
        biggerThan: new Date(),
        validationMessage: t("admin.expirationDateMustBeLaterThanNow")
      }),
    })
  })

  const defaultValues = {
    imageUrl: carDM?.image,
    title: carDM?.vehicle_name,
    VIN: carDM?.vin,
    plateNumber: carDM?.vehicle_license_plate,
    makeId: makeIdDM?.value,
    model: carDM?.vehicle_model,
    deviceKey: newCarService.deviceKey,
    year: (carDM && carDM.vehicle_year) ? carDM?.vehicle_year.toString() : null,
  }

  const defaultYear = createNewCarYearOptions.find((el) => {
    if (carDM && carDM.vehicle_year) return el.value === carDM?.vehicle_year.toString();
    return '';
  })
  const defaultMake = convertedCarMakes.find((el) => el.label === carDM?.vehicle_make)

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<NewCarValues>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const watchDeviceKey = watch("deviceKey");

  const onSetInsuranceImageHandler = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: newCarService.createInsuranceMedia.bind(newCarService),
    })
  }, [newCarService]);

  const onSetRegistrationImageHandler = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: newCarService.createRegistrationMedia.bind(newCarService),
    })
  }, [newCarService]);

  const onSetServiceInspectionImageHandler = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: newCarService.createServiceInspectionMedia.bind(newCarService),
    })
  }, [newCarService]);

  const removeCarPhotoHandler = useCallback(() => newCarService.removeCarPhotoMedia(), [newCarService])
  const onDeleteInsuranceImageHandler = useCallback(() => newCarService.removeInsuranceMedia(), [newCarService])
  const onDeleteRegistrationImageHandler = useCallback(() => newCarService.removeRegistrationMedia(), [newCarService])
  const onDeleteServiceInspectionImageHandler = useCallback(() => newCarService.removeServiceInspectionMedia(), [newCarService])

  const onChangeCarPhotoHandler = (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: newCarService.createCarPhotoMedia.bind(newCarService),
    })
  };

  const onSetDeviceKeyHandler = useCallback(() => {
    newCarService.deviceKey = getValues("deviceKey");
    newCarService.getCarByDeviceKey();
  }, [newCarService, getValues])

  const onSubmitHandler = useCallback((values: NewCarValues) => {
    newCarService.createCar({
      ...values,
      mediaId: newCarService.uploadedCarPhoto[0]?.id || '',
      insurance: { ...values.insurance, mediaId: insuranceMediaId },
      registration: { ...values.registration, mediaId: registrationMediaId },
      serviceInspection: { ...values.serviceInspection, mediaId: serviceInspectionMediaId }
    })
  }, [newCarService, insuranceMediaId, registrationMediaId, serviceInspectionMediaId])

  const onCancelHandler = useCallback(() => {
    reset();
    newCarService.reset();
    history.push(CARS_PAGE);
  }, [newCarService, history, reset])

  useEffect(() => {
    reset(defaultValues)
  }, [newCarService.selectedCarDM])

  useEffect(() => {
    newCarService.reset();
    carsService.getAllCarMakes();
    carsService.getAllCategories();
  }, [])

  if (!newCarService.isPassedSettingCar) return (
    <DeviceKeyModal
      control={control}
      errors={errors}
      watchDeviceKey={watchDeviceKey}
      onCancelHandler={onCancelHandler}
      onSetDeviceKeyHandler={onSetDeviceKeyHandler}
      deviceKeyMask={deviceKeyMask}
    />
  )

  return (
    <PageWrapper
      title="Add new car"
      withSidebar
      buttons={
        <>
          <Button
            type="button"
            disabled={isSubmitting}
            color="secondary"
            onClick={onCancelHandler}
            style={{ margin: "0 10px 0 0" }}
          >
            {t("admin.cancel")}
          </Button>
          <Button
            disabled={isSubmitting || isDisabledField}
            onClick={handleSubmit((values: NewCarValues) => onSubmitHandler(values))}
            color="primary"
          >
            {t("admin.saveCar")}
          </Button>
        </>
      }>
      <form className="new-car">
        <div className="new-car__card">
          <div className="new-car__card__header">
            <p className="text">
              {t("admin.carPhoto")}
            </p>
          </div>
          {newCarService.uploadedCarPhoto[0]?.imageUrl || carDM?.image ? (
            <ImagePreview
              image={newCarService.uploadedCarPhoto[0]?.imageUrl
                ? createImageUrl(newCarService.uploadedCarPhoto[0]?.imageUrl)
                : carDM?.image
              }
              onRemove={removeCarPhotoHandler}
            />
          ) : (
            <FilesDropzoneUploader
              options={{
                onDrop: onChangeCarPhotoHandler,
                maxSize: MAX_FILE_SIZE,
                maxFiles: MAX_FILES_COUNT,
                accept: 'image/jpeg, image/png, image/jpg',
              }}
              style={{ margin: 'auto', width: '100%' }}
            />
          )}
          <div className="new-car__card__device-key">
            <p className="title">
              {t("admin.deviceKey")}
            </p>
            <p className="text">
              {newCarService.deviceKey}
            </p>
          </div>
        </div>
        <div className="new-car__form">
          {/*<GeneralInfo*/}
          {/*  control={control}*/}
          {/*  errors={errors}*/}
          {/*  isDisabledField={isDisabledField}*/}
          {/*/>*/}

          <Specification
            control={control}
            errors={errors}
            isDisabledField={isDisabledField}
            defaultYear={defaultYear!}
            convertedCarsCategories={convertedCarsCategories}
            convertedCarMakes={convertedCarMakes}
            defaultMake={defaultMake!}
          />

          <Insurance
            control={control}
            errors={errors}
            isDisabledField={isDisabledField}
            onSetInsuranceImageHandler={onSetInsuranceImageHandler}
            onDeleteInsuranceImageHandler={onDeleteInsuranceImageHandler}
          />

          <Registration
            control={control}
            errors={errors}
            isDisabledField={isDisabledField}
            onDeleteRegistrationImageHandler={onDeleteRegistrationImageHandler}
            onSetRegistrationImageHandler={onSetRegistrationImageHandler}
          />

          <ServiceInspection
            control={control}
            errors={errors}
            isDisabledField={isDisabledField}
            onDeleteServiceInspectionImageHandler={onDeleteServiceInspectionImageHandler}
            onSetServiceInspectionImageHandler={onSetServiceInspectionImageHandler}
          />
        </div>
      </form>
    </PageWrapper>
  );
});

export default NewCar;
