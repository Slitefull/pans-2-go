import React, { FC, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { injector } from "@/common/injector/Injector";
import { NOTIFICATION_SERVICE, SESSION_USER_SERVICE } from "@/common/injector/constants";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { email, limitedString, onlyNumbers, phone, requiredDate } from "@/ui-kit/helpers/validators";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { onCreateImageHTTP } from "@/common/helpers/onCreateMediaHTTP.helper";
import { isMobile } from "react-device-detect";
import ProfileMobile from "@/client/view/profile/mobile/profile.component";
import ProfileDesktop from "@/client/view/profile/desktop/profile.component";

import "./profile.styles.scss";


export interface PersonalDetailsValues {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  whatsAppPhone: string;
  emergencyPhone: string;
  address: string;
  state: string;
  zip: string;
  notificationType: string;
  payment: Payment;
  driverLicence: DriverLicence;
}

interface Payment {
  cardType: string;
  cardNumbers: string;
  expDate: string;
  rentalDamageCover: string;
  paymentMethodId: string;
  cardholderName: string;
  billingZipCode: string;
}

interface DriverLicence {
  DOB: string | Date;
  issueDate: string | Date;
  expDate: string | Date;
  licences: Array<string>;
  licenceNumber: string;
}

const Profile: FC = observer((): JSX.Element => {
  const { t } = useTranslation();

  const stripe = useStripe();
  const elements = useElements();

  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);
  const notificationService: NotificationService = injector.get(NOTIFICATION_SERVICE);

  const mediaId = sessionUserService.createdProfileImage[0]?.id;
  const driverLicencesIds = sessionUserService.createdDriverLicences.map((media) => media.id);
  const ownDriverLicencesMediaId = sessionUserService.driverLicence!.medias.map((media) => media.id);
  const ownDriverLicencesMediaUrls = sessionUserService.driverLicence!.medias.map((media) => `${process.env.REACT_APP_S3_MEDIA}/${media.imageUrl}`);

  const [show, setShow] = useState<boolean>(true);
  const [selectedNotificationType, setSelectedNotificationType] = useState<string>(sessionUserService.notificationType || "email");
  const [newDriverLicenceImages, setNewDriverLicenceImages] = useState<Array<File | string>>([]);

  const cardNumberElement = elements?.getElement(CardNumberElement);
  const cardExpiryElement = elements?.getElement(CardExpiryElement);
  const cardCvcElement = elements?.getElement(CardCvcElement);

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
    firstName: sessionUserService.firstName,
    lastName: sessionUserService.lastName,
    email: sessionUserService.email,
    mobilePhone: sessionUserService.mobilePhone,
    whatsAppPhone: sessionUserService.whatsAppPhone,
    emergencyPhone: sessionUserService.emergencyPhone,
    address: sessionUserService.address,
    state: sessionUserService.state,
    zip: sessionUserService.zip,
    notificationType: sessionUserService.notificationType,
    payment: sessionUserService.payment,
    driverLicence: {
      DOB: new Date(sessionUserService.driverLicence!.DOB),
      issueDate: new Date(sessionUserService.driverLicence!.issueDate),
      expDate: new Date(sessionUserService.driverLicence!.expDate),
      licenceNumber: sessionUserService.driverLicence!.licenceNumber,
    },
  }

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<PersonalDetailsValues>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = async (values: PersonalDetailsValues) => {
    if (ownDriverLicencesMediaId.length && ownDriverLicencesMediaId.length !== 2) {
      notificationService.notify({ message: "Upload back and front side of driver licence!", status: "error" })
      return;
    }

    if (driverLicencesIds.length && driverLicencesIds.length !== 2) {
      notificationService.notify({ message: "Upload back and front side of driver licence!", status: "error" })
      return;
    }

    if (!show) {
      if (!stripe || !elements) {
        notificationService.notify({ message: "Error with stripe!", status: "error" })
        return;
      }

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement)!,
      });

      await sessionUserService.updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobilePhone: values.mobilePhone,
        whatsAppPhone: values.whatsAppPhone,
        emergencyPhone: values.emergencyPhone,
        zip: values.zip,
        address: values.address,
        state: values.state,
        mediaId,
        notificationType: selectedNotificationType,
        payment: {
          cardType: paymentMethod?.card?.brand! || sessionUserService.payment?.cardType,
          cardNumbers: paymentMethod?.card?.last4! || sessionUserService.payment?.cardNumbers,
          expDate: `${paymentMethod?.card?.exp_month}/${paymentMethod?.card?.exp_year}` || sessionUserService.payment.expDate,
          cardholderName: values.payment.cardholderName!,
          billingZipCode: values.payment.billingZipCode!,
          rentalDamageCover: "Yes",
          paymentMethodId: paymentMethod?.id ? paymentMethod?.id : '',
        },
        driverLicence: {
          DOB: values.driverLicence.DOB,
          issueDate: values.driverLicence.issueDate,
          expDate: values.driverLicence.expDate,
          licenceNumber: values.driverLicence.licenceNumber,
          licences: driverLicencesIds.length ? driverLicencesIds : ownDriverLicencesMediaId,
        }
      })

      setShow(true);
      return;
    }

    await sessionUserService.updateProfile({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobilePhone: values.mobilePhone,
      whatsAppPhone: values.whatsAppPhone,
      emergencyPhone: values.emergencyPhone,
      zip: values.zip,
      address: values.address,
      state: values.state,
      mediaId,
      notificationType: selectedNotificationType,
      payment: {
        cardType: sessionUserService.payment?.cardType,
        cardNumbers: sessionUserService.payment?.cardNumbers,
        expDate: sessionUserService.payment?.expDate,
        cardholderName: values.payment.cardholderName!,
        billingZipCode: values.payment.billingZipCode!,
        rentalDamageCover: "Yes",
      },
      driverLicence: {
        DOB: values.driverLicence.DOB,
        issueDate: values.driverLicence.issueDate,
        expDate: values.driverLicence.expDate,
        licenceNumber: values.driverLicence.licenceNumber,
        licences: driverLicencesIds.length ? driverLicencesIds : ownDriverLicencesMediaId,
      }
    })

    setNewDriverLicenceImages([]);
    setShow(true);
  }

  const backgroundDriverLicenceHandler = (acceptedFiles: Array<File>) => {
    if (acceptedFiles.length === 2) {
      onCreateImageHTTP({
        files: acceptedFiles,
        onCreateMediaHandler: sessionUserService.createDriverLicenceImage.bind(sessionUserService),
      })
      setNewDriverLicenceImages(acceptedFiles);
      return;
    }

    if (acceptedFiles.length === 1) {
      const [file] = acceptedFiles;

      onCreateImageHTTP({
        file,
        onCreateMediaHandler: sessionUserService.createDriverLicenceImage.bind(sessionUserService),
      })
      setNewDriverLicenceImages([...newDriverLicenceImages, file]);
    }
  };

  const removeDriverLicencesHandler = useCallback(() => {
    sessionUserService.deleteUserDriverLicence(ownDriverLicencesMediaId);
    setNewDriverLicenceImages([]);
  }, [sessionUserService, ownDriverLicencesMediaId]);

  const onCancelHandler = () => {
    reset(defaultValues);
    cardNumberElement?.clear();
    cardExpiryElement?.clear();
    cardCvcElement?.clear();
    setSelectedNotificationType(sessionUserService.notificationType || "email")
    setShow(true);
  }

  const onChange = () => setShow(!show);

  useEffect(() => {
    reset(defaultValues)
  }, [sessionUserService.id])

  return (
    <>
      {isMobile
        ? <ProfileMobile
          onSubmitHandler={onSubmitHandler}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          control={control}
          errors={errors}
          selectedNotificationType={selectedNotificationType}
          setSelectedNotificationType={setSelectedNotificationType}
          newDriverLicenceImages={newDriverLicenceImages!}
          ownDriverLicencesMediaUrls={ownDriverLicencesMediaUrls}
          removeDriverLicencesHandler={removeDriverLicencesHandler}
          backgroundDriverLicenceHandler={backgroundDriverLicenceHandler}
          isShowPaymentDetailsForm={show}
          onChangeIsShowPaymentDetailsForm={onChange}
          defaultValues={defaultValues}
        />
        : <ProfileDesktop
          onCancelHandler={onCancelHandler}
          onSubmitHandler={onSubmitHandler}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          control={control}
          errors={errors}
          selectedNotificationType={selectedNotificationType}
          setSelectedNotificationType={setSelectedNotificationType}
          newDriverLicenceImages={newDriverLicenceImages!}
          ownDriverLicencesMediaUrls={ownDriverLicencesMediaUrls}
          removeDriverLicencesHandler={removeDriverLicencesHandler}
          backgroundDriverLicenceHandler={backgroundDriverLicenceHandler}
          isShowPaymentDetailsForm={show}
          onChangeIsShowPaymentDetailsForm={onChange}
          defaultValues={defaultValues}
        />
      }
    </>
  );
});

export default Profile;
