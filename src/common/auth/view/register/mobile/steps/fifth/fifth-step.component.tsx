import React, { FC } from 'react';
import { observer } from "mobx-react";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { useTranslation } from "react-i18next";
import { Control, FieldErrors } from "react-hook-form";

import './fifth-step.styles.scss';


interface FifthStepProps {
  control: Control<any>;
  errors: FieldErrors;
}

const FifthStep: FC<FifthStepProps> = observer((
  {
    control,
    errors,
  }
): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div className="step-wrapper fifth-step">
        <h3 className="step-title">
          Add your payment details
        </h3>

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
        <div className="billing-zip-code">
          <FormsTextInput
            name="payment.billingZipCode"
            control={control}
            label={t("auth.billingZipCode")}
            placeholder={t("auth.billingZipCode")}
            labelPrefix="personal-details-form__input__prefix"
            error={errors.payment?.billingZipCode?.message}
            type="text"
          />
        </div>
      </div>

      <div className="step-wrapper password-step">
        <h3 className="step-title">
          Add your password
        </h3>
        <FormsTextInput
          name="password"
          useWrapper
          wrapperPrefix="password"
          className="input-field"
          control={control}
          placeholder={t("client.password")}
          error={errors.password?.message}
          type="password"
        />
        <FormsTextInput
          name="rePassword"
          useWrapper
          wrapperPrefix="repeat-password"
          className="input-field"
          control={control}
          placeholder={t("client.repeatPassword")}
          error={errors.rePassword?.message}
          type="password"
        />
      </div>
    </>
  );
});

export default FifthStep;
