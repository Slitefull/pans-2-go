export function dateConvert(date: Date) {
  const newDate = new Date(date);

  const addZero = (i: number | string) => {
    if (i < 10) {
      i = "0" + i
    }
    return i;
  }

  let hours: any = newDate.getHours();

  let minutes: string | number = newDate.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours  : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${
    +newDate.getMonth() + 1 > 9
      ? +newDate.getMonth() + 1
      : '0' + (+newDate.getMonth() + 1)
  }.${
    newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()
      // "﹕"- it's not a normal ":", it's symbol, so don't remove it! 
  }.${newDate.getFullYear()} ${addZero(hours)}﹕${minutes} ${ampm}`;
}
