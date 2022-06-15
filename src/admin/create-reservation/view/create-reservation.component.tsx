import React, { FC, useCallback, useEffect } from "react";
import i18next from "i18next";
import { observer } from "mobx-react";
import { Button } from "@/ui-kit/components/button/button.component";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import SelectCustomer from "@/admin/create-reservation/view/components/select-customer/select-customer.component";
import MainForm from "@/admin/create-reservation/view/components/main-form/main-form.component";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { injector } from "@/common/injector/Injector";
import { AppService } from "@/common/app/domain/app.service";
import { RESERVATIONS_PAGE } from "@/common/constants/routes";
import { NewReservationByAdminService } from "@/admin/create-reservation/domain/create-reservation.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { SuspenseLoader } from "@/ui-kit/components/suspense-loader/suspense-loader.component";
import { CustomersService } from "@/admin/customers/domain/customers.service";
import ReservationSummaryAdmin from "./components/reservation-summary/reservation-summary.component";
import {
  ADD_NEW_RESERVATION_BY_ADMIN_SERVICE,
  APP_SERVICE,
  CARS_SERVICE,
  CUSTOMERS_SERVICE,
  NOTIFICATION_SERVICE
} from "@/common/injector/constants";

import './create-reservation.styles.scss';


const CreateReservation: FC = observer((): JSX.Element => {
  const appService: AppService = injector.get(APP_SERVICE);
  const carsService: CarsService = injector.get(CARS_SERVICE);
  const customersService: CustomersService = injector.get(CUSTOMERS_SERVICE);
  const newReservationService: NewReservationByAdminService = injector.get(ADD_NEW_RESERVATION_BY_ADMIN_SERVICE);
  const notificationService: NotificationService = injector.get<NotificationService>(NOTIFICATION_SERVICE);

  const onCancelHandler = useCallback(() => {
    appService.redirectTo(RESERVATIONS_PAGE)
  }, [appService])

  const onSubmitHandler = useCallback(() => {
    if (newReservationService.dropOffWithPackage) {
      newReservationService.dropOff = newReservationService.dropOffWithPackage;
    }

    if (newReservationService.selectedCustomer) {
      if ((newReservationService.area === 'outNY' && newReservationService.place) || newReservationService.area !== 'outNY') {
        newReservationService.createReservation();
      } else {
        notificationService.notify({
          message: i18next.t("reservation.needPlace"),
          status: "error",
        });
      }
    } else {
      notificationService.notify({
        message: i18next.t("reservation.needCustomer"),
        status: "error",
      });
    }
  }, [newReservationService])

  useEffect(() => {
    carsService.getAllCars();
    carsService.getAllCategories();
    customersService.getAllCustomers();
  }, [])

  useEffect(() => {
    if (carsService.carCategories.length) {
      newReservationService.selectedCarCategory = carsService.carCategories[0].id;
      newReservationService.selectedCarType = carsService.carCategories[0].title;
    }
  }, [carsService.carCategories.length])

  if (!carsService.carCategories.length) return <SuspenseLoader/>

  return (
    <PageWrapper
      title="New Reservation"
      withSidebar
      buttons={
        <>
          <Button
            className="button-cancel"
            color="secondary"
            onClick={onCancelHandler}
          >
            CANCEL
          </Button>
          <Button
            className="button-create"
            color="primary"
            onClick={onSubmitHandler}
          >
            CREATE
          </Button>
        </>
      }
    >
      <div className="create-reservation">
        <MainForm/>
        <SelectCustomer/>
        <ReservationSummaryAdmin/>
      </div>
    </PageWrapper>
  )
});

export default CreateReservation;
