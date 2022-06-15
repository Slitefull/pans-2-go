export const createDateTimeFoNotificationsHelper = (date: Date | string) => {
  const newDate = new Date(date);

  const options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    hour12: true, // время в AM-PM формате
    minute: 'numeric',
  };

  return newDate.toLocaleString('en-US', options).split(':').join('﹕');
}
