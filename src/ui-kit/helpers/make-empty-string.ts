export const makeEmptyString = (lenght: number) => {
  return new Array(lenght).fill("\u00a0").join("");
};
