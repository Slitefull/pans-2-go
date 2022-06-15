import React, { FC } from 'react';
import { observer } from "mobx-react";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { useTranslation } from "react-i18next";
import { FormsInputRadioGroup } from "@/ui-kit/components/forms/radio/forms-radio-group.component";
import { notificationsPreferencesRadioValues } from "@/common/constants/options";
import { Control, FieldErrors } from "react-hook-form";

import './third-step.scss';


interface ThirdStepProps {
  control: Control<any>;
  errors: FieldErrors;
  notificationType: string | undefined;
  newNotificationType: (value: string | undefined) => void;
}

const ThirdStep: FC<ThirdStepProps> = observer((
  {
    control,
    errors,
    notificationType,
    newNotificationType,
  }
): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="step-wrapper third-step">
      <h3 className="step-title">
        Add your contacts
      </h3>
      <div className="phone">
        <FormsTextInput
          name="mobilePhone"
          control={control}
          placeholder={t("client.phone")}
          error={errors.mobilePhone?.message}
          type="tel"
        />
      </div>
      <div className="email">
        <FormsTextInput
          name="email"
          control={control}
          placeholder={t("client.email")}
          error={errors.email?.message}
          type="email"
        />
      </div>
      <div className="whats-app">
        <FormsTextInput
          name="whatsAppPhone"
          control={control}
          placeholder={t("client.whatsAppPhone")}
          error={errors.whatsAppPhone?.message}
          type="tel"
        />
      </div>
      <div className="emergency-contact">
        <FormsTextInput
          name="emergencyPhone"
          control={control}
          placeholder={t("client.emergencyContactPhone")}
          error={errors.emergencyPhone?.message}
          type="tel"
        />
      </div>
      <div className="address">
        <FormsTextInput
          name="address"
          control={control}
          placeholder={t("client.address")}
          error={errors.address?.message}
          type="text"
        />
      </div>
      <div className="state">
        <FormsTextInput
          name="state"
          control={control}
          placeholder={t("client.state")}
          error={errors.state?.message}
          type="text"
        />
      </div>
      <div className="zip">
        <FormsTextInput
          name="zip"
          control={control}
          placeholder={t("client.zip")}
          error={errors.zip?.message}
          type="text"
        />
      </div>
      <div className="notification-preferences">
        <FormsInputRadioGroup
          radioValues={notificationsPreferencesRadioValues(t)}
          checked={notificationType}
          setValue={newNotificationType}
          label={t("client.myNotificationPreferences")}
        />
      </div>
    </div>
  );
});

export default ThirdStep;
