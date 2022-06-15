import React, { FC } from 'react';
import { FormsCustomSelect } from "@/ui-kit/components/forms/select/custom-select.component";
import { createNewCarYearOptions, fuelTypesValues } from "@/common/constants/options";
import { FormsTextInput } from "@/ui-kit/components/forms/text-input/forms-text-input.component";
import { useTranslation } from "react-i18next";
import { Control, FieldErrors } from "react-hook-form";
import { observer } from "mobx-react";
import specificationIcon from "@/ui-kit/icons/edit-page/specification.svg";
import generalInfoIcon from "@/ui-kit/icons/edit-page/general-info.svg";


interface SpecificationProps {
  control: Control<any>;
  errors: FieldErrors;
  isDisabledField: boolean;
  convertedCarsCategories: Array<FormSelect>;
  convertedCarMakes: Array<FormSelect>;
  defaultYear: FormSelect;
  defaultMake: FormSelect;
}

interface FormSelect {
  label: any;
  value: any;
}

const Specification: FC<SpecificationProps> = observer((
  {
    control,
    errors,
    isDisabledField,
    convertedCarsCategories,
    convertedCarMakes,
    defaultYear,
    defaultMake,
  }
): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <section className="general-info">
        <p className="section-title">
          <img
            className="title-icon"
            src={generalInfoIcon}
            alt="General Info"
          />
          {t("admin.generalInfo")}
        </p>
        <div className="container-first">
          <FormsTextInput
            name="title"
            control={control}
            className="car-title"
            label={t("admin.title")}
            placeholder={t("admin.title")}
            error={errors.title?.message}
            disabled={isDisabledField}
            type="text"
          />
          <FormsTextInput
            name="plateNumber"
            control={control}
            className="plate-number"
            label={t("admin.plateNumber")}
            placeholder={t("admin.plateNumber")}
            error={errors.plateNumber?.message}
            disabled={isDisabledField}
            type="text"
          />
          <FormsTextInput
            name="VIN"
            control={control}
            className="vin"
            label={t("admin.vin")}
            placeholder={t("admin.vin")}
            error={errors.VIN?.message}
            disabled={isDisabledField}
            type="text"
          />
        </div>
      </section>
      <section className="specification">
        <p className="section-title">
          <img
            className="title-icon"
            src={specificationIcon}
            alt="Specification"
          />
          {t("admin.specification")}
        </p>
        <div className="container-first">
          <FormsCustomSelect
            name="makeId"
            className="make"
            defaultValue={defaultMake}
            label={t("admin.make")}
            control={control}
            options={convertedCarMakes}
            isDisabled={isDisabledField}
            error={errors.makeId?.message}
          />
          <FormsCustomSelect
            name="categoryId"
            options={convertedCarsCategories}
            className="body-type"
            control={control}
            label={t("admin.bodyType")}
            isDisabled={isDisabledField}
            error={errors.categoryId?.message}
          />
          <FormsCustomSelect
            name="fuelType"
            options={fuelTypesValues}
            className="fuel-type"
            control={control}
            label={t("admin.fuelType")}
            isDisabled={isDisabledField}
            error={errors.fuelType?.message}
          />
        </div>

        <div className="container-second">
          <FormsTextInput
            name="model"
            control={control}
            className="model"
            label={t("admin.model")}
            placeholder={t("admin.model")}
            error={errors.model?.message}
            disabled={isDisabledField}
            type="text"
          />

          <FormsCustomSelect
            name="year"
            options={createNewCarYearOptions}
            defaultValue={defaultYear}
            control={control}
            className="year"
            label={t("admin.year")}
            isDisabled={isDisabledField}
            error={errors.year?.message}
          />
        </div>

        <div className="container-third">
          <FormsTextInput
            name="doors"
            control={control}
            className="doors"
            label={t("admin.doors")}
            placeholder={t("admin.doors")}
            error={errors.doors?.message}
            disabled={isDisabledField}
            type="text"
          />
          <FormsTextInput
            name="seats"
            control={control}
            className="seats"
            label={t("admin.seats")}
            placeholder={t("admin.seats")}
            error={errors.seats?.message}
            disabled={isDisabledField}
            type="text"
          />
          <FormsTextInput
            name="color"
            control={control}
            className="color"
            label={t("admin.color")}
            placeholder={t("admin.color")}
            error={errors.color?.message}
            disabled={isDisabledField}
            type="text"
          />
        </div>
      </section>
    </>
  );
});

export default Specification;
