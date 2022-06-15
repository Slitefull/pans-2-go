import * as Moment from 'moment';
import { extendMoment } from 'moment-range';


export const getHoursCount = (start: Date | string, end: Date | string): string | number => {
  const moment = extendMoment(Moment);
  const initialRange = moment.range(moment.utc(start), moment.utc(end));

  const hours = Array.from(initialRange.by('hour')).map(h => h.format('k'));
  const minutes = Array.from(initialRange.by('minutes')).map(h => h.format('m'));

  if (minutes.length < 60) return "Less than 1h"

  return hours.length - 1;
}
