import React, {FC, useEffect, useState} from "react";
import * as yup from "yup";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { injector } from "@/common/injector/Injector";
import { FormsSelect } from "@/ui-kit/components/forms/select/forms-select.component";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { FormsInputRadioGroup } from "@/ui-kit/components/forms/radio/forms-radio-group.component";
import { AuthService } from "@/common/auth/domain/auth.service";
import { notificationsPreferencesRadioValues, prefixDropdownOptions, } from "@/common/constants/options";
import { confirmPassword, email, limitedString, onlyNumbers, password, phone, } from "@/ui-kit/helpers/validators";
import { MediaService } from "@/common/media/domain/media.service";
import {APP_SERVICE, AUTH_SERVICE, MEDIA_SERVICE, SESSION_USER_SERVICE} from "@/common/injector/constants";
import { AppService } from "@/common/app/domain/app.service";
import {
  FilesDropzoneUploader,
  ImagePreview,
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { Payment } from "../../api/dto/auth.dto";

import "./reserve-now-register.styles.scss";
import {SessionUserService} from "@/common/session-user/domain/session-user.service";


interface PersonalDetailsValues {
  email: string,
 // password: string,
 // rePassword: string,
  firstName: string,
  lastName: string,
  mobilePhone: string,
  whatsAppPhone: string,
  emergencyPhone: string,
  prefix: string,
  address: string,
  state: string,
  zip: string,
  notificationType: string,
  payment: Payment,
  licences: Array<string>,
}

const MAX_FILE_SIZE = 1024 * 1024 * 10;

const ReserveNowRegister: FC = observer((): JSX.Element => {
  const { t } = useTranslation();

  const appService: AppService = injector.get(APP_SERVICE);
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const mediaService: MediaService = injector.get(MEDIA_SERVICE);
  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);

  const license = mediaService.createdMediaIds[0]?.id;
  const [newBackgroundImage, setBackgroundImage] = useState<File | string>();

  const validationSchema = yup.object().shape({
    prefix: limitedString(t, { minLength: 0, maxLength: 5 }, true),
    firstName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    lastName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    mobilePhone: phone(t, 30, true),
    email: email(t, true),
  //  password: password(t),
  //  rePassword: confirmPassword(t, "password"),
    whatsAppPhone: phone(t, 30),
    emergencyPhone: phone(t, 30),
    address: limitedString(t, { minLength: 0, maxLength: 400 }, false),
    state: limitedString(t, { minLength: 0, maxLength: 200 }, false),
    zip: onlyNumbers(t, { maxLength: 5 }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDetailsValues>({
    defaultValues: {
      firstName: sessionUserService.firstName,
      lastName: sessionUserService.lastName,
      email: sessionUserService.email,
      mobilePhone: sessionUserService.mobilePhone,
      state: "New York",
      prefix: sessionUserService.prefix || "Mr",
      emergencyPhone: sessionUserService.emergencyPhone,
      whatsAppPhone: sessionUserService.whatsAppPhone,
      zip: sessionUserService.zip,
      address: sessionUserService.address,
      notificationType: sessionUserService.notificationType,
    },
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const backgroundImageHandler = (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onCreateImageHTTP({
      file,
      onCreateMediaHandler: mediaService.createMediaByBase64.bind(mediaService),
    })
    setBackgroundImage(acceptedFiles[0]);
  };

  useEffect(() => {
    if (sessionUserService.driverLicence?.medias[0]?.imageUrl) {
      setBackgroundImage(`https://wheels2go-dev.s3.us-west-2.amazonaws.com/${sessionUserService.driverLicence?.medias[0]?.imageUrl}`);
    }
  }, []);

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit((values: PersonalDetailsValues) =>
        authService.registration({
          ...values, payment: {
            cardType: "visa",
            cardNumbers: "3456",
            expDate: "11/22",
            rentalDamageCover: "Yes",
            paymentMethodId: "pm_1K56ZhJxEJIJkRAgzPexv6WC",
          },
          mediaId: license,
          driverLicence: {
            DOB: '2022-01-02T15:39:34.000Z',
            issueDate: '2022-01-02T15:39:34.000Z',
            expDate: '2022-01-02T15:39:34.000Z',
            licenceNumber: "213213ddasdas",
            licences: [license],
          }
        })
      )}
    >
      <section className="register-form__body">
        <section className="register-form__right-section">
          <div className="register-form__block-info">
            <div className="personal-details-form">
              <div className="row justify wrap">
                <div className="column">
                  <h3>Name</h3>
                  <div className="row justify hide-titles">
                    <FormsSelect
                      name="prefix"
                      options={prefixDropdownOptions}
                      className="personal-details-form__prefix d-none"
                      control={control}
                      placeholder="Mr"
                      label={t("client.prefix")}
                    />
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

                  <h3>Notification prefferences</h3>

                  <div className="hide-titles notification-section">
                    <FormsInputRadioGroup
                      radioValues={notificationsPreferencesRadioValues(t)}
                      checked={sessionUserService.notificationType}
                      label={t("client.myNotificationPreferences")}
                    />
                  </div>

                  <div className="driver-license-upload-form">
                    <h3 className="driver-license-upload-form__title">
                      {t("client.yourDriverLicense")}
                    </h3>
                    {newBackgroundImage ? (
                      <ImagePreview
                        image={newBackgroundImage}
                        onRemove={() => setBackgroundImage(undefined)}
                      />
                    ) : (
                      <FilesDropzoneUploader
                        options={{
                          onDrop: backgroundImageHandler,
                          maxSize: MAX_FILE_SIZE,
                          maxFiles: 5,
                          accept: 'image/jpeg, image/png, image/jpg',
                        }}
                      />
                    )}
                  </div>

                  {/*  <h3 className="mt-36">Password</h3>

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
                  </div>*/}

                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </form>
  );
});

export default ReserveNowRegister;
