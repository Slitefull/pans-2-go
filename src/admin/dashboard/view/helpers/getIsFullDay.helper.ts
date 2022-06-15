import * as Moment from 'moment';
import { extendMoment } from 'moment-range';


export const getIsFullDay = (start: Date, end: Date, selectedDate: Date): boolean => {
  const moment = extendMoment(Moment);
  const range = moment.range(start, end);

  if (range.contains(selectedDate)) {
    const days = Math.ceil(Math.abs(end.getTime() - selectedDate.getTime()) / (1000 * 3600 * 24));
    if (days >= 1) return true;
  }

  return false;
}
