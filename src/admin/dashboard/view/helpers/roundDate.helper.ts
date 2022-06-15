type Interval = 'hour' | 'day' | 'month' | 'year';

export const roundDate = (date: Date, interval: Interval): Date => {
  let p;

  switch (interval) {
    case "hour":
      p = 60 * 60 * 1000;
      break
    case "day":
      p = 60 * 60 * 1000 * 24;
      break;
    case "month":
      p = 60 * 60 * 1000 * 24 * 30;
      break;
    case "year":
      p = 60 * 60 * 1000 * 24 * 365;
      break;
  }

  return new Date(Math.round(date.getTime() / p) * p);
}
