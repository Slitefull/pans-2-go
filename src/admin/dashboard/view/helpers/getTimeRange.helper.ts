import * as ExtendedMoment from 'moment';
import { Moment } from 'moment';
import { extendMoment } from 'moment-range';


export const getTimeRange = (start: Moment, end: Moment) => {
  const moment = extendMoment(ExtendedMoment);
  const initialRange = moment.range(start.utc(), end.utc());
  const mockHoursForFullDay = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];

  const isMoreThanDayHelper = (start: any, end: any) => {
    const diff = end - start;
    const daysCount = diff / (24 * 60 * 60 * 1000);
    return daysCount >= 1;
  }

  const isFullDay = isMoreThanDayHelper(start, end);
  const hours = Array.from(initialRange.by('hour')).map(h => h.format('k'));

  const filteredHours = (hours: Array<string>): Array<string> => {
    if (hours[hours.length - 2] === "23") {
      return hours.filter((hour) => hour != "24");
    }
    return hours;
  }

  const endMinutes = end.minutes();
  const startMinutes = start.minutes();

  return { hours: isFullDay ? mockHoursForFullDay : filteredHours(hours), startMinutes, endMinutes };
}
