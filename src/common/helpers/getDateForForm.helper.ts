export const getDateForForm = (date: Date | string) => {
  const convertedDate = new Date(date);

  const d = convertedDate.getDate();
  const m = convertedDate.getMonth() + 1;
  const y = convertedDate.getFullYear();

  return y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
