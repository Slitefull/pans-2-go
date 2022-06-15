import { TFunction } from "i18next";
import { BodyTypes } from "@/common/constants/bodyTypes";
import { CarStatusesTypes } from "@/common/constants/carStatuses";
import { FuelTypes } from "./fuelTypes";
import { CoverageTypes } from "./coverageTypes";
import { States } from "@/common/constants/states";
import { CustomerStatuses } from "@/common/constants/customerStatuses";


export const prefixDropdownOptions = [
  {
    id: "Mr",
    value: "Mr.",
  },
  {
    id: "Mrs",
    value: "Mrs.",
  },
  {
    id: "Miss",
    value: "Miss.",
  },
];

export const createNewCarYearOptions = [
  {
    label: (new Date().getFullYear()).toString(),
    value: (new Date().getFullYear()).toString(),
  },
  {
    label: (new Date().getFullYear() - 1).toString(),
    value: (new Date().getFullYear() - 1).toString(),
  },
  {
    label: (new Date().getFullYear() - 2).toString(),
    value: (new Date().getFullYear() - 2).toString(),
  },
  {
    label: (new Date().getFullYear() - 3).toString(),
    value: (new Date().getFullYear() - 3).toString(),
  },
  {
    label: (new Date().getFullYear() - 4).toString(),
    value: (new Date().getFullYear() - 4).toString(),
  },
  {
    label: (new Date().getFullYear() - 5).toString(),
    value: (new Date().getFullYear() - 5).toString(),
  },
  {
    label: (new Date().getFullYear() - 6).toString(),
    value: (new Date().getFullYear() - 6).toString(),
  },
  {
    label: (new Date().getFullYear() - 7).toString(),
    value: (new Date().getFullYear() - 7).toString(),
  },
  {
    label: (new Date().getFullYear() - 8).toString(),
    value: (new Date().getFullYear() - 8).toString(),
  },
  {
    label: (new Date().getFullYear() - 9).toString(),
    value: (new Date().getFullYear() - 9).toString(),
  },
  {
    label: (new Date().getFullYear() - 10).toString(),
    value: (new Date().getFullYear() - 10).toString(),
  },
  {
    label: (new Date().getFullYear() - 11).toString(),
    value: (new Date().getFullYear() - 11).toString(),
  },
  {
    label: (new Date().getFullYear() - 12).toString(),
    value: (new Date().getFullYear() - 12).toString(),
  },
  {
    label: (new Date().getFullYear() - 13).toString(),
    value: (new Date().getFullYear() - 13).toString(),
  },
  {
    label: (new Date().getFullYear() - 14).toString(),
    value: (new Date().getFullYear() - 14).toString(),
  },
  {
    label: (new Date().getFullYear() - 15).toString(),
    value: (new Date().getFullYear() - 15).toString(),
  },
];

export const notificationsPreferencesRadioValues = (t: TFunction) => [
  {
    label: t("client.email"),
    value: "email",
  },
  /* {
    label: t("client.whatsApp"),
    value: "whatsApp",
  }, */
  {
    label: t("client.sms"),
    value: "sms",
  },
];

export const carTypesValues = (t: TFunction) => [
  {
    label: t("cars.allCarTypes"),
    value: null,
  },
  {
    label: t("cars.standard"),
    value: BodyTypes.standard,
  },
  {
    label: t("cars.suv"),
    value: BodyTypes.suv,
  },
  {
    label: t("cars.van"),
    value: BodyTypes.van,
  },
];

export const allTimesRanges = [
  {
    label: "All times range",
    value: null,
  },
  {
    label: "Before-7am",
    value: 1,
  },
  {
    label: "7am-8:59am",
    value: 2,
  },
  {
    label: "9am-11:59am",
    value: 3,
  },
  {
    label: "12pm-3:59pm",
    value: 4,
  },
  {
    label: "4:00pm-5:59pm",
    value: 5,
  },
  {
    label: "6:00pm-8:59pm",
    value: 6,
  },
  {
    label: "9pm-After",
    value: 7,
  },
];

export const carStatusesDropdownValues = (t: TFunction) => [
  {
    label: t("cars.locked"),
    value: CarStatusesTypes.Locked,
  },
  {
    label: t("cars.unlocked"),
    value: CarStatusesTypes.Unlocked,
  },
  {
    label: t("cars.active"),
    value: CarStatusesTypes.Active,
  },
  {
    label: t("cars.available"),
    value: CarStatusesTypes.Available,
  },
];

export const carStatusesValues = (t: TFunction) => [
  {
    label: t("cars.allStatuses"),
    value: '',
  },
  /* {
    label: t("cars.locked"),
    value: CarStatusesTypes.Locked,
  },
  {
    label: t("cars.unlocked"),
    value: CarStatusesTypes.Unlocked,
  }, */
  {
    label: t("cars.pending"),
    value: CarStatusesTypes.Pending,
  },
  {
    label: t("cars.returned"),
    value: CarStatusesTypes.Returned,
  },
  {
    label: t("cars.active"),
    value: CarStatusesTypes.Active,
  },
  {
    label: t("cars.available"),
    value: CarStatusesTypes.Available,
  },
];

export const fuelTypesValues = [
  {
    label: FuelTypes.gas,
    value: FuelTypes.gas,
  },
  {
    label: FuelTypes.petrol,
    value: FuelTypes.petrol,
  },
  {
    label: FuelTypes.hybrid,
    value: FuelTypes.hybrid,
  },
  {
    label: FuelTypes.electro,
    value: FuelTypes.electro,
  },
];

export const CoverageTypesValues = [
  {
    label: CoverageTypes.Standard,
    value: CoverageTypes.Standard,
  },
];

export const StateValues = [
  {
    label: States.NY,
    value: States.NY,
  },
];

export const customerStatusValues = [
  {
    label: "All",
    value: '',
  },
  {
    label: CustomerStatuses.New,
    value: CustomerStatuses.New,
  },
  {
    label: CustomerStatuses.Active,
    value: CustomerStatuses.Active,
  },
  {
    label: CustomerStatuses.Blocked,
    value: CustomerStatuses.Blocked,
  },
  {
    label: CustomerStatuses.Pending,
    value: CustomerStatuses.Pending,
  },
];
