import i18next from "i18next";
import { action, makeAutoObservable } from "mobx";
import { BaseReservationService } from "@/common/reservation/domain/reservation.common.repo";
import { injector } from "@/common/injector/Injector";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { SessionUserDto } from "@/common/session-user/api/dto/session-user.dto";
import { Reservation } from "@/admin/reservation/domain/dto/reservation.dto";
import { Media } from "@/common/media/api/media.repo";
import { BaseCar } from "@/common/car/api/dto/car.dto";
import { RentTypes } from "@/common/constants/rentTypes";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";
import { ChangePaymentType, HourlyPackage, ReservationRepository } from "@/common/reservation/api/reservation.repo";
import { BodyTypes } from "@/common/constants/bodyTypes";
import { PaymentStatusesTypes } from "@/common/constants/paymentStatuses";
import { PaymentTypes } from "@/common/constants/paymentTypes";
import { ThankYouService } from "@/common/thank-you/domain/thank-you.service";
import { MY_RESERVATIONS_PAGE, THANK_YOU_PAGE } from "@/common/constants/routes";
import { History } from "history";
import { AdditionalRequestValues } from "@/common/constants/additionalRequests";
import { MyReservationsService } from "@/common/my-reservations/domain/my-reservations.service";
import { ReservationTypes } from "@/common/constants/reservationTypes";
import { SocketsService } from "@/common/sockets/domain/sockets.service";
import { SocketsUserTypes } from "@/common/sockets/api/sockets.repo";
import { SessionUserService } from "@/common/session-user/domain/session-user.service";
import { ReservationStatuses } from "@/common/constants/reservationStatuses";
import { createDateTimeFoNotificationsHelper } from "@/common/helpers/createDateTimeFoNotifications.helper";
import {
  HISTORY,
  MY_RESERVATIONS_SERVICE,
  NOTIFICATION_SERVICE,
  RESERVATION_REPOSITORY,
  SESSION_USER_SERVICE,
  SOCKETS_SERVICE,
  THANK_YOU_SERVICE
} from "@/common/injector/constants";


export class ReservationService implements BaseReservationService {
  private _currentStep: number;
  private _rentTypePick: RentTypes | null;
  private _carType: string;
  private _pickUp: Date | null;
  private _dropOff: Date | null;
  private _dropOffWithPackage: Date | null;
  private _pickUpDate: string;
  private _pickUpTime: string;
  private _dropOffDate: string;
  private _dropOffTime: string;
  private _status: string;
  private _package: number | null;
  private _area: AllowedAreasValues | null;
  private _state: string | null;
  private _paymentStatus: string;
  private _paymentType: string;
  private _comment: string;
  private _distance: number;
  private _allAdditionalRequests: Array<{ name: string, label: string }>;
  private _selectedAdditionalRequests: Array<{ name: string, label: string }>;
  private _selectedCarType: { id: string, label: string, price: number };
  private _selectedCar: string;
  private _totalPrice: { fullDay: number, totalPrice: number };
  private _startTripImage: Media;
  private _endTripImage: Media;
  private _carId: string;
  private _user: SessionUserDto;
  private _car?: BaseCar;
  private _isDisabledFinishButton: boolean;
  private _carTypeTitle: BodyTypes | null;
  private _carTypePrice: number | null;
  private _additionalRequestsForNewReservation: Array<AdditionalRequestValues>;
  private _isTouchedDate: boolean;
  private _packages: Array<HourlyPackage>;

  constructor() {
    this._currentStep = 0;
    this._rentTypePick = null;
    this._carType = "";
    this._pickUp = null;
    this._dropOff = null;
    this._dropOffWithPackage = null;
    this._pickUpDate = "";
    this._pickUpTime = "";
    this._dropOffDate = "";
    this._dropOffTime = "";
    this._status = "";
    this._package = null;
    this._area = null;
    this._state = null;
    this._paymentStatus = "";
    this._paymentType = "";
    this._comment = "";
    this._distance = 0;
    this._allAdditionalRequests = [
      {
        name: "AdditionalDriver",
        label: "Additional driver"
      },
      {
        name: "AdditionalSeat",
        label: "Additional car seat"
      },
      {
        name: "GPS",
        label: "GPS"
      }
    ];
    this._selectedAdditionalRequests = [];
    this._selectedCarType = {
      id: "",
      label: "",
      price: 0,
    };
    this._selectedCar = "";
    this._totalPrice = {
      fullDay: 0,
      totalPrice: 0
    };
    this._startTripImage = {
      id: "",
      imageUrl: "",
      thumbnailUrl: "",
      type: "",
    };
    this._endTripImage = {
      id: "",
      imageUrl: "",
      thumbnailUrl: "",
      type: "",
    };
    this._carId = '';
    this._user = {
      id: "",
      prefix: "",
      firstName: "",
      lastName: "",
      email: "",
      mobilePhone: "",
      whatsAppPhone: "",
      emergencyPhone: "",
      address: "",
      state: "",
      zip: "",
      role: "",
      notificationType: "",
      isActive: false,
      media: {
        id: "",
        imageUrl: "",
        thumbnailUrl: "",
        type: "",
      },
      driverLicence: {
        DOB: '',
        expDate: '',
        issueDate: '',
        licenceNumber: '',
        medias: [{
          id: "",
          imageUrl: "",
          thumbnailUrl: "",
          type: "",
        }],
      },
      payment: {
        billingZipCode: '',
        cardNumbers: '',
        cardType: '',
        cardholderName: '',
        expDate: '',
        id: '',
        rentalDamageCover: '',
      }
    };
    this._isDisabledFinishButton = true;
    this._carTypeTitle = null;
    this._carTypePrice = null;
    this._additionalRequestsForNewReservation = [];
    this._isTouchedDate = false;
    this._packages = [];

    makeAutoObservable(this);
  }

  @action
  reset(): void {
    this._currentStep = 0;
    this._rentTypePick = null;
    this._carType = "";
    this._pickUp = null;
    this._dropOff = null;
    this._dropOffWithPackage = null;
    this._pickUpDate = "";
    this._pickUpTime = "";
    this._dropOffDate = "";
    this._dropOffTime = "";
    this._status = "";
    this._package = null;
    this._area = null;
    this._paymentStatus = "";
    this._paymentType = "";
    this._comment = "";
    this._distance = 0;
    this._allAdditionalRequests = [
      {
        name: "BabyCarSeat",
        label: "Baby car seat"
      },
      {
        name: "ChildBooster",
        label: "Child booster"
      },
      {
        name: "GPS",
        label: "GPS"
      }
    ];
    this._selectedAdditionalRequests = [];
    this._selectedCarType = {
      id: "",
      label: "",
      price: 0,
    };
    this._selectedCar = "";
    this._totalPrice = {
      fullDay: 0,
      totalPrice: 0
    };
    this._startTripImage = {
      id: "",
      imageUrl: "",
      thumbnailUrl: "",
      type: "",
    };
    this._endTripImage = {
      id: "",
      imageUrl: "",
      thumbnailUrl: "",
      type: "",
    };
    this._carId = '';
    this._user = {
      id: "",
      prefix: "",
      firstName: "",
      lastName: "",
      email: "",
      mobilePhone: "",
      whatsAppPhone: "",
      emergencyPhone: "",
      address: "",
      state: "",
      zip: "",
      role: "",
      notificationType: "",
      isActive: false,
      media: {
        id: "",
        imageUrl: "",
        thumbnailUrl: "",
        type: "",
      },
      driverLicence: {
        DOB: '',
        expDate: '',
        issueDate: '',
        licenceNumber: '',
        medias: [{
          id: "",
          imageUrl: "",
          thumbnailUrl: "",
          type: "",
        }],
      },
      payment: {
        billingZipCode: '',
        cardNumbers: '',
        cardType: '',
        cardholderName: '',
        expDate: '',
        id: '',
        rentalDamageCover: '',
      }
    };
    this._isDisabledFinishButton = true;
    this._carTypeTitle = null;
    this._carTypePrice = null;
    this._additionalRequestsForNewReservation = [];
    this._isTouchedDate = false;
    this._packages = [];
  }

  @action
  fillFields(data: Reservation) {
    this.selectedAdditionalRequest = this._allAdditionalRequests;
    this.totalPrice = {
      fullDay: data.price,
      totalPrice: data.totalPrice
    }
  }

  @action
  public async getReservation(id: string): Promise<any> {
    try {
      const reservation = await ReservationService._reservationRepo.getReservationById(id);

      this.rentTypePick = reservation.rentTypePick;
      this.status = reservation.status;
      this.paymentStatus = reservation.paymentStatus;
      this.paymentType = reservation.paymentType;
      this.comment = reservation.comment;
      this.area = reservation.area;
      this.state = reservation.state;
      this.distance = reservation.distance;
      this.selectedAdditionalRequest = reservation.additionalRequest;
      this.selectedCarType = {
        id: "",
        label: reservation.carType,
        price: 0,
      };
      this.totalPrice = {
        fullDay: reservation.price,
        totalPrice: reservation.totalPrice
      };
      this.pickUp = new Date(reservation?.pickupDateTime);
      this.dropOff = new Date(reservation?.dropOffDateTime);
      this.pickUpDate = new Date(reservation?.pickupDateTime).toLocaleDateString().split('.').reverse().join('-');
      this.pickUpTime = new Date(reservation?.pickupDateTime).toLocaleTimeString();
      this.dropOffDate = new Date(reservation?.dropOffDateTime).toLocaleDateString().split('.').reverse().join('-');
      this.dropOffTime = new Date(reservation?.dropOffDateTime).toLocaleTimeString();
      this.startTripImage = reservation?.startTripImage;
      this.endTripImage = reservation?.endTripImage;
      this.carId = reservation.car?.id;
      this.user = reservation.user;
      this.car = reservation.car;
      // @ts-ignore
      this.package = (new Date(reservation?.dropOffDateTime) - new Date(reservation?.pickupDateTime)) / 3600000;
      this.package = this.package < 2 ? 1.5 : Math.round(this.package);

      return reservation;
    } catch (e) {
      ReservationService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async getSummaryPrice(): Promise<void> {
    try {
      const { data } = await ReservationService._reservationRepo.getSummaryPrice({
        categoryId: this._carType,
        rate: this._rentTypePick!,
        pickUpDate: this._pickUp!,
        timeZone: new Date().getTimezoneOffset() / 60,
        dropOffDate: this._dropOff!,
        additionals: this._additionalRequestsForNewReservation,
        area: this._area!,
      });
      this.totalPrice = data;
    } catch (e) {
      ReservationService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async createReservation(notificationType?: string): Promise<void> {
    try {
      const reservation: any = await ReservationService._reservationRepo.createReservation(
        {
          rentTypePick: this._rentTypePick!,
          carType: this._carTypeTitle!,
          pickupDateTime: this._pickUp!,
          dropOffDateTime: this._dropOff!,
          price: this._totalPrice.fullDay,
          totalPrice: this._totalPrice.totalPrice,
          area: this._area,
          state: this._state,
          status: "New",
          paymentStatus: PaymentStatusesTypes.AwaitingPayment,
          paymentType: PaymentTypes.Card,
          additionalRequest: this._additionalRequestsForNewReservation,
          timeZone: new Date().getTimezoneOffset() / 60,
        }
      );

      ReservationService._thankYouService.title = "Thank you!";
      ReservationService._thankYouService.subTitle = "Your reservation request is placed successfully!\n" +
        `Check your ${notificationType === 'sms' ? 'phone' : 'email'} to get the reservation confirmation.`;
      ReservationService._thankYouService.buttonText = "GO TO MY RESERVATIONS LIST";
      ReservationService._thankYouService.buttonHandler = () => {
        ReservationService._history.push(MY_RESERVATIONS_PAGE);
      }

      ReservationService._history.push(THANK_YOU_PAGE);

      ReservationService._notificationService.notify({
        message: i18next.t("client.reservationHasBeenSuccessfullyCreated"),
        status: "success",
      });

      this.reset();

      return reservation;
    } catch (e) {
      ReservationService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async changePaymentType({ reservationId, paymentType }: ChangePaymentType): Promise<void> {
    try {
      await ReservationService._reservationRepo.changePaymentType({ reservationId, paymentType });
    } catch (e) {
      ReservationService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async updateReservation(id: string, data: any): Promise<void> {
    try {
      const reservation = await ReservationService._reservationRepo.getReservationById(id);

      data.rentTypePick = reservation.rentTypePick;
      data.carId = (data.carId) ? data.carId : (reservation.car?.id) ? reservation.car?.id : null;
      data.userId = reservation.user?.id;
      data.carType = reservation.carType;
      data.pickupDateTime = (data.pickupDateTime) ? data.pickupDateTime : reservation.pickupDateTime;
      data.dropOffDateTime = (data.dropOffDateTime) ? data.dropOffDateTime : reservation.dropOffDateTime;
      data.price = reservation.price;
      data.totalPrice = (data.totalPrice) ? data.totalPrice : reservation.totalPrice;
      data.paymentStatus = (data.paymentStatus) ? data.paymentStatus : reservation.paymentStatus;
      data.paymentType = reservation.paymentType;
      data.additionalRequest = (data.additionalRequest) ? data.additionalRequest : reservation.additionalRequest;
      data.status = data.status ? data.status : reservation.status;
      data.comment = (data.comment) ? data.comment : reservation.comment;
      data.distance = (data.distance) ? data.distance : reservation.distance;

      await ReservationService._reservationRepo.updateReservation(id, data);

      await this.getReservation(id);
    } catch (e) {
      ReservationService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async changeReservationStatus(id: string, status: ReservationStatuses): Promise<void> {
    try {
      await ReservationService._reservationRepo.changeStatus(id, status);

      this.status = status;
    } catch (e) {
      ReservationService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async getHourlyPackagesByCategory(categoryId: string): Promise<void> {
    try {
      if (categoryId) {
        this._packages = await ReservationService._reservationRepo.getHourlyPackagesByCategory(categoryId);
      }
    } catch (e) {
      ReservationService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async getHourlyAllPackages(): Promise<void> {
    try {
      await ReservationService._reservationRepo.getHourlyAllPackages();
    } catch (e) {
      ReservationService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async updateReservationDates(reservationId: string, pickUpDate: Date | string, dropOffDate: Date | string, reservationNumber?: number): Promise<void> {
    try {
      const convertedDate = createDateTimeFoNotificationsHelper(new Date());

      await ReservationService._reservationRepo.updateReservationDates(reservationId, pickUpDate, dropOffDate);
      ReservationService._notificationService.notify({
        message: "Reservation time has been changed!",
        status: "success",
      })
      await ReservationService._socketsService.sendMessage({
        data: `Reservation time was updated by customer ${ReservationService._sessionUserService.firstName} ${ReservationService._sessionUserService.lastName}, waiting for approve - #${reservationNumber} / ${convertedDate}`,
        type: SocketsUserTypes.Admins,
        kind: "warning"
      })
      await ReservationService._myReservationsService.getMyReservationsByType(ReservationTypes.upcoming);
    } catch (e) {
      ReservationService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  get rentTypePick(): RentTypes | null {
    return this._rentTypePick;
  }

  get allAdditionalRequests(): Array<{ name: string, label: string }> {
    return this._allAdditionalRequests;
  }

  get selectedCarType(): { id: string, label: string, price: number } {
    return this._selectedCarType;
  }

  get selectedAdditionalRequest(): Array<any> {
    return this._selectedAdditionalRequests;
  }

  get selectedCar(): string {
    return this._selectedCar;
  }

  get dropOffTime(): string {
    return this._dropOffTime;
  }

  get dropOffDate(): string {
    return this._dropOffDate;
  }

  get pickUpTime(): string {
    return this._pickUpTime;
  }

  get pickUpDate(): string {
    return this._pickUpDate;
  }

  get totalPrice(): { fullDay: number, totalPrice: number } {
    return this._totalPrice;
  }

  get status(): string {
    return this._status;
  }

  get paymentStatus(): string {
    return this._paymentStatus;
  }

  get paymentType(): string {
    return this._paymentType;
  }

  get comment(): string {
    return this._comment;
  }

  get distance(): number {
    return this._distance;
  }

  get startTripImage(): Media {
    return this._startTripImage;
  }

  get endTripImage(): Media {
    return this._endTripImage;
  }

  get carId(): string {
    return this._carId;
  }

  get user(): SessionUserDto {
    return this._user;
  }

  get car(): BaseCar {
    return <BaseCar>this._car;
  }

  get currentStep(): number {
    return this._currentStep;
  }

  get carType(): string {
    return this._carType;
  }

  get package(): number | null {
    return this._package;
  }

  get area(): AllowedAreasValues | null {
    return this._area;
  }

  get state(): string | null {
    return this._state;
  }

  get dropOff(): Date | null {
    return this._dropOff;
  }

  get pickUp(): Date | null {
    return this._pickUp;
  }

  get isDisabledFinishButton(): boolean {
    return this._isDisabledFinishButton;
  }

  get carTypePrice(): number | null {
    return this._carTypePrice;
  }

  get carTypeTitle(): BodyTypes | null {
    return this._carTypeTitle;
  }

  get additionalRequestsForNewReservation(): Array<AdditionalRequestValues> {
    return this._additionalRequestsForNewReservation;
  }

  get dropOffWithPackage(): Date | null {
    return this._dropOffWithPackage;
  }

  get isTouchedDate(): boolean {
    return this._isTouchedDate;
  }

  get packages(): Array<HourlyPackage> {
    return this._packages;
  }

  set packages(value: Array<HourlyPackage>) {
    this._packages = value;
  }

  set isTouchedDate(value: boolean) {
    this._isTouchedDate = value;
  }

  set dropOffWithPackage(value: Date | null) {
    this._dropOffWithPackage = value;
  }

  set additionalRequestsForNewReservation(value: Array<AdditionalRequestValues>) {
    this._additionalRequestsForNewReservation = value;
  }

  set carTypePrice(value: number | null) {
    this._carTypePrice = value;
  }

  set carTypeTitle(value: BodyTypes | null) {
    this._carTypeTitle = value;
  }

  set isDisabledFinishButton(value: boolean) {
    this._isDisabledFinishButton = value;
  }

  set dropOff(value: Date | null) {
    this._dropOff = value;
  }

  set pickUp(value: Date | null) {
    this._pickUp = value;
  }

  set area(value: AllowedAreasValues | null) {
    this._area = value;
  }

  set state(value: string | null) {
    this._state = value;
  }

  set package(value: number | null) {
    this._package = value;
  }

  set carType(value: string) {
    this._carType = value;
  }

  set currentStep(value: number) {
    this._currentStep = value;
  }

  set rentTypePick(value: RentTypes | null) {
    this._rentTypePick = value;
  }

  set dropOffTime(value: string) {
    this._dropOffTime = value;
  }

  set dropOffDate(value: string) {
    this._dropOffDate = value;
  }

  set pickUpTime(value: string) {
    this._pickUpTime = value;
  }

  set pickUpDate(value: string) {
    this._pickUpDate = value;
  }

  set selectedCarType(value: { id: string, label: string, price: number }) {
    this._selectedCarType = value;
  }

  set selectedCar(value: string) {
    this._selectedCar = value;
  }

  set allAdditionalRequests(value: Array<{ name: string, label: string }>) {
    this._allAdditionalRequests = value;
  }

  set selectedAdditionalRequest(value: Array<{ name: string, label: string }>) {
    this._selectedAdditionalRequests = value;
  }

  set totalPrice(value: { fullDay: number, totalPrice: number }) {
    this._totalPrice = value;
  }

  set status(value: string) {
    this._status = value;
  }

  set paymentStatus(value: string) {
    this._paymentStatus = value;
  }

  set paymentType(value: string) {
    this._paymentType = value;
  }

  set comment(value: string) {
    this._comment = value;
  }

  set distance(value: number) {
    this._distance = value;
  }

  set startTripImage(value: Media) {
    this._startTripImage = value;
  }

  set endTripImage(value: Media) {
    this._endTripImage = value;
  }

  set carId(value: string) {
    this._carId = value;
  }

  set user(value: SessionUserDto) {
    this._user = value;
  }

  set car(value: BaseCar) {
    this._car = value;
  }

  private static get _thankYouService() {
    return injector.get<ThankYouService>(THANK_YOU_SERVICE);
  }

  private static get _history() {
    return injector.get<History>(HISTORY);
  }

  private static get _reservationRepo() {
    return injector.get<ReservationRepository>(RESERVATION_REPOSITORY);
  }

  private static get _myReservationsService() {
    return injector.get<MyReservationsService>(MY_RESERVATIONS_SERVICE);
  }

  private static get _sessionUserService() {
    return injector.get<SessionUserService>(SESSION_USER_SERVICE);
  }

  private static get _socketsService() {
    return injector.get<SocketsService>(SOCKETS_SERVICE);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }
}
