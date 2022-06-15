import React, { FC, useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { Button } from "@/ui-kit/components/button/button.component";
import { FormsCustomDatepicker } from "@/ui-kit/components/forms/datepicker/custom-datepicker.component";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { injector } from "@/common/injector/Injector";
import { ADD_NEW_CUSTOMER_SERVICE, APP_SERVICE, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { ROOT_PAGE } from "@/common/constants/routes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AppService } from "@/common/app/domain/app.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { email, limitedString, onlyNumbers, phone, requiredDate } from "@/ui-kit/helpers/validators";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { AddNewCustomerService } from "@/admin/add-new-customer/domain/add-new-customer.service";
import { FormsInputRadioGroup } from "@/ui-kit/components/forms/radio/forms-radio-group.component";
import { notificationsPreferencesRadioValues } from "@/common/constants/options";
import {
  FilesDropzoneUploader,
  ImagePreview,
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";

import "./add-new-customer.styles.scss";


export interface PersonalDetailsValues {
  mediaId: string;
  email: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  whatsAppPhone: string;
  emergencyPhone: string;
  prefix: string;
  address: string;
  state: string;
  zip: string;
  notificationType: string;
  driverLicence: DriverLicence;
}

interface DriverLicence {
  DOB: Date | string;
  issueDate: Date | string;
  expDate: Date | string;
  licenceNumber: string;
  licences: Array<string>;
}


const MAX_DRIVER_LICENCE_FILES = 2;
const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILES_FORMATS = "image/jpeg, image/png, image/jpg";

const AddNewCustomer: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const appService: AppService = injector.get(APP_SERVICE);

  const addNewCustomerService: AddNewCustomerService = injector.get(ADD_NEW_CUSTOMER_SERVICE);
  const notificationService: NotificationService = injector.get(NOTIFICATION_SERVICE);

  const driverLicenceMedia = addNewCustomerService.driverLicenceMedias;

  const driverLicenceMediaIds = driverLicenceMedia.map((media) => media.id);
  const [typeNotification, setTypeNotification] = useState<string | undefined>("sms");

  const [newDriverLicenceImages, setNewDriverLicenceImages] = useState<Array<File | string>>([]);

  const validationSchema = yup.object().shape({
    firstName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    lastName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    mobilePhone: phone(t, 30, true),
    email: email(t, true),
    whatsAppPhone: phone(t, 30),
    emergencyPhone: phone(t, 30),
    address: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    state: limitedString(t, { minLength: 0, maxLength: 200 }, true),
    zip: onlyNumbers(t, { maxLength: 5 }, true),
    driverLicence: yup.object().shape({
      DOB: requiredDate('DOB', t),
      issueDate: requiredDate('issueDate', t),
      expDate: requiredDate('expDate', t),
      licenceNumber: limitedString(t, { maxLength: 20 }, true),
    })
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PersonalDetailsValues>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const backgroundDriverLicenceHandler = (acceptedFiles: Array<File>) => {
    if (acceptedFiles.length === 2) {
      onCreateImageHTTP({
        files: acceptedFiles,
        onCreateMediaHandler: addNewCustomerService.createDriverLicenceImage.bind(addNewCustomerService),
      })
      setNewDriverLicenceImages(acceptedFiles);
      return;
    }

    if (acceptedFiles.length === 1) {
      const [file] = acceptedFiles;

      onCreateImageHTTP({
        file,
        onCreateMediaHandler: addNewCustomerService.createDriverLicenceImage.bind(addNewCustomerService),
      })
      setNewDriverLicenceImages([...newDriverLicenceImages, file]);
    }
  };

  const removeDriverLicencesHandler = useCallback(() => {
    setNewDriverLicenceImages([]);
    addNewCustomerService.driverLicenceMedias = [];
  }, []);

  const onSubmitHandler = async (values: PersonalDetailsValues) => {
    if (!driverLicenceMediaIds.length) {
      notificationService.notify({ message: "Upload your driver licence!", status: "error" })
      return;
    }

    await addNewCustomerService.createCustomer({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      mobilePhone: values.mobilePhone,
      whatsAppPhone: values.whatsAppPhone,
      emergencyPhone: values.emergencyPhone,
      address: values.address,
      notificationType: typeNotification || "sms",
      state: values.state,
      zip: values.zip,
      driverLicence: {
        DOB: values.driverLicence.DOB,
        issueDate: values.driverLicence.issueDate,
        expDate: values.driverLicence.expDate,
        licenceNumber: values.driverLicence.licenceNumber,
        licences: driverLicenceMediaIds,
      }
    })
  }

  return (
    <PageWrapper
      withSidebar
      title="Add new customer"
      buttons={
        <div className="new-customer__footer">
          <Button
            disabled={isSubmitting}
            color="secondary"
            onClick={() => appService.redirectTo(ROOT_PAGE)}
          >
            {t("client.cancel")}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            color="primary"
            className="new-customer__footer__submit"
            onClick={handleSubmit((values) => onSubmitHandler(values))}
          >
            SAVE & ACTIVATE CUSTOMER
          </Button>
        </div>
      }>
      <div className="new-customer">
        <section className="new-customer__body">
          <section className="new-customer__left-section">
            <div className="driver-licence">
              <div className="licence-uploader">
                <h3 className="title">
                  {t("auth.driverLicence")}
                </h3>
                {newDriverLicenceImages.length !== 0 && (
                  <ImagePreview
                    images={newDriverLicenceImages}
                    onRemove={removeDriverLicencesHandler}
                  />
                )}
                {newDriverLicenceImages.length < 2 && (
                  <FilesDropzoneUploader
                    options={{
                      onDrop: backgroundDriverLicenceHandler,
                      maxSize: MAX_FILE_SIZE,
                      maxFiles: MAX_DRIVER_LICENCE_FILES,
                      accept: ACCEPTED_FILES_FORMATS,
                    }}
                    isMini={newDriverLicenceImages.length === 1}
                    classPrefix="licence-uploader__input"
                    placeholder="Drag and drop front and back side of your driving license or upload"
                  />
                )}
              </div>
              <div className="dob">
                <FormsCustomDatepicker
                  name="driverLicence.DOB"
                  control={control}
                  label={t("client.dob").toUpperCase()}
                  error={errors.driverLicence?.DOB?.message}
                />
              </div>
              <div className="issue-date">
                <FormsCustomDatepicker
                  name="driverLicence.issueDate"
                  control={control}
                  label={t("client.issueDate")}
                  error={errors.driverLicence?.issueDate?.message}
                />
              </div>
              <div className="exp-date">
                <FormsCustomDatepicker
                  name="driverLicence.expDate"
                  control={control}
                  label={t("client.expDate")}
                  error={errors.driverLicence?.expDate?.message}
                />
              </div>
              <div className="licence-number">
                <FormsTextInput
                  name="driverLicence.licenceNumber"
                  control={control}
                  className="personal-details-form__input"
                  label={t("client.licenceNumber")}
                  wrapperPrefix="first-name"
                  placeholder={t("client.licenceNumber")}
                  error={errors.driverLicence?.licenceNumber?.message}
                  useWrapper
                  type="text"
                />
              </div>
            </div>
          </section>
          <section className="new-customer__right-section">
            <div className="new-customer__block-info">
              <div className="personal-details-form">
                <div className="row justify wrap">
                  <div className="column">
                    <h3>Name</h3>
                    <div className="row justify hide-titles">
                      <FormsTextInput
                        name="firstName"
                        className="personal-details-form__input"
                        control={control}
                        label={t("client.firstName")}
                        placeholder={t("client.firstName")}
                        error={errors.firstName?.message}
                        type="text"
                      />
                      <FormsTextInput
                        name="lastName"
                        className="personal-details-form__input"
                        control={control}
                        label={t("client.lastName")}
                        placeholder={t("client.lastName")}
                        error={errors.lastName?.message}
                        type="text"
                      />
                    </div>

                    <h3 className="mt-36">Contacts</h3>

                    <div className="row justify hide-titles">
                      <FormsTextInput
                        name="email"
                        className="personal-details-form__input"
                        control={control}
                        label={t("client.email")}
                        placeholder={t("client.email")}
                        error={errors.email?.message}
                        type="email"
                      />
                      <FormsTextInput
                        name="mobilePhone"
                        className="personal-details-form__input"
                        control={control}
                        label={t("client.phone")}
                        placeholder={t("client.phone")}
                        error={errors.mobilePhone?.message}
                        type="tel"
                      />
                    </div>

                    <div className="row justify hide-titles">
                      <FormsTextInput
                        name="emergencyPhone"
                        className="personal-details-form__input"
                        control={control}
                        label={t("client.emergencyContactPhone")}
                        placeholder={t("client.emergencyContactPhone")}
                        error={errors.emergencyPhone?.message}
                        type="tel"
                      />
                      <FormsTextInput
                        name="whatsAppPhone"
                        className="personal-details-form__input"
                        control={control}
                        label={t("client.whatsAppPhone")}
                        placeholder={t("client.whatsAppPhone")}
                        error={errors.whatsAppPhone?.message}
                        type="tel"
                      />
                    </div>

                    <div className="row justify count-2 hide-titles">
                      <div className="row justify count-2">
                        <FormsTextInput
                          name="zip"
                          control={control}
                          className="personal-details-form__input"
                          label={t("client.zip")}
                          placeholder={t("client.zip")}
                          error={errors.zip?.message}
                          type="text"
                        />
                        <FormsTextInput
                          name="state"
                          control={control}
                          className="personal-details-form__input"
                          label={t("client.state")}
                          placeholder={t("client.state")}
                          error={errors.state?.message}
                          type="text"
                        />
                      </div>

                      <FormsTextInput
                        name="address"
                        control={control}
                        className="personal-details-form__input"
                        label={t("client.address")}
                        placeholder={t("client.address")}
                        error={errors.address?.message}
                        type="text"
                      />
                    </div>

                    <h3>Notification preferences</h3>

                    <div className="hide-titles notification-section">
                      <FormsInputRadioGroup
                        radioValues={notificationsPreferencesRadioValues(t)}
                        checked={typeNotification}
                        setValue={setTypeNotification}
                        label={t("client.myNotificationPreferences")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </PageWrapper>
  );
});

export default AddNewCustomer;
