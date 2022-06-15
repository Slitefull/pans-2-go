import React, { FC, useCallback, useState } from 'react';
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { injector } from "@/common/injector/Injector";
import { AUTH_SERVICE, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { AuthService } from "@/common/auth/domain/auth.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { isMobile } from 'react-device-detect';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { Payment } from "@/common/auth/api/dto/auth.dto";
import RegisterDesktop from "@/common/auth/view/register/desktop/register.component";
import RegisterMobile from './mobile/register.component';
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import {
  confirmPassword,
  confirmRePassword,
  email,
  limitedString,
  onlyNumbers,
  phone,
  requiredDate
} from '@/ui-kit/helpers/validators';


export interface PersonalDetailsValues {
  mediaId: string;
  email: string;
  password: string;
  rePassword: string;
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
  payment: Payment;
  driverLicence: DriverLicence;
}

interface DriverLicence {
  DOB: Date | string;
  issueDate: Date | string;
  expDate: Date | string;
  licenceNumber: string;
  licences: Array<string>;
}

const Register: FC = observer((): JSX.Element => {
  const { t } = useTranslation();

  const stripe = useStripe();
  const elements = useElements();

  const authService: AuthService = injector.get(AUTH_SERVICE);
  const notificationService: NotificationService = injector.get(NOTIFICATION_SERVICE);

  const driverLicenceMedia = authService.driverLicenceMedias;
  const driverLicenceMediaIds = driverLicenceMedia.map((media) => media.id);

  const [newDriverLicenceImages, setNewDriverLicenceImages] = useState<Array<File | string>>([]);
  const [typeNotification, setTypeNotification] = useState<string | undefined>("sms");

  const validationSchema = yup.object().shape({
    firstName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    lastName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    mobilePhone: phone(t, 30, true),
    email: email(t, true),
    password: confirmPassword(t, "rePassword"),
    rePassword: confirmRePassword(t, "password"),
    whatsAppPhone: phone(t, 30),
    emergencyPhone: phone(t, 30),
    address: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    state: limitedString(t, { minLength: 0, maxLength: 200 }, true),
    zip: onlyNumbers(t, { maxLength: 5 }, true),
    payment: yup.object().shape({
      cardholderName: limitedString(t, { maxLength: 30 }, false),
      billingZipCode: onlyNumbers(t, { maxLength: 5 }, false),
    }),
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
        onCreateMediaHandler: authService.createDriverLicenceImage.bind(authService),
      })
      setNewDriverLicenceImages(acceptedFiles);
      return;
    }

    if (acceptedFiles.length === 1) {
      const [file] = acceptedFiles;

      onCreateImageHTTP({
        file,
        onCreateMediaHandler: authService.createDriverLicenceImage.bind(authService),
      })
      setNewDriverLicenceImages([...newDriverLicenceImages, file]);
    }
  };

  const removeDriverLicencesHandler = useCallback(() => {
    setNewDriverLicenceImages([]);
    authService.driverLicenceMedias = [];
  }, []);

  const onSubmitHandler = async (values: PersonalDetailsValues) => {
    if (!stripe || !elements) {
      notificationService.notify({ message: "Error with stripe!", status: "error" })
      return;
    }

    if (driverLicenceMediaIds.length < 2) {
      notificationService.notify({
        message: "Upload front and back side of your driving license!",
        status: "error"
      })
      return;
    }

    if (!driverLicenceMediaIds.length) {
      notificationService.notify({ message: "Upload your driver licence!", status: "error" })
      return;
    }

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)!,
    });

    if (!paymentMethod) {
      notificationService.notify({ message: "Fill your payment details!", status: "error" })
      return;
    }

    await authService.registration({
      email: values.email,
      password: values.password,
      rePassword: values.rePassword,
      firstName: values.firstName,
      lastName: values.lastName,
      mobilePhone: values.mobilePhone,
      whatsAppPhone: values.whatsAppPhone,
      emergencyPhone: values.emergencyPhone,
      address: values.address,
      state: values.state,
      zip: values.zip,
      notificationType: typeNotification || "sms",
      payment: {
        cardType: paymentMethod.card?.brand!,
        cardNumbers: paymentMethod.card?.last4!,
        expDate: `${paymentMethod.card?.exp_month}/${paymentMethod.card?.exp_year}`,
        rentalDamageCover: 'Yes',
        cardholderName: values?.payment?.cardholderName,
        billingZipCode: values?.payment?.billingZipCode,
        paymentMethodId: paymentMethod.id,
      },
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
    <>
      {isMobile
        ? <RegisterMobile
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          control={control}
          onSubmitHandler={onSubmitHandler}
          errors={errors}
          notificationType={typeNotification}
          newDriverLicenceImages={newDriverLicenceImages}
          setNewDriverLicenceImages={setNewDriverLicenceImages}
          newNotificationType={setTypeNotification}
          backgroundDriverLicenceHandler={backgroundDriverLicenceHandler}
          removeDriverLicencesHandler={removeDriverLicencesHandler}
        />
        : <RegisterDesktop
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          control={control}
          onSubmitHandler={onSubmitHandler}
          errors={errors}
          notificationType={typeNotification}
          newDriverLicenceImages={newDriverLicenceImages}
          setNewDriverLicenceImages={setNewDriverLicenceImages}
          newNotificationType={setTypeNotification}
          backgroundDriverLicenceHandler={backgroundDriverLicenceHandler}
          removeDriverLicencesHandler={removeDriverLicencesHandler}
        />
      }
    </>
  );
});

export default Register;
