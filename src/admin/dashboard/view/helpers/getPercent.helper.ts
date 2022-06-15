export const getPercentage = (partialValue: number, totalValue: number): number => {
  return Math.round((100 * partialValue) / totalValue);
}
