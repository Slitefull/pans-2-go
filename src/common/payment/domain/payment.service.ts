import { action, makeAutoObservable } from "mobx";
import { injector } from "@/common/injector/Injector";
import { NOTIFICATION_SERVICE, PAYMENT_REPOSITORY } from "@/common/injector/constants";
import { PaymentRepository } from "@/common/payment/api/payment.repo";
import { BasePaymentService } from "@/common/payment/domain/payment.common.repo";
import { UpdatePaymentMethodPayload } from "@/common/payment/dto/payment.dto";
import { NotificationService } from "@/infrastructure/notification/notification.service";


export class PaymentService implements BasePaymentService {
  constructor() {
    makeAutoObservable(this);
  }

  @action
  public async getAllTransactions(): Promise<void> {
    try {
      await this._paymentRepo.getAllTransactions();
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async refundPayment(charge: string): Promise<void> {
    try {
      await this._paymentRepo.refundPayment(charge);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async payByCash(reservationId: string): Promise<void> {
    try {
      await this._paymentRepo.payByCash(reservationId);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async pay(reservationId: string): Promise<void> {
    try {
      await this._paymentRepo.pay(reservationId);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async attachPaymentMethod(paymentMethodId: string): Promise<void> {
    try {
      await this._paymentRepo.attachPaymentMethod(paymentMethodId);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async updatePaymentMethod(
    {
      cardType,
      cardNumbers,
      expDate,
      cardholderName,
      billingZipCode,
      rentalDamageCover
    }: UpdatePaymentMethodPayload): Promise<void> {
    try {
      await this._paymentRepo.updatePaymentMethod({
        cardType,
        cardNumbers,
        expDate,
        cardholderName,
        billingZipCode,
        rentalDamageCover
      });
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  private get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private get _paymentRepo() {
    return injector.get<PaymentRepository>(PAYMENT_REPOSITORY);
  }
}
