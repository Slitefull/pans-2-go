import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { Button } from "@/ui-kit/components/button/button.component";
import { injector } from "@/common/injector/Injector";
import { MEDIA_SERVICE, SESSION_USER_SERVICE } from "@/common/injector/constants";
import { email, limitedString, phone, } from "@/ui-kit/helpers/validators";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { MediaService } from "@/common/media/domain/media.service";

import "./personal-details.styles.scss";


interface PersonalDetailsValues {
  firstName: string,
  lastName: string,
  email: string,
  mobilePhone: string,
  prefix: string,
  mediaId: string
}

const PersonalDetailsForm: FC = observer((): JSX.Element => {
  const { t } = useTranslation();

  const mediaService: MediaService = injector.get(MEDIA_SERVICE);
  const sessionUserService: SessionUserService = injector.get(SESSION_USER_SERVICE);

  const avatar = mediaService.createdMediaIds[0]?.id;

  const validationSchema = yup.object().shape({
    prefix: limitedString(t, { minLength: 0, maxLength: 5 }, true),
    firstName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    lastName: limitedString(t, { minLength: 0, maxLength: 400 }, true),
    mobilePhone: phone(t, 30, true),
    email: email(t, true),
  });

  const defaultValues = {
    firstName: sessionUserService.firstName,
    lastName: sessionUserService.lastName,
    email: sessionUserService.email,
    mobilePhone: sessionUserService.mobilePhone,
    prefix: sessionUserService.prefix || "Mr",
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

  useEffect(() => {
    reset(defaultValues)
  }, [sessionUserService.id])

  return (
    <div className="personal-details-form">
      <form onSubmit={handleSubmit((values: PersonalDetailsValues) =>
        sessionUserService.updateProfile({ ...values, mediaId: avatar })
      )}>
        <h3 className="title">
          {t("admin.name")}
        </h3>
        <div className="name-container">
          <FormsTextInput
            name="firstName"
            className="first-name"
            control={control}
            placeholder={t("admin.firstName")}
            error={errors.firstName?.message}
            type="text"
          />
          <FormsTextInput
            name="lastName"
            className="last-name"
            control={control}
            placeholder={t("admin.lastName")}
            error={errors.lastName?.message}
            type="text"
          />
        </div>

        <h3 className="title">
          {t("admin.contacts")}
        </h3>
        <div className="contacts-container">
          <FormsTextInput
            name="email"
            control={control}
            className="email"
            placeholder={t("admin.email")}
            error={errors.email?.message}
            type="text"
          />
          <FormsTextInput
            name="mobilePhone"
            control={control}
            className="phone"
            placeholder={t("admin.phone")}
            error={errors.mobilePhone?.message}
            type="text"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          color="primary"
          style={{ margin: '30px 0' }}
        >
          {t("ui-kit.upload").toUpperCase()}
        </Button>
      </form>
    </div>
  );
});

export default PersonalDetailsForm;
