import React, { FC, useCallback } from 'react';
import { observer } from "mobx-react";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { FormsInputRadio } from "@/ui-kit/components/forms/radio/forms-radio.component";
import { useTranslation } from "react-i18next";
import { CustomerService } from "@/admin/customer/domain/customer.service";
import { injector } from "@/common/injector/Injector";
import { CUSTOMER_SERVICE } from "@/common/injector/constants";
import { NotificationPreferences, NotificationPreferencesValues } from "@/common/constants/notificationPreferences";
import { Control, FieldErrors } from "react-hook-form";

import './personal-details.styles.scss';


interface PersonalDetailsFormProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

const PersonalDetailsForm: FC<PersonalDetailsFormProps> = observer(({ control, errors }): JSX.Element => {
  const { t } = useTranslation();
  const customerService: CustomerService = injector.get(CUSTOMER_SERVICE);

  const onSetNotificationPreferenceHandler = useCallback((notificationType: NotificationPreferencesValues) => {
    customerService.selectedNotificationType = notificationType;
  }, [customerService])

  return (
    <div className="personal-details-form">
      <div>
        <h3 className="title">
          Name
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
          Contacts
        </h3>
        <div className="contacts-container">
          <FormsTextInput
            name="email"
            control={control}
            wrapperPrefix="email"
            className="personal-details-form__input"
            placeholder={t("client.email")}
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
            error={errors.zip?.message}
            useWrapper
            type="text"
          />
          <FormsTextInput
            name="state"
            control={control}
            wrapperPrefix="place"
            className="personal-details-form__input"
            placeholder={t("client.state")}
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
            error={errors.address?.message}
            useWrapper
            type="text"
          />
        </div>

        <div className="my-notification-preferences">
          <h3 className="title">
            My Notification Preferences
          </h3>
          <div className="my-notification-preferences__options">
            {NotificationPreferences.map((notification) => (
              <FormsInputRadio
                name="notificationType"
                value={notification.value}
                label={notification.label}
                checked={customerService.selectedNotificationType === notification.value}
                onClickHandler={() => onSetNotificationPreferenceHandler(notification.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PersonalDetailsForm;
