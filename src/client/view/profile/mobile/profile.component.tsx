import React, { FC, useState } from 'react';
import { Button } from "@/ui-kit/components/button/button.component";
import { PersonalDetailsValues } from "@/client/view/profile/profile.component";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { FormsInputRadio } from "@/ui-kit/components/forms/radio/forms-radio.component";
import {
  FilesDropzoneUploader,
  ImagePreview
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import { FormsCustomDatepicker } from "@/ui-kit/components/forms/datepicker/custom-datepicker.component";
import { Card } from "@/ui-kit/components/card/card.component";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import ChangePasswordForm from "@/client/view/profile/change-password/change-password.component";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { Control, DefaultValues, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { injector } from "@/common/injector/Injector";
import { SESSION_USER_SERVICE } from "@/common/injector/constants";
import Tabs from "@/ui-kit/components/tabs/tabs.component";
import Tab from "@/ui-kit/components/tabs/tab/tab.component";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";


interface ProfileMobileProps {
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmitHandler: (values: PersonalDetailsValues) => void;
  control: Control<any>;
  errors: FieldErrors<any>;
  selectedNotificationType: string;
  setSelectedNotificationType: (radioValue: string) => void;
  newDriverLicenceImages: Array<File | string>;
  ownDriverLicencesMediaUrls: Array<string>;
  removeDriverLicencesHandler: () => void;
  backgroundDriverLicenceHandler: (acceptedFiles: Array<File>) => void;
  isShowPaymentDetailsForm: boolean;
  onChangeIsShowPaymentDetailsForm: () => void;
  defaultValues: DefaultValues<any>;
}

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_DRIVER_LICENCE_FILES = 2;
const ACCEPTED_FILE_FORMATS = 'image/jpeg, image/png, image/jpg';

const ProfileMobile: FC<ProfileMobileProps> = (
  {
    onSubmitHandler,
    isSubmitting,
    handleSubmit,
    control,
    errors,
    selectedNotificationType,
    setSelectedNotificationType,
    newDriverLicenceImages,
    ownDriverLicencesMediaUrls,
    removeDriverLicencesHandler,
    backgroundDriverLicenceHandler,
    isShowPaymentDetailsForm,
    onChangeIsShowPaymentDetailsForm,
    defaultValues,
  }
): JSX.Element => {
  const { t } = useTranslation()
  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);

  const [newBackgroundImage, setBackgroundImage] = useState<File | string>();
  const avatar = sessionUserService.media?.imageUrl;

  const removeBackgroundImage = () => {
    if (sessionUserService.media?.id) {
      sessionUserService.deleteUserAvatar(sessionUserService.media.id)
    }
    setBackgroundImage(undefined);
  }

  const backgroundImageHandler = (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: sessionUserService.createProfileImage.bind(sessionUserService),
    })
    setBackgroundImage(acceptedFiles[0]);
  };

  return (
    <PageWrapper
      title="My Profile"
      withClientHeader
    >
      <div className="profile">
        <Tabs headerPrefix="profile-tab-header">
          <Tab title="Profile">
            <div className="profile-form">
              <div className="personal-details-form">
                {newBackgroundImage || avatar ? (
                  <ImagePreview
                    image={newBackgroundImage || `https://wheels2go-dev.s3.us-west-2.amazonaws.com/${avatar}`}
                    onRemove={removeBackgroundImage}
                  />
                ) : (
                  <FilesDropzoneUploader
                    options={{
                      onDrop: backgroundImageHandler,
                      maxSize: MAX_FILE_SIZE,
                      maxFiles: 1,
                      accept: 'image/jpeg, image/png, image/jpg',
                    }}
                    style={{ margin: 'auto', width: '100%' }}
                  />
                )}

                <h3 className="title">
                  {t("client.name")}
                </h3>
                <div className="name-container">
                  <FormsTextInput
                    name="firstName"
                    control={control}
                    className="personal-details-form__input"
                    wrapperPrefix="first-name"
                    placeholder={t("client.firstName")}
                    error={errors.firstName?.message}
                    useWrapper
                    type="text"
                  />
                  <FormsTextInput
                    name="lastName"
                    control={control}
                    wrapperPrefix="last-name"
                    className="personal-details-form__input"
                    placeholder={t("client.lastName")}
                    error={errors.lastName?.message}
                    useWrapper
                    type="text"
                  />
                </div>
                <h3 className="title">
                  {t("client.contacts")}
                </h3>
                <div className="contacts-container">
                  <FormsTextInput
                    name="email"
                    control={control}
                    wrapperPrefix="email"
                    className="personal-details-form__input"
                    placeholder={t("client.email")}
                    defaultValue={sessionUserService.email}
                    error={errors.email?.message}
                    useWrapper
                    type="text"
                  />
                  <FormsTextInput
                    name="mobilePhone"
                    control={control}
                    wrapperPrefix="phone"
                    className="personal-details-form__input"
                    placeholder={t("client.phone")}
                    defaultValue={sessionUserService.mobilePhone}
                    error={errors.mobilePhone?.message}
                    useWrapper
                    type="text"
                  />
                  <FormsTextInput
                    name="emergencyPhone"
                    control={control}
                    wrapperPrefix="emergency-contact-phone"
                    className="personal-details-form__input"
                    placeholder={t("client.emergencyContactPhone")}
                    defaultValue={sessionUserService.emergencyPhone}
                    error={errors.emergencyPhone?.message}
                    useWrapper
                    type="tel"
                  />
                  <FormsTextInput
                    name="whatsAppPhone"
                    control={control}
                    wrapperPrefix="whats-app-phone"
                    className="personal-details-form__input"
                    placeholder={t("client.whatsAppPhone")}
                    defaultValue={sessionUserService.whatsAppPhone}
                    error={errors.whatsAppPhone?.message}
                    useWrapper
                    type="tel"
                  />
                  <FormsTextInput
                    name="zip"
                    control={control}
                    wrapperPrefix="zip"
                    className="personal-details-form__input"
                    placeholder={t("client.zip")}
                    defaultValue={sessionUserService.zip}
                    error={errors.zip?.message}
                    useWrapper
                    type="text"
                  />
                  <FormsTextInput
                    name="state"
                    control={control}
                    wrapperPrefix="state"
                    className="personal-details-form__input"
                    placeholder={t("client.state")}
                    defaultValue={sessionUserService.state}
                    error={errors.state?.message}
                    useWrapper
                    type="text"
                  />
                  <FormsTextInput
                    name="address"
                    control={control}
                    wrapperPrefix="address"
                    className="personal-details-form__input"
                    placeholder={t("client.address")}
                    defaultValue={sessionUserService.address}
                    error={errors.address?.message}
                    useWrapper
                    type="text"
                  />
                </div>

                <div className="my-notification-preferences">
                  <h3 className="title">
                    {t("client.myNotificationPreferences")}
                  </h3>
                  <div className="my-notification-preferences__options">
                    <FormsInputRadio
                      name="notificationType"
                      value={'email'}
                      label={t("client.email")}
                      checked={selectedNotificationType === "email"}
                      onClickHandler={(radioValue) => setSelectedNotificationType(radioValue)}
                    />
                    <FormsInputRadio
                      name="notificationType"
                      value={'sms'}
                      label={t("client.sms")}
                      checked={selectedNotificationType === "sms"}
                      onClickHandler={(radioValue) => setSelectedNotificationType(radioValue)}
                    />
                  </div>
                </div>
              </div>
              <ChangePasswordForm/>
            </div>
          </Tab>
          <Tab title="Documents">
            <div className="profile-documents-wrapper">
              <div className="driver-licence">
                <h3 className="title">
                  {t("client.driverLicence")}
                </h3>

                <div className="driver-licence-container">
                  <div className="licence-uploader">
                    {newDriverLicenceImages.length !== 0 && (
                      <ImagePreview
                        images={newDriverLicenceImages}
                        onRemove={removeDriverLicencesHandler}
                        classPrefix={newDriverLicenceImages.length < 2 ? "licences-preview" : undefined}
                        imageClassPrefix={newDriverLicenceImages.length < 2 ? "licences-preview__image" : undefined}
                      />
                    )}
                    {ownDriverLicencesMediaUrls.length !== 0 && (
                      <ImagePreview
                        links={ownDriverLicencesMediaUrls}
                        onRemove={removeDriverLicencesHandler}
                        classPrefix={ownDriverLicencesMediaUrls.length < 2 ? "licences-preview" : undefined}
                        imageClassPrefix={ownDriverLicencesMediaUrls.length < 2 ? "licences-preview__image" : undefined}
                      />
                    )}
                    {(!ownDriverLicencesMediaUrls.length && newDriverLicenceImages.length < 2) && (
                      <FilesDropzoneUploader
                        options={{
                          onDrop: backgroundDriverLicenceHandler,
                          maxSize: MAX_FILE_SIZE,
                          maxFiles: MAX_DRIVER_LICENCE_FILES,
                          accept: ACCEPTED_FILE_FORMATS,
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
              </div>

              <div className="profile-payment-details">
                <h3 className="title">
                  {t("client.payments")}
                </h3>
                {isShowPaymentDetailsForm ?
                  <Card digits={defaultValues.payment?.cardNumbers} onChange={onChangeIsShowPaymentDetailsForm}/> :
                  <div className="profile-payment-details__form">
                    <div className="card-number">
                      <CardNumberElement/>
                    </div>
                    <div className="exp-date">
                      <CardExpiryElement/>
                    </div>
                    <div className="cardholder-name">
                      <FormsTextInput
                        name="payment.cardholderName"
                        control={control}
                        className="payment-details__form__input"
                        placeholder={t("client.cardholderName")}
                        error={errors.payment?.cardholderName?.message}
                        type="text"
                      />
                    </div>
                    <div className="zip-code">
                      <FormsTextInput
                        name="payment.billingZipCode"
                        control={control}
                        className="payment-details__form__input"
                        placeholder={t("client.billingZipCode")}
                        error={errors.payment?.billingZipCode?.message}
                        type="text"
                      />
                    </div>
                    <div className="cvv">
                      <CardCvcElement/>
                    </div>
                  </div>}
              </div>
            </div>
          </Tab>
        </Tabs>

        <Button
          className="button-update"
          disabled={isSubmitting}
          color="primary"
          onClick={handleSubmit((values: PersonalDetailsValues) => onSubmitHandler(values))}
        >
          {t("ui-kit.save")}
        </Button>
      </div>
    </PageWrapper>
  );
};

export default ProfileMobile;
