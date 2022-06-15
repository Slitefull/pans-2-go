import { api } from "@/common/api";
import { GetAllTransactionsDTO, UpdatePaymentMethodPayload } from "../dto/payment.dto";
import { PaymentRepository } from "./payment.repo";


export class HttpPaymentRepository implements PaymentRepository {
  async getAllTransactions(): Promise<GetAllTransactionsDTO> {
    return api.get(`/payment/transactions`);
  }

  async refundPayment(charge: string): Promise<void> {
    return api.get(`/payment/refund/${charge}`);
  }

  async payByCash(reservationId: string): Promise<void> {
    await api.post("/payment/byCash", { reservationId });
  }

  async pay(reservationId: string): Promise<void> {
    await api.post("/payment", { reservationId });
  }

  async attachPaymentMethod(paymentMethodId: string): Promise<void> {
    await api.post("/payment/attach", { paymentMethodId });
  }

  async updatePaymentMethod(
    {
      cardType,
      cardNumbers,
      expDate,
      cardholderName,
      billingZipCode,
      rentalDamageCover
    }: UpdatePaymentMethodPayload): Promise<void> {
    await api.put("/payment/byUser", {
      cardType,
      cardNumbers,
      expDate,
      cardholderName,
      billingZipCode,
      rentalDamageCover,
    });
  }
}
