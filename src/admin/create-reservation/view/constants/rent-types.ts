import { RentTypes } from "@/common/constants/rentTypes";


interface SelectValues<L = RentTypes, V = RentTypes> {
  label: L;
  value: V;
}

export const RentTypesRecord: Record<RentTypes, SelectValues> = {
  [RentTypes.HOURLY_PARTIAL]: {
    label: RentTypes.HOURLY_PARTIAL,
    value: RentTypes.HOURLY_PARTIAL,
  },
  [RentTypes.DAILY_WEEKLY]: {
    label: RentTypes.DAILY_WEEKLY,
    value: RentTypes.DAILY_WEEKLY,
  },
};

export const RentTypesSelectValues: Array<SelectValues> = Object.values(RentTypesRecord).map((rentType) => ({
  label: rentType.label,
  value: rentType.value,
}))
