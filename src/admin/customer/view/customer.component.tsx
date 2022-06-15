import React, { FC, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { Button } from "@/ui-kit/components/button/button.component";
import Tabs from "@/ui-kit/components/tabs/tabs.component";
import Tab from "@/ui-kit/components/tabs/tab/tab.component";
import { useForm } from "react-hook-form";
import { CUSTOMERS_PAGE } from "@/common/constants/routes";
import { AppService } from "@/common/app/domain/app.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, CUSTOMER_SERVICE } from "@/common/injector/constants";
import { CustomerService } from "@/admin/customer/domain/customer.service";
import InfoTab from "./components/tabs/info/info.component";
import ChangeLogTab from "@/admin/customer/view/components/tabs/change-log/change-log.component";
import ReservationHistoryTab from "./components/tabs/reservation-history/reservation-history.component";
import UserCard from "@/admin/customer/view/components/user-card/user-card.component";
import { LS_SELECTED_EDIT_CUSTOMER_ID } from "@/common/constants/localStorage";
import { SuspenseLoader } from "@/ui-kit/components/suspense-loader/suspense-loader.component";
import { DriverLicence, Payment } from "@/common/auth/api/dto/auth.dto";
import { NotificationPreferencesValues } from "@/common/constants/notificationPreferences";
import * as yup from "yup";
import { email, limitedString, onlyNumbers, phone, requiredDate } from "@/ui-kit/helpers/validators";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";

import './customer.styles.scss';


export interface UpdateCustomerValues {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  whatsAppPhone: string;
  emergencyPhone: string;
  zip: string;
  address: string;
  state: string;
  notificationType: NotificationPreferencesValues;
  payment: Payment;
  driverLicence: DriverLicence;
}

const Customer: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const appService: AppService = injector.get(APP_SERVICE);
  const customerService: CustomerService = injector.get(CUSTOMER_SERVICE);

  const createdMediaIds = customerService.createdDriverLicences.map((media) => media.id);
  const [newDriverLicenceImages, setNewDriverLicenceImages] = useState<Array<File>>([]);

  const validationSchema = yup.object().shape({
    firstName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    lastName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    mobilePhone: phone(t, 30, true),
    email: email(t, true),
    whatsAppPhone: phone(t, 30, false),
    emergencyPhone: phone(t, 30, false),
    address: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    state: limitedString(t, { minLength: 0, maxLength: 200 }, true),
    zip: onlyNumbers(t, { maxLength: 5 }, true),
    payment: yup.object().shape({
      cardholderName: limitedString(t, { maxLength: 40 }, false),
      billingZipCode: onlyNumbers(t, { maxLength: 5 }, false),
    }),
    driverLicence: yup.object().shape({
      DOB: requiredDate('DOB', t),
      issueDate: requiredDate('issueDate', t),
      expDate: requiredDate('expDate', t),
      licenceNumber: limitedString(t, { maxLength: 20 }, true),
    })
  });

  const defaultValues = {
    firstName: customerService.selectedCustomer?.firstName,
    lastName: customerService.selectedCustomer?.lastName,
    email: customerService.selectedCustomer?.email,
    mobilePhone: customerService.selectedCustomer?.mobilePhone,
    whatsAppPhone: customerService.selectedCustomer?.whatsAppPhone,
    emergencyPhone: customerService.selectedCustomer?.emergencyPhone,
    address: customerService.selectedCustomer?.address,
    state: customerService.selectedCustomer?.state,
    zip: customerService.selectedCustomer?.zip,
    driverLicence: {
      DOB: customerService.selectedCustomer ? new Date(customerService.selectedCustomer.driverLicence.DOB) : new Date(),
      issueDate: customerService.selectedCustomer ? new Date(customerService.selectedCustomer.driverLicence.issueDate) : new Date(),
      expDate: customerService.selectedCustomer ? new Date(customerService.selectedCustomer.driverLicence.expDate) : new Date(),
      licenceNumber: customerService.selectedCustomer?.driverLicence.licenceNumber,
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateCustomerValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = useCallback((values: UpdateCustomerValues) => {
    customerService.updateCustomerByAdmin({
        ...values,
        notificationType: customerService.selectedNotificationType,
        driverLicence: {
          ...values.driverLicence,
          licences: createdMediaIds.length ? createdMediaIds : customerService.selectedCustomer?.driverLicence.medias.map((media) => media.id)!,
        }
      }, customerService.selectedCustomer!.id
    )
    setNewDriverLicenceImages([]);
  }, [createdMediaIds, customerService])

  const onCancelHandler = useCallback(() => {
    customerService.pendingUserByAdmin(customerService.selectedCustomerId!)
    customerService.reset();
    appService.redirectTo(CUSTOMERS_PAGE);
  }, [customerService, appService])

  useEffect(() => {
    reset(defaultValues)
  }, [customerService.selectedCustomer])

  useEffect(() => {
    if (!localStorage.getItem(LS_SELECTED_EDIT_CUSTOMER_ID)) {
      appService.redirectTo(CUSTOMERS_PAGE);
    }
    customerService.getSelectedCustomer();
  }, [])

  useEffect(() => {
    if (localStorage.getItem(LS_SELECTED_EDIT_CUSTOMER_ID)) {
      customerService.getChangeLogById({
        userId: localStorage.getItem(LS_SELECTED_EDIT_CUSTOMER_ID)!,
        page: customerService.page,
        perPage: customerService.perPage,
      });
    }
  }, [customerService.tab]);

  if (!customerService.selectedCustomer) return <SuspenseLoader/>

  return (
    <PageWrapper
      title="Customer"
      withSidebar
      buttons={
        <>
          <Button
            className="button-cancel"
            onClick={onCancelHandler}
            color="secondary"
          >
            DEACTIVATE CUSTOMER
          </Button>
          <Button
            className="button-update"
            onClick={handleSubmit((values) => onSubmitHandler(values))}
            color="primary"
          >
            SAVE CHANGES
          </Button>
        </>
      }
    >
      <div className="customer">
        <UserCard/>
        <div className="tabs">
          <Tabs>
            <Tab title="Reservation History">
              <ReservationHistoryTab/>
            </Tab>
            <Tab title="Info">
              <InfoTab
                control={control}
                errors={errors}
                newDriverLicenceImages={newDriverLicenceImages}
                setNewDriverLicenceImages={setNewDriverLicenceImages}
              />
            </Tab>
            <Tab title="Change Log">
              <ChangeLogTab/>
            </Tab>
          </Tabs>
        </div>
      </div>
    </PageWrapper>
  )
});

export default Customer;
