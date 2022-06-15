import { CustomerStatuses } from "@/common/constants/customerStatuses";


const getCustomerStatusBackgroundColorAdmin = (status: string) => {
  if (status === CustomerStatuses.Active) return "#333333"
  if (status === CustomerStatuses.Blocked) return "#CC0000"
  if (status === CustomerStatuses.Pending) return "#333333"
  return "#339933"
}

export default getCustomerStatusBackgroundColorAdmin;
