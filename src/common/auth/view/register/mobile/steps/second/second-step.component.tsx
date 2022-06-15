import React, { FC } from 'react';
import { observer } from "mobx-react";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import './second-step.styles.scss';


interface SecondStepProps {
  control: Control<any>;
  errors: FieldErrors;
}

const SecondStep: FC<SecondStepProps> = observer((
  {
    control,
    errors,
  }
): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="step-wrapper second-step">
      <h3 className="step-title">
        Add your name
      </h3>
      <FormsTextInput
        name="firstName"
        control={control}
        placeholder={t("client.firstName")}
        error={errors.firstName?.message}
        type="text"
      />
      <FormsTextInput
        name="lastName"
        control={control}
        placeholder={t("client.lastName")}
        error={errors.lastName?.message}
        type="text"
      />
    </div>
  );
});

export default SecondStep;
