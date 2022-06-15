import { DateTime } from "luxon";
import { TFunction } from "i18next";


const YEARS_RANGE = 120;

export const yearOptions = new Array(YEARS_RANGE)
  .fill(1)
  .map((val, index) => {
    const year =
      DateTime.local().minus({ years: YEARS_RANGE - 1 }).year + index;
    return {
      id: year,
      value: year,
    };
  })
  .reverse();

export const monthOptions = (t: TFunction) =>
  [
    t("ui-kit.jan"),
    t("ui-kit.feb"),
    t("ui-kit.mar"),
    t("ui-kit.apr"),
    t("ui-kit.may"),
    t("ui-kit.jun"),
    t("ui-kit.jul"),
    t("ui-kit.aug"),
    t("ui-kit.sep"),
    t("ui-kit.oct"),
    t("ui-kit.nov"),
    t("ui-kit.dec"),
  ].map((name, index) => ({
    id: index + 1,
    value: name,
  }));

export const daysOptions = (year: number, month: number) => {
  return new Array(DateTime.local(year, month).daysInMonth)
    .fill(1)
    .map((val, index) => ({
      id: index + 1,
      value: index + 1,
    }));
};
