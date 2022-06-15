import * as yup from "yup";
import { TFunction } from "i18next";
import { DateTime } from "luxon";
import { TestContext } from "yup/lib/util/createValidation";


const PASSWORD_MIN_LENGTH = 8;
const EMAIL_MAX_LENGTH = 100;

export const requiredString = (t: TFunction) =>
  yup.string().nullable().required(t("ui-kit.required_field"));

export const limitedString = (
  t: TFunction,
  options: {
    maxLength: number;
    minLength?: number;
  },
  required = false
) => {
  let string = required ? yup
    .string()
    .max(
      options.maxLength,
      t("ui-kit.value-is-too-long", { length: options.maxLength })
    )//  .typeError(t("ui-kit.required_field"))
    : yup.string()
    .nullable(true)
    .max(
      options.maxLength,
      t("ui-kit.value-is-too-long", { length: options.maxLength })
    );

  if (options.minLength !== undefined) {
    string = string.min(
      options.minLength,
      t("ui-kit.value-is-too-short", { length: options.minLength })
    );
  }

  if (required) {
    string = string.required(t("ui-kit.required_field"));
  }

  return string;
};

export const onlyNumbers = (t: TFunction, options: { maxLength: number }, required = true) =>
  required ? yup
    .string()
    .required(t("ui-kit.required_field"))
    .min(
        1,
        t("ui-kit.required_field")
    )
    .max(
        options.maxLength,
        t("ui-kit.value-is-too-long", { length: options.maxLength })
    )
    .trim()
    .strict(true)
    .matches(/^[0-9\s]*$/g, t("ui-kit.value_should_be_a_valid_number"))
    : yup
    .string()
    .max(
      options.maxLength,
      t("ui-kit.value-is-too-long", { length: options.maxLength })
    )
    .trim()
    .strict(true)
    .nullable(true)
    .matches(/^[0-9\s]*$/g, t("ui-kit.value_should_be_a_valid_number"));

export const phone = (t: TFunction, length: number, required = false) =>
  required
    ? yup
      .string()
      .required(t("ui-kit.required_field"))
      .matches(
        /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
        t("ui-kit.phone-should-be-numeric")
      )
      .max(length, t("ui-kit.value-is-too-long", { length }))
    : yup
      .string()
      .nullable(true)
      .matches(
        /^$|^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
        t("ui-kit.phone-should-be-numeric")
      )
      .max(length, t("ui-kit.value-is-too-long", { length }));

export const checkedCheckbox = (t: TFunction) =>
  yup.boolean().oneOf([true], t("ui-kit.accept_terms"));

export const email = (t: TFunction, required = false) => {
  let email = yup
    .string()
    .email(t("ui-kit.not_valid_email"))
    .max(
      EMAIL_MAX_LENGTH,
      t("ui-kit.email_max_length", { length: EMAIL_MAX_LENGTH })
    );

  if (required) {
    email = email.required(t("ui-kit.required_field"));
  }

  return email;
};

export const password = (t: TFunction) =>
  yup
    .string()
    .required(t("ui-kit.required_field"))
    .min(
      PASSWORD_MIN_LENGTH,
      t("ui-kit.password_min_length", { length: PASSWORD_MIN_LENGTH })
    )
    .matches(
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/gi,
      t("ui-kit.required_one_letter_digit_special_character")
    );

export const confirmPassword = (t: TFunction, rePasswordRef: string) =>
  yup
    .string()
    .required(t("ui-kit.required_field"))
    .oneOf([yup.ref(rePasswordRef)], ' ');

export const confirmRePassword = (t: TFunction, passwordRef: string) =>
  yup
    .string()
    .required(t("ui-kit.required_field"))
    .oneOf([yup.ref(passwordRef)], t("ui-kit.passwords_doesnt_match"));

export const requiredNumber = (t: TFunction, options: { maxLength: number, validationMessage?: string, required?: boolean }) =>
  options.required
    ? yup
      .string()
      .transform(value => !value ? null : value)
      .nullable()
      .required(t("ui-kit.required_field"))
      .max(
        options.maxLength,
        options.maxLength === 1
          ? t("ui-kit.value-is-too-long-1s", { length: options.maxLength })
          : t("ui-kit.value-is-too-long", { length: options.maxLength })
      )
      .trim()
      .matches(
        /^(\d)+([.,]((\d)+)?)?$/g,
        options.validationMessage ? options.validationMessage : t("ui-kit.value_should_be_a_valid_number")
      )
    : yup
      .string()
      .transform(value => !value ? null : value)
      .nullable()
      .max(
        options.maxLength,
        options.maxLength === 1
          ? t("ui-kit.value-is-too-long-1s", { length: options.maxLength })
          : t("ui-kit.value-is-too-long", { length: options.maxLength })
      )
      .trim()
      .matches(
        /^(\d)+([.,]((\d)+)?)?$/g,
        options.validationMessage ? options.validationMessage : t("ui-kit.value_should_be_a_valid_number")
      )

export const number = (t: TFunction, options: { maxLength: number }) =>
  yup
    .string()
    .max(
      options.maxLength,
      t("ui-kit.value-is-too-long", { length: options.maxLength })
    )
    .trim()
    .matches(
      /^(\d)+([.,]((\d)+)?)?$/g,
      t("ui-kit.value_should_be_a_valid_number")
    );

export const requiredDate = (
  fieldName: string,
  t: TFunction,
  options?: { biggerThan?: string; biggerThanFieldLabel?: string }
) =>
  yup.date().test(fieldName, (value: any, context: TestContext) => {
    const date = DateTime.fromJSDate(value as Date);

    if (!date?.isValid) {
      return context.createError({
        message: t("ui-kit.required_field"),
      });
    }

    if (options?.biggerThan) {
      const secondDate = DateTime.fromJSDate(
        context.resolve(yup.ref<Date>(options?.biggerThan))
      );
      return (
        (secondDate.isValid && date.isValid && date > secondDate) ||
        context.createError({
          message: t("ui-kit.date_should_be_bigger_than", {
            name: options.biggerThanFieldLabel,
          }),
        })
      );
    }

    return true;
  }).typeError(t('ui-kit.required_field'));

export const maxDate = (
  t: TFunction,
  options?: { biggerThan?: Date; validationMessage: string },
  required = false,
) => {
  let date = yup.date().min(options?.biggerThan, options?.validationMessage).nullable();

  if (required) {
    date = date.required(t("ui-kit.required_field"));
  }

  return date;
}

export const minDate = (
  t: TFunction,
  options?: { lessThan?: Date; validationMessage: string },
  required = false,
) => {
  let date = yup.date().max(options?.lessThan, options?.validationMessage).nullable();

  if (required) {
    date = date.required(t("ui-kit.required_field"));
  }

  return date;
}

