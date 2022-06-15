import React, { FC } from 'react';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { useTranslation } from "react-i18next";
import { Control, FieldErrors } from "react-hook-form";

import './payment-details.styles.scss';


interface PaymentDetailsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

const PaymentDetails: FC<PaymentDetailsProps> = (
  {
    control,
    errors,
  }
): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="payment-details">
      <div className="card-number">
        <label>
          {t("ui-kit.card-number")}
          <CardNumberElement/>
        </label>
      </div>
      <div className="cvv">
        <label>
          CVV*
          <CardCvcElement/>
        </label>
      </div>
      <div className="exp-date">
        <label>
          {t("ui-kit.expiration-date")}*
          <CardExpiryElement/>
        </label>
      </div>

      <div className="cardholder-name">
        <FormsTextInput
          name="payment.cardholderName"
          control={control}
          label={t("auth.cardholderName")}
          placeholder={t("auth.cardholderName")}
          type="text"
        />
      </div>

      <div className="zip-code">
        <FormsTextInput
          name="payment.billingZipCode"
          control={control}
          label={t("auth.billingZipCode")}
          placeholder={t("auth.billingZipCode")}
          autoComplete="off"
          type="text"
        />
      </div>
    </div>
  );
};

export default PaymentDetails;
