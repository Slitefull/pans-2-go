import { CarStatusesForUpdate } from "@/common/constants/carStatusesForUpdate";


type SelectOption<L = CarStatusesForUpdate, V = CarStatusesForUpdate> = {
  label: L,
  value: V,
}

const CarStatusesRecord: Record<CarStatusesForUpdate, SelectOption> = {
  /* [CarStatusesForUpdate.Locked]: {
    label: CarStatusesForUpdate.Locked,
    value: CarStatusesForUpdate.Locked,
  },
  [CarStatusesForUpdate.Unlocked]: {
    label: CarStatusesForUpdate.Unlocked,
    value: CarStatusesForUpdate.Unlocked,
  }, */
  [CarStatusesForUpdate.Pending]: {
    label: CarStatusesForUpdate.Pending,
    value: CarStatusesForUpdate.Pending,
  },
  [CarStatusesForUpdate.Returned]: {
    label: CarStatusesForUpdate.Returned,
    value: CarStatusesForUpdate.Returned,
  },
  [CarStatusesForUpdate.Active]: {
    label: CarStatusesForUpdate.Active,
    value: CarStatusesForUpdate.Active,
  },
  [CarStatusesForUpdate.Available]: {
    label: CarStatusesForUpdate.Available,
    value: CarStatusesForUpdate.Available,
  }
}

export const CarStatuses: Array<SelectOption> = Object.values(CarStatusesRecord)
  .map((status) => ({
    label: status.label,
    value: status.value,
  }))
