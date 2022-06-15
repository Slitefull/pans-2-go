import { action, makeAutoObservable } from "mobx";
import { RentTypes } from "@/common/constants/rentTypes";
import { AdditionalRequestValues } from "@/common/constants/additionalRequests";
import { HourlyPackage, ReservationRepository } from "@/common/reservation/api/reservation.repo";
import { injector } from "@/common/injector/Injector";
import { HISTORY, NOTIFICATION_SERVICE, RESERVATION_REPOSITORY } from "@/common/injector/constants";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { PaymentStatusesTypes } from "@/common/constants/paymentStatuses";
import { PaymentTypes } from "@/common/constants/paymentTypes";
import { BodyTypes } from "@/common/constants/bodyTypes";
import { History } from "history";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";
import { RESERVATIONS_PAGE } from "@/common/constants/routes";
import {
  BaseNewReservationByAdminService,
  ReservationPrice
} from "@/admin/create-reservation/domain/create-reservation.common.service";


export class NewReservationByAdminService implements BaseNewReservationByAdminService {
  private _selectedRentType: RentTypes;
  private _selectedCar: string | null;
  private _selectedCarType: BodyTypes | null;
  private _selectedCarCategory: string | null;
  private _pickUp: Date | null;
  private _dropOff: Date | null;
  private _selectedCustomer: string | null;
  private _area: AllowedAreasValues;
  private _place: string;
  private _selectedAdditionalRequests: Array<AdditionalRequestValues>;
  private _packages: Array<HourlyPackage>;
  private _selectedPackage: number | null;
  private _isTouchedDate: boolean;
  private _dropOffWithPackage: Date | null;
  private _price: ReservationPrice | null;

  constructor() {
    this._selectedRentType = RentTypes.HOURLY_PARTIAL;
    this._selectedCar = null;
    this._selectedCarType = null;
    this._selectedCarCategory = null;
    this._pickUp = null;
    this._dropOff = null;
    this._selectedCustomer = null;
    this._area = AllowedAreasValues.Brooklyn;
    this._place = '';
    this._selectedAdditionalRequests = [];
    this._packages = [];
    this._selectedPackage = null;
    this._isTouchedDate = false;
    this._dropOffWithPackage = null;
    this._price = null;

    makeAutoObservable(this);
  }

  @action
  public async getHourlyPackagesByCategory(categoryId: string): Promise<void> {
    try {
      this._packages = await NewReservationByAdminService._reservationRepo.getHourlyPackagesByCategory(categoryId);
    } catch (e) {
      NewReservationByAdminService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async getHourlyAllPackages(): Promise<void> {
    try {
      this._packages = await NewReservationByAdminService._reservationRepo.getHourlyAllPackages();
    } catch (e) {
      NewReservationByAdminService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async createReservation(): Promise<void> {
    try {
      await NewReservationByAdminService._reservationRepo.createReservation(
        {
          rentTypePick: this._selectedRentType,
          carType: this._selectedCarType!,
          pickupDateTime: this._pickUp!,
          dropOffDateTime: this._dropOff!,
          price: this._price?.fullDay!,
          totalPrice: this._price?.totalPrice!,
          area: this._area,
          state: this._place,
          status: "New",
          paymentStatus: PaymentStatusesTypes.AwaitingPayment,
          paymentType: PaymentTypes.Card,
          additionalRequest: this._selectedAdditionalRequests,
          userId: this._selectedCustomer!,
          carId: this._selectedCar!,
          timeZone: new Date().getTimezoneOffset() / 60,
        }
      );

      this.reset();
      NewReservationByAdminService._notificationService.notify({
        message: "New reservation has been successfully created!",
        status: "success",
      })
      NewReservationByAdminService._history.push(RESERVATIONS_PAGE)
    } catch (e) {
      NewReservationByAdminService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async getSummaryPrice(): Promise<void> {
    try {
      const { data } = await NewReservationByAdminService._reservationRepo.getSummaryPrice({
        categoryId: this._selectedCarCategory!,
        rate: this._selectedRentType!,
        pickUpDate: this._pickUp!,
        timeZone: new Date().getTimezoneOffset() / 60,
        dropOffDate: this._dropOff!,
        additionals: this._selectedAdditionalRequests,
        area: this._area!,
      });
      this._price = data;
    } catch (e) {
      NewReservationByAdminService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  reset(): void {
    this._selectedRentType = RentTypes.HOURLY_PARTIAL;
    this._selectedCar = null;
    this._selectedCarType = null;
    this._selectedCarCategory = null;
    this._pickUp = null;
    this._dropOff = null;
    this._selectedCustomer = null;
    this._area = AllowedAreasValues.Brooklyn;
    this._place = '';
    this._selectedAdditionalRequests = [];
    this._packages = [];
    this._selectedPackage = null;
    this._isTouchedDate = false;
    this._dropOffWithPackage = null;
    this._price = null;
  }

  @action
  resetRentType(): void {
    this._selectedCar = null;
    this._area = AllowedAreasValues.Brooklyn;
    this._selectedPackage = null;
    this._dropOff = null;
    this._isTouchedDate = false;
    this._dropOffWithPackage = null;
    this._price = null;
  }

  @action
  resetSummary(): void {
    this._price = null;
  }

  get selectedAdditionalRequests(): Array<AdditionalRequestValues> {
    return this._selectedAdditionalRequests;
  }

  get place(): string {
    return this._place;
  }

  get area(): AllowedAreasValues {
    return this._area;
  }

  get selectedCustomer(): string | null {
    return this._selectedCustomer;
  }

  get dropOff(): Date | null {
    return this._dropOff;
  }

  get pickUp(): Date | null {
    return this._pickUp;
  }

  get selectedCarType(): BodyTypes | null {
    return this._selectedCarType;
  }

  get selectedRentType(): RentTypes {
    return this._selectedRentType;
  }

  get packages(): Array<HourlyPackage> {
    return this._packages;
  }

  get isTouchedDate(): boolean {
    return this._isTouchedDate;
  }

  get selectedPackage(): number | null {
    return this._selectedPackage;
  }

  get dropOffWithPackage(): Date | null {
    return this._dropOffWithPackage;
  }

  get selectedCarCategory(): string | null {
    return this._selectedCarCategory;
  }

  get selectedCar(): string | null {
    return this._selectedCar;
  }

  get price(): ReservationPrice | null {
    return this._price;
  }

  set price(value: ReservationPrice | null) {
    this._price = value;
  }

  set selectedCar(value: string | null) {
    this._selectedCar = value;
  }

  set selectedCarCategory(value: string | null) {
    this._selectedCarCategory = value;
  }

  set dropOffWithPackage(value: Date | null) {
    this._dropOffWithPackage = value;
  }

  set isTouchedDate(value: boolean) {
    this._isTouchedDate = value;
  }

  set selectedPackage(value: number | null) {
    this._selectedPackage = value;
  }

  set packages(value: Array<HourlyPackage>) {
    this._packages = value;
  }

  set selectedAdditionalRequests(value: Array<AdditionalRequestValues>) {
    this._selectedAdditionalRequests = value;
  }

  set place(value: string) {
    this._place = value;
  }

  set area(value: AllowedAreasValues) {
    this._area = value;
  }

  set selectedCustomer(value: string | null) {
    this._selectedCustomer = value;
  }

  set dropOff(value: Date | null) {
    this._dropOff = value;
  }

  set pickUp(value: Date | null) {
    this._pickUp = value;
  }

  set selectedCarType(value: BodyTypes | null) {
    this._selectedCarType = value;
  }

  set selectedRentType(value: RentTypes) {
    this._selectedRentType = value;
  }

  private static get _history() {
    return injector.get<History>(HISTORY);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private static get _reservationRepo() {
    return injector.get<ReservationRepository>(RESERVATION_REPOSITORY);
  }
}
