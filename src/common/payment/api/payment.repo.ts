import { GetAllTransactionsDTO, UpdatePaymentMethodPayload } from "@/common/payment/dto/payment.dto";


export interface PaymentRepository {
  getAllTransactions(): Promise<GetAllTransactionsDTO>;

  refundPayment(charge: string): Promise<void>;

  payByCash(reservationId: string): Promise<void>;

  pay(reservationId: string): Promise<void>;

  attachPaymentMethod(paymentMethodId: string): Promise<void>;

  updatePaymentMethod(
    {
      cardType,
      cardNumbers,
      expDate,
      cardholderName,
      billingZipCode,
      rentalDamageCover
    }: UpdatePaymentMethodPayload): Promise<void>;
}
