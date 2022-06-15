const suffixes = ["", "K", "M", "G", "T"];

export const abbreviateNumber = (value: number): string => {
  // this part is essential
  // if you remove it you will get endless loop and waste a lot of time to fix it :)
  if (value === Infinity) {
    return "\u221E";
  }

  let newValue = value;
  let suffixNum = 0;

  while (newValue >= 1000) {
    newValue /= 1000;
    suffixNum++;
  }

  // preventing array overflow
  if (suffixes.length <= suffixNum) {
    return value.toString();
  }

  const stringValue = suffixes[suffixNum] ? newValue.toPrecision(3) : newValue;

  return stringValue + suffixes[suffixNum];
};
