import { Duration } from "luxon";
import { TFunction } from "i18next";


enum Unit {
  YEAR = "year",
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
  HOUR = "hour",
  MINUTE = "minute",
}

const unitPriority = [
  Unit.YEAR,
  Unit.MONTH,
  Unit.WEEK,
  Unit.DAY,
  Unit.HOUR,
  Unit.MINUTE,
];

const unitSuffixes = {
  [Unit.YEAR]: "ui-kit.year",
  [Unit.MONTH]: "ui-kit.month",
  [Unit.WEEK]: "ui-kit.week",
  [Unit.DAY]: "ui-kit.day",
  [Unit.HOUR]: "ui-kit.hour",
  [Unit.MINUTE]: "ui-kit.minute",
};

export const abbreviateDuration = (duration: Duration, t: TFunction) => {
  let suffix: string = "ui-kit.less_than_a_minute_ago";

  let durationInUnits: number = 0;

  for (let currentUnit of unitPriority) {
    durationInUnits = duration.as(currentUnit);

    if (durationInUnits > 1) {
      suffix = unitSuffixes[currentUnit];
      break;
    }
  }

  return t(suffix, { count: Number(durationInUnits.toFixed()) });
};
