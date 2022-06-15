import moment from "moment";

export const mergeDateTime = (date, time) => {
  return moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss').format();
}
