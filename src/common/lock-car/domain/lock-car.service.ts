import i18next from "i18next";
import { injector } from "@/common/injector/Injector";
import { action, makeAutoObservable } from "mobx";
import { CreateMediaByBase64Values, Media, MediaRepository } from "@/common/media/api/media.repo";
import { ThankYouService } from "@/common/thank-you/domain/thank-you.service";
import { MyReservation } from "@/common/my-reservations/api/my-reservations.repo";
import { History } from "history";
import { MY_RESERVATIONS_PAGE, THANK_YOU_PAGE } from "@/common/constants/routes";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { SocketsUserTypes } from "@/common/sockets/api/sockets.repo";
import { SocketsService } from "@/common/sockets/domain/sockets.service";
import { MyReservationsService } from "@/common/my-reservations/domain/my-reservations.service";
import {
  LockCarRepository,
  LockCarServicePayload,
  UnlockCarServicePayload,
} from "@/common/lock-car/api/lock-car.repo";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { CarService } from "@/common/car/domain/car.service";
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { CarStatusesForUpdate } from "@/common/constants/carStatusesForUpdate";
import { ReservationStatuses } from "@/common/constants/reservationStatuses";
import {
  CAR_SERVICE,
  HISTORY,
  LOCK_CAR_REPOSITORY,
  MEDIA_REPOSITORY,
  MY_RESERVATIONS_SERVICE,
  NOTIFICATION_SERVICE,
  PAYMENT_SERVICE,
  RESERVATION_SERVICE,
  SESSION_USER_SERVICE,
  SOCKETS_SERVICE,
  THANK_YOU_SERVICE
} from "@/common/injector/constants";
import {
  BaseLockCarService,
  UploadEndTripImageIdMethodPayload,
  UploadStartTripImageIdMethodPayload
} from "@/common/lock-car/domain/lock-car.common.service";
import { createDateTimeFoNotificationsHelper } from "@/common/helpers/createDateTimeFoNotifications.helper";
import { PaymentService } from "@/common/payment/domain/payment.service";


export class LockCarService implements BaseLockCarService {
  private _currentStep: number;
  private _selectedReservation: MyReservation | null;
  private _isConfirm: boolean;
  private _selectedPaymentMethod: string;
  private _startTripImages: Array<Media>;
  private _endTripImages: Array<Media>;
  private _isLoadingLockUnlock: boolean;

  constructor() {
    this._currentStep = 1;
    this._selectedReservation = null;
    this._isConfirm = false;
    this._selectedPaymentMethod = '';
    this._startTripImages = [];
    this._endTripImages = [];
    this._isLoadingLockUnlock = false;

    makeAutoObservable(this);
  }

  @action
  public async createStartTripImage(
    values: Array<CreateMediaByBase64Values>
  ): Promise<void> {
    try {
      const { data: createdMediaIds } = await LockCarService._mediaRepo.createMediaByBase64(values);
      this._startTripImages = createdMediaIds;

      LockCarService._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      LockCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async createEndTripTripImage(
    values: Array<CreateMediaByBase64Values>
  ): Promise<void> {
    try {
      const { data: createdMediaIds } = await LockCarService._mediaRepo.createMediaByBase64(values);
      this._endTripImages = createdMediaIds;

      LockCarService._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      LockCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async uploadStartTripImageId(
    {
      reservationId,
      carId,
    }: UploadStartTripImageIdMethodPayload): Promise<void> {
    try {
      await LockCarService._lockCarRepo.uploadStartTripImageId({
        reservationId,
        carId,
        startTripImageId: this._startTripImages[0].id,
      })
    } catch (e) {
      LockCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async uploadEndTripImageId(
    {
      reservationId,
      carId,
    }: UploadEndTripImageIdMethodPayload): Promise<void> {
    try {
      await LockCarService._lockCarRepo.uploadEndTripImageId({
        reservationId,
        carId,
        endTripImageId: this._endTripImages[0].id,
      })
    } catch (e) {
      LockCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async lockCar({ carId, deviceKey, reservationType }: LockCarServicePayload): Promise<void> {
    try {
      this._isLoadingLockUnlock = true;
      await LockCarService._lockCarRepo.lockCar({ carId, deviceKey });
      await LockCarService._myReservationsService.getMyReservationsByType(reservationType)
      LockCarService._notificationService.notify({
        message: "Car was locked successfully!",
        status: "success",
      })
      this._isLoadingLockUnlock = false;
    } catch (e) {
      this._isLoadingLockUnlock = false;
      LockCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async unlockCar({ carId, deviceKey, reservationType }: UnlockCarServicePayload): Promise<void> {
    try {
      this._isLoadingLockUnlock = true;
      await LockCarService._lockCarRepo.unlockCar({ carId, deviceKey })
      await LockCarService._myReservationsService.getMyReservationsByType(reservationType)
      LockCarService._notificationService.notify({
        message: "Car was unlocked successfully!",
        status: "success",
      })
      this._isLoadingLockUnlock = false;
    } catch (e) {
      this._isLoadingLockUnlock = false;
      LockCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async onSubmitLockCar(): Promise<void> {
    try {
      const moment = extendMoment(Moment);
      const start = moment(new Date(this._selectedReservation!.dropOffDateTime)).add(15, 'm').toDate();
      const end = moment(new Date(this._selectedReservation!.dropOffDateTime)).subtract(15, 'm').toDate();
      const range = moment.range(start, end);
      const isInRange = range.contains(new Date());
      const convertedDate = createDateTimeFoNotificationsHelper(new Date());

      if (!this._isConfirm) {
        await LockCarService._socketsService.sendMessage({
          data: `Reservation ended with an Incident - #${this._selectedReservation!.number}/ ${convertedDate} / ${this._selectedReservation?.car.title}!`,
          type: SocketsUserTypes.Admins,
          kind: "error"
        })
      }

      await LockCarService._carService.updateCarStatus({
        carId: this._selectedReservation!.car.id,
        status: CarStatusesForUpdate.Pending
      });
      await LockCarService._reservationService.changeReservationStatus(this._selectedReservation!.id, ReservationStatuses.Past);

      if (isInRange) {
        await LockCarService._socketsService.sendMessage({
          data: `Reservation is ended, and car is locked on ${createDateTimeFoNotificationsHelper(new Date(this._selectedReservation!.dropOffDateTime))}. #${this._selectedReservation!.number} / ${convertedDate} / ${this._selectedReservation?.car.title}`,
          type: SocketsUserTypes.Admins,
          kind: "success"
        })
      } else if (new Date(this.selectedReservation!.dropOffDateTime) > new Date()) {
        await LockCarService._socketsService.sendMessage({
          data: `Reservation was ended not on submitted time (earlier) - #${this._selectedReservation!.number} / ${convertedDate} / ${this._selectedReservation?.car.title}!`,
          type: SocketsUserTypes.Admins,
          kind: "warning"
        })
      } else {
        await LockCarService._socketsService.sendMessage({
          data: `Reservation was ended not on submitted time (later) - #${this._selectedReservation!.number} / ${convertedDate} / ${this._selectedReservation?.car.title}!`,
          type: SocketsUserTypes.Admins,
          kind: "warning"
        })
      }

      await LockCarService._paymentService.pay(this._selectedReservation!.id);

      LockCarService._thankYouService.title = "Thank you!";
      LockCarService._thankYouService.subTitle = "The car is locked, but you still have 30 minutes to lock/unlock the car in case you forgot something";
      LockCarService._thankYouService.buttonText = "Go To My reservations list";
      LockCarService._thankYouService.buttonHandler = () => {
        LockCarService._history.push(MY_RESERVATIONS_PAGE);
      }
      LockCarService._history.push(THANK_YOU_PAGE);
      this.reset();
    } catch (e) {
      LockCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async onSubmitUnlockCar(): Promise<void> {
    try {
      const convertedDate = createDateTimeFoNotificationsHelper(new Date());

      await this.unlockCar({
        carId: this._selectedReservation!.car.id,
        deviceKey: this._selectedReservation!.car.deviceKey,
        reservationType: "upcoming",
      })
      await this.uploadStartTripImageId({
        reservationId: this._selectedReservation!.id,
        carId: this._selectedReservation!.car.id,
      })

      LockCarService._thankYouService.title = "Thank you!";
      LockCarService._thankYouService.subTitle = "Car is unlocked. To extend the reservation time or report an incident, \n" +
        "please call 111-123-4567";
      LockCarService._thankYouService.buttonText = "Go To My reservations list";
      LockCarService._thankYouService.buttonHandler = () => {
        LockCarService._history.push(MY_RESERVATIONS_PAGE);
      }
      await LockCarService._socketsService.sendMessage({
        data: `Car was Unlocked in Time By ${LockCarService._sessionUserService.firstName} 
        ${LockCarService._sessionUserService.lastName} #${this._selectedReservation!.number} / ${convertedDate} / ${this._selectedReservation?.car.title}`,
        type: SocketsUserTypes.Admins,
        kind: "success",
      })
      LockCarService._history.push(THANK_YOU_PAGE);
      this.reset();
    } catch (e) {
      LockCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  reset() {
    this._currentStep = 1;
    this._selectedReservation = null;
    this._startTripImages = [];
    this._endTripImages = [];
    this._isConfirm = false;
    this._selectedPaymentMethod = '';
  }

  get isConfirm(): boolean {
    return this._isConfirm;
  }

  get selectedReservation(): MyReservation | null {
    return this._selectedReservation;
  }

  get currentStep(): number {
    return this._currentStep;
  }

  get selectedPaymentMethod(): string {
    return this._selectedPaymentMethod;
  }

  get endTripImages(): Array<Media> {
    return this._endTripImages;
  }

  get startTripImages(): Array<Media> {
    return this._startTripImages;
  }

  get isLoadingLockUnlock(): boolean {
    return this._isLoadingLockUnlock;
  }

  set isLoadingLockUnlock(value: boolean) {
    this._isLoadingLockUnlock = value;
  }

  set endTripImages(value: Array<Media>) {
    this._endTripImages = value;
  }

  set startTripImages(value: Array<Media>) {
    this._startTripImages = value;
  }

  set selectedPaymentMethod(value: string) {
    this._selectedPaymentMethod = value;
  }

  set isConfirm(value: boolean) {
    this._isConfirm = value;
  }

  set selectedReservation(value: MyReservation | null) {
    this._selectedReservation = value;
  }

  set currentStep(value: number) {
    this._currentStep = value;
  }

  private static get _history() {
    return injector.get<History>(HISTORY);
  }

  private static get _lockCarRepo() {
    return injector.get<LockCarRepository>(LOCK_CAR_REPOSITORY);
  }

  private static get _mediaRepo() {
    return injector.get<MediaRepository>(MEDIA_REPOSITORY);
  }

  private static get _reservationService() {
    return injector.get<ReservationService>(RESERVATION_SERVICE);
  }

  private static get _socketsService() {
    return injector.get<SocketsService>(SOCKETS_SERVICE);
  }

  private static get _myReservationsService() {
    return injector.get<MyReservationsService>(MY_RESERVATIONS_SERVICE);
  }

  private static get _thankYouService() {
    return injector.get<ThankYouService>(THANK_YOU_SERVICE);
  }

  private static get _paymentService() {
    return injector.get<PaymentService>(PAYMENT_SERVICE);
  }

  private static get _carService() {
    return injector.get<CarService>(CAR_SERVICE);
  }

  private static get _sessionUserService() {
    return injector.get<SessionUserService>(SESSION_USER_SERVICE);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }
}
