interface SelectValues<L = AllowedAreasTitles, V = AllowedAreasValues> {
  label: L;
  value: V;
}

export enum AllowedAreasTitles {
  NY = "NYC",
  outNY = "OUT of NYC",
  Brooklyn = "Brooklyn",
}

export enum AllowedAreasValues {
  NY = "NY",
  outNY = "outNY",
  Brooklyn = "Brooklyn",
}

export const AllowedAreasRecord: Record<AllowedAreasValues, SelectValues> = {
  [AllowedAreasValues.Brooklyn]: {
    label: AllowedAreasTitles.Brooklyn,
    value: AllowedAreasValues.Brooklyn,
  },
  [AllowedAreasValues.NY]: {
    label: AllowedAreasTitles.NY,
    value: AllowedAreasValues.NY,
  },
  [AllowedAreasValues.outNY]: {
    label: AllowedAreasTitles.outNY,
    value: AllowedAreasValues.outNY,
  },
};

export const AllowedAreasSelectValues: Array<SelectValues> = Object.values(AllowedAreasRecord).map((area) => ({
  label: area.label,
  value: area.value,
}))
