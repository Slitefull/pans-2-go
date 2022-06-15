import React, { FC, useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import Tabs from "@/ui-kit/components/tabs/tabs.component";
import Tab from "@/ui-kit/components/tabs/tab/tab.component";
import { Button } from "@/ui-kit/components/button/button.component";
import CarCard from "@/admin/edit-car/view/car-card/car-card.component";
import InfoTab from "@/admin/edit-car/view/tabs/info/info-tab.component";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, EDIT_CAR_SERVICE } from "@/common/injector/constants";
import { EditCarService } from "@/admin/edit-car/domain/edit-car.service";
import { SuspenseLoader } from "@/ui-kit/components/suspense-loader/suspense-loader.component";
import { LS_SELECTED_EDIT_CAR_ID } from "@/common/constants/localStorage";
import ReservationHistoryTab from "./tabs/reservation-history/reservation-history-tab.component";
import ChangeLogTab from "@/admin/edit-car/view/tabs/change-log/change-log-tab.component";
import { CARS_PAGE } from "@/common/constants/routes";
import { useForm } from "react-hook-form";
import MaintenanceTab from "@/admin/edit-car/view/tabs/maintenance/maintenance-tab.component";
import { AppService } from "@/common/app/domain/app.service";
import { limitedString, maxDate, minDate, requiredNumber } from "@/ui-kit/helpers/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./edit-car.styles.scss";


interface UpdateCarValues {
  mediaId: string;
  imageUrl: string;
  title: string;
  VIN: string;
  plateNumber: string;
  bodyType: string;
  year: Date | string | null;
  model: string;
  fuelType: string;
  doors: number;
  seats: number;
  color: string;
  categoryId: string;
  insurance: Insurance;
  registration: Registration;
  serviceInspection: ServiceInspection;
}

interface Insurance {
  policyNumbers: string;
  coverage: string;
  expDate: Date | string | null;
  carId: string;
  mediaId: string;
}

interface Registration {
  state: string;
  expDate: Date | string | null;
  carId: string;
  mediaId: string;
}

interface ServiceInspection {
  expDate: Date | string | null;
  carId: string;
  mediaId: string;
}

const EditCar: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const appService: AppService = injector.get(APP_SERVICE);
  const editCarService: EditCarService = injector.get(EDIT_CAR_SERVICE);

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
      }, false),
    }),
    serviceInspection: yup.object().shape({
      lastInspectionDate: minDate(t, {
        lessThan: new Date(),
        validationMessage: t("admin.lastInspectionDateMustBeEarlierThanNow"),
      }),
      expDate: maxDate(t, {
        biggerThan: new Date(),
        validationMessage: t("admin.expirationDateMustBeLaterThanNow")
      }, false),
    })
  })

  const defaultValues = {
    imageUrl: editCarService.selectedCar?.imageUrl,
    title: editCarService.selectedCar?.title,
    VIN: editCarService.selectedCar?.VIN,
    plateNumber: editCarService.selectedCar?.plateNumber,
    doors: editCarService.selectedCar?.doors,
    seats: editCarService.selectedCar?.seats,
    color: editCarService.selectedCar?.color,
    model: editCarService.selectedCar?.model,
    year: new Date(editCarService.selectedCar?.year!).getFullYear().toString(),
    categoryId: editCarService.selectedCar?.category?.id,
    fuelType: editCarService.selectedCar?.fuelType,
    makeId: editCarService.selectedCar?.make?.id,
    insurance: {
      policyNumbers: editCarService.selectedCar?.insurance.policyNumbers,
      carId: editCarService.selectedCar?.id,
      expDate: editCarService.selectedCar?.insurance.expDate
        ? new Date(editCarService.selectedCar.insurance.expDate)
        : null,
      coverage: editCarService.selectedCar?.insurance.coverage,
    },
    registration: {
      state: editCarService.selectedCar?.registration?.state,
      carId: editCarService.selectedCar?.id,
      expDate: editCarService.selectedCar?.registration.expDate
        ? new Date(editCarService.selectedCar?.registration.expDate)
        : null,
    },
    serviceInspection: {
      lastInspectionDate: editCarService.selectedCar?.serviceInspection.lastInspectionDate
        ? new Date(editCarService.selectedCar?.serviceInspection.lastInspectionDate)
        : null,
      carId: editCarService.selectedCar?.id,
      expDate: editCarService.selectedCar?.serviceInspection.expDate
        ? new Date(editCarService.selectedCar?.serviceInspection?.expDate!)
        : null,
    }
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdateCarValues>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues
  });

  const onSubmitHandler = (values: UpdateCarValues) => {
    editCarService.updateCar(editCarService.selectedCar?.id!, {
      ...values,
      deviceKey: editCarService.selectedCar?.deviceKey,
      mediaId: editCarService.carPhotoMedia.length ? editCarService.carPhotoMedia[0].id : null,
      insurance: {
        ...values.insurance,
        mediaId: editCarService.insuranceMedia.length ? editCarService.insuranceMedia[0].id : null
      },
      registration: {
        ...values.registration,
        mediaId: editCarService.registrationMedia.length ? editCarService.registrationMedia[0].id : null,
      },
      serviceInspection: {
        ...values.serviceInspection,
        mediaId: editCarService.serviceInspectionMedia.length ? editCarService.serviceInspectionMedia[0].id : null
      }
    })
  }

  const onCancelHandler = useCallback(() => {
    editCarService.reset();
    appService.redirectTo(CARS_PAGE)
  }, [appService])

  useEffect(() => {
    editCarService.reset();
    if (localStorage.getItem(LS_SELECTED_EDIT_CAR_ID) && !editCarService.selectedCar) {
      editCarService.setSelectedCar(localStorage.getItem(LS_SELECTED_EDIT_CAR_ID)!);
      editCarService.getMaintenanceByCarId(localStorage.getItem(LS_SELECTED_EDIT_CAR_ID)!);
      editCarService.getChangeLogById({
        userId: localStorage.getItem(LS_SELECTED_EDIT_CAR_ID)!,
        page: editCarService.page,
        perPage: editCarService.perPage,
      });
      return
    }
  }, [])

  if (!editCarService.selectedCar) return <SuspenseLoader/>

  return (
    <PageWrapper
      title={editCarService.selectedCar?.title}
      withSidebar
      buttons={
        <>
          <Button
            className="button-cancel"
            color="secondary"
            onClick={onCancelHandler}
            style={{ margin: "0 10px 0 0" }}
          >
            {t("ui-kit.cancel")}
          </Button>
          <Button
            className="button-update"
            color="primary"
            onClick={handleSubmit((values: UpdateCarValues) => onSubmitHandler(values))}
          >
            {t("ui-kit.saveCar")}
          </Button>
        </>
      }
    >
      <div className="edit-car">
        <CarCard/>
        <div className="tabs">
          <Tabs>
            <Tab title={t("admin.info")}>
              <InfoTab
                errors={errors}
                control={control}
                defaultValues={defaultValues}
                reset={reset}
              />
            </Tab>
            <Tab title={t("admin.reservationHistory")}>
              <ReservationHistoryTab/>
            </Tab>
            <Tab title={t("admin.maintenance")}>
              <MaintenanceTab/>
            </Tab>
            <Tab title={t("admin.changeLog")}>
              <ChangeLogTab/>
            </Tab>
          </Tabs>
        </div>
      </div>
    </PageWrapper>
  );
});

export default EditCar;
