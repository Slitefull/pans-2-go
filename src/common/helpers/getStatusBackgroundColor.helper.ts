import { CarStatusesTypes } from "@/common/constants/carStatuses";

const getStatusBackgroundColor = (status: string) => {
  if (status === CarStatusesTypes.Locked) return "#333333"
  if (status === CarStatusesTypes.Unlocked) return "#333333"
  if (status === CarStatusesTypes.Active) return "#339933"
  return "#919191"
}

export default getStatusBackgroundColor;
