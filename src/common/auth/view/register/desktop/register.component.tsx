import React, { Dispatch, FC, SetStateAction } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { FormsInputRadioGroup } from "@/ui-kit/components/forms/radio/forms-radio-group.component";
import { notificationsPreferencesRadioValues, } from "@/common/constants/options";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { Button } from "@/ui-kit/components/button/button.component";
import { FormsCustomDatepicker } from "@/ui-kit/components/forms/datepicker/custom-datepicker.component";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { AppService } from "@/common/app/domain/app.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE } from "@/common/injector/constants";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { ROOT_PAGE } from "@/common/constants/routes";
import {
  FilesDropzoneUploader,
  ImagePreview,
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";

import { PersonalDetailsValues } from "../register.component";
import "./register.styles.scss";


interface RegisterDesktopProps {
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<any>;
  control: Control<any>;
  onSubmitHandler: (values: PersonalDetailsValues) => void;
  errors: FieldErrors;
  notificationType: string | undefined;
  newDriverLicenceImages: Array<File | string>;
  setNewDriverLicenceImages: Dispatch<SetStateAction<Array<File | string>>>;
  newNotificationType: (value: string | undefined) => void;
  backgroundDriverLicenceHandler: (acceptedFiles: Array<File>) => void;
  removeDriverLicencesHandler: () => void;
}

const MAX_DRIVER_LICENCE_FILES = 2;
const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILES_FORMATS = "image/jpeg, image/png, image/jpg";

const RegisterDesktop: FC<RegisterDesktopProps> = observer((
  {
    isSubmitting,
    handleSubmit,
    onSubmitHandler,
    errors,
    control,
    notificationType,
    newNotificationType,
    backgroundDriverLicenceHandler,
    newDriverLicenceImages,
    removeDriverLicencesHandler,
  }
): JSX.Element => {
  const { t } = useTranslation();
  const appService: AppService = injector.get(APP_SERVICE);

  return (
    <PageWrapper
      withClientHeader
      title="Sign Up"
      buttons={
        <div className="register-form__footer">
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
            className="register-form__footer__submit"
            onClick={handleSubmit((values) => onSubmitHandler(values))}
          >
            {t("client.save")}
          </Button>
        </div>
      }>
      <div className="register-form">
        <section className="register-form__body">
          <section className="register-form__right-section">
            <div className="register-form__block-info">
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

                    <h3 className="mt-36">Notification preferences</h3>

                    <div className="hide-titles notification-section">
                      <FormsInputRadioGroup
                        radioValues={notificationsPreferencesRadioValues(t)}
                        checked={notificationType}
                        setValue={newNotificationType}
                        label={t("client.myNotificationPreferences")}
                      />
                    </div>

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

                    <div className="payment-details-register">
                      <h3 className="title">
                        Payment Details
                      </h3>

                      <div className="payment-details-register-form">
                        <div className="card-number">
                          <label>
                            {t("ui-kit.card-number")}
                            <CardNumberElement/>
                          </label>
                        </div>
                        <div className="cvv">
                          <label>
                            {t("ui-kit.cvc")}
                            <CardCvcElement/>
                          </label>
                        </div>
                        <div className="exp-date">
                          <label>
                            {t("ui-kit.expiration-date")}
                            <CardExpiryElement/>
                          </label>
                        </div>

                        <div className="cardholder-name">
                          <FormsTextInput
                            name="payment.cardholderName"
                            control={control}
                            className="personal-details-form__input"
                            label={t("auth.cardholderName")}
                            placeholder={t("auth.cardholderName")}
                            labelPrefix="personal-details-form__input__prefix"
                            error={errors.payment?.cardholderName?.message}
                            type="text"
                          />
                        </div>

                        <div className="zip-code">
                          <FormsTextInput
                            name="payment.billingZipCode"
                            control={control}
                            className="personal-details-form__input"
                            label={t("auth.billingZipCode")}
                            placeholder={t("auth.billingZipCode")}
                            labelPrefix="personal-details-form__input__prefix"
                            autoComplete="off"
                            error={errors.payment?.billingZipCode?.message}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-36">Password</h3>

                    <div className="column count-2 hide-titles">
                      <FormsTextInput
                        name="password"
                        className="personal-details-form__input"
                        control={control}
                        label={t("client.password")}
                        placeholder={t("client.password")}
                        error={errors.password?.message}
                        type="password"
                      />
                      <FormsTextInput
                        name="rePassword"
                        className="personal-details-form__input"
                        control={control}
                        label={t("client.repeatPassword")}
                        placeholder={t("client.repeatPassword")}
                        error={errors.rePassword?.message}
                        type="password"
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

export default RegisterDesktop;
