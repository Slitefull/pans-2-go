import { PaymentStatusesTypes } from "@/common/constants/paymentStatuses";

const getPaymentStatusBackgroundColor = (status: string) => {
  if (status === PaymentStatusesTypes.AwaitingPayment) return "#CC0000"
  return "#339933"
}

export default getPaymentStatusBackgroundColor;
