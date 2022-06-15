import i18next from "i18next";
import moment from "moment";
import { injector } from "@/common/injector/Injector";
import { action, makeAutoObservable } from "mobx";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { BaseCustomerService } from "@/admin/customer/domain/customer.common.service";
import { CustomerRepository } from "@/admin/customer/api/customer.repo";
import { CustomersRepository } from "@/admin/customers/api/customers.repo";
import { CustomerDTO } from "@/admin/customers/api/dto/customers.dto";
import { LS_SELECTED_EDIT_CUSTOMER_ID } from "@/common/constants/localStorage";
import { CreateMediaByBase64Values, Media, MediaRepository } from "@/common/media/api/media.repo";
import { NotificationPreferencesValues } from "@/common/constants/notificationPreferences";
import { UpdateCustomerValues } from "@/admin/customer/view/customer.component";
import { ChangeLogElement, GetChangeLogByIdPayload } from "@/admin/customer/api/dto/customer.dto";
import { getHoursCount } from "@/admin/edit-car/domain/heplers/getHoursCount.helper";
import { GetReservationHistoryByUserIdPayload, ReservationRepository } from "@/common/reservation/api/reservation.repo";
import { ReservationHistoryElement } from "@/admin/edit-car/api/dto/edit-car.dto";
import { CustomerTabs } from "@/admin/customer/constants";
import {
  CUSTOMER_REPOSITORY,
  CUSTOMERS_REPOSITORY,
  MEDIA_REPOSITORY,
  NOTIFICATION_SERVICE,
  RESERVATION_REPOSITORY
} from "@/common/injector/constants";


export class CustomerService implements BaseCustomerService {
  private _selectedCustomerId: string | null;
  private _selectedCustomer: CustomerDTO | null;
  private _createdDriverLicences: Array<Media>;
  private _selectedNotificationType: NotificationPreferencesValues;
  private _reservationHistory: Array<ReservationHistoryElement>;
  private _changeLogs: Array<ChangeLogElement>;
  private _tab: CustomerTabs | null;
  private _page: number;
  private _perPage: number;

  constructor() {
    this._selectedCustomerId = null;
    this._selectedCustomer = null;
    this._createdDriverLicences = [];
    this._selectedNotificationType = NotificationPreferencesValues.EMAIL;
    this._reservationHistory = [];
    this._changeLogs = [];
    this._tab = null;
    this._page = 0;
    this._perPage = 10;

    makeAutoObservable(this);
  }

  @action
  async getSelectedCustomer(): Promise<void> {
    try {
      const customer = await CustomerService._customersRepo.getCustomerById(localStorage.getItem(LS_SELECTED_EDIT_CUSTOMER_ID) || this._selectedCustomerId!);
      this._selectedCustomer = customer;
      this._selectedCustomerId = customer.id;
      this._selectedNotificationType = customer.notificationType;
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async activateUserByAdmin(userId: string): Promise<void> {
    try {
      await CustomerService._customerRepo.activateUserByAdmin(userId);

      CustomerService._notificationService.notify({
        message: "Customer was activated!",
        status: "success",
      })
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async blockUserByAdmin(userId: string): Promise<void> {
    try {
      await CustomerService._customerRepo.blockUserByAdmin(userId);

      CustomerService._notificationService.notify({
        message: "Customer was blocked!",
        status: "success",
      })
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async pendingUserByAdmin(userId: string): Promise<void> {
    try {
      await CustomerService._customerRepo.pendingUserByAdmin(userId);

      CustomerService._notificationService.notify({
        message: "Customer status was changed!",
        status: "success",
      })
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async createDriverLicenceImage(
    values: Array<CreateMediaByBase64Values>
  ): Promise<void> {
    try {
      const { data: createdMediaIds } = await CustomerService._mediaRepo.createMediaByBase64(values);
      this._createdDriverLicences = [...this._createdDriverLicences, ...createdMediaIds];
      CustomerService._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async deleteCustomerProfilePhoto(userId: string, photoId: string): Promise<void> {
    try {
      await CustomerService._customerRepo.deleteUserAvatar(userId, photoId);
      CustomerService._notificationService.notify({
        message: i18next.t("Profile media has been deleted!"),
        status: "success",
      });
      await this.getSelectedCustomer();
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async deleteCustomerDriverLicence(mediaIds: Array<string>): Promise<void> {
    try {
      await CustomerService._customerRepo.deleteCustomerDriverLicence(mediaIds);
      this._createdDriverLicences = [];
      CustomerService._notificationService.notify({
        message: i18next.t("Driver licence medias has been deleted!"),
        status: "success",
      });
      await this.getSelectedCustomer();
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async updateCustomerByAdmin(values: UpdateCustomerValues, userId: string): Promise<void> {
    try {
      await CustomerService._customerRepo.updateCustomer(values, userId);
      CustomerService._notificationService.notify({
        message: i18next.t("Customer information updated successfully!"),
        status: "success",
      });
      await this.getSelectedCustomer();
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getReservationHistoryByUserId({ userId, limit, offset }: GetReservationHistoryByUserIdPayload): Promise<void> {
    try {
      const reservationHistoryElements = await CustomerService._reservationRepo.getReservationHistoryByUserId({
        userId,
        limit,
        offset
      });
      this._reservationHistory = reservationHistoryElements.map((element) => ({
        number: element.number,
        customer: `${element.user.firstName} ${element.user.lastName}`,
        pickUp: moment(element.pickupDateTime).format('lll'),
        dropOff: moment(element.dropOffDateTime).format('lll'),
        hours: getHoursCount(element.pickupDateTime, element.dropOffDateTime),
      }))
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async getChangeLogById({ userId, page, perPage }: GetChangeLogByIdPayload): Promise<void> {
    try {
      this._changeLogs = await CustomerService._customerRepo.getChangeLogById({
        userId,
        page,
        perPage
      });
    } catch (e) {
      CustomerService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  reset(): void {
    this._selectedCustomerId = null;
    this._selectedCustomer = null;
    this._createdDriverLicences = [];
    this._selectedNotificationType = NotificationPreferencesValues.EMAIL;
    this._changeLogs = [];
    this._page = 0;
    this._perPage = 10;
  }

  get selectedCustomerId(): string | null {
    return this._selectedCustomerId;
  }

  get selectedCustomer(): CustomerDTO | null {
    return this._selectedCustomer;
  }

  get createdDriverLicences(): Array<Media> {
    return this._createdDriverLicences;
  }

  get selectedNotificationType(): NotificationPreferencesValues {
    return this._selectedNotificationType;
  }

  get changeLogs(): Array<ChangeLogElement> {
    return this._changeLogs;
  }

  get tab(): CustomerTabs | null {
    return this._tab;
  }

  get perPage(): number {
    return this._perPage;
  }

  get page(): number {
    return this._page;
  }

  get reservationHistory(): Array<ReservationHistoryElement> {
    return this._reservationHistory;
  }

  set reservationHistory(value: Array<ReservationHistoryElement>) {
    this._reservationHistory = value;
  }

  set tab(value: CustomerTabs | null) {
    this._tab = value;
  }

  set perPage(value: number) {
    this._perPage = value;
  }

  set page(value: number) {
    this._page = value;
  }

  set changeLogs(value: Array<ChangeLogElement>) {
    this._changeLogs = value;
  }

  set selectedNotificationType(value: NotificationPreferencesValues) {
    this._selectedNotificationType = value;
  }

  set createdDriverLicences(value: Array<Media>) {
    this._createdDriverLicences = value;
  }

  set selectedCustomer(value: CustomerDTO | null) {
    this._selectedCustomer = value;
  }

  set selectedCustomerId(value: string | null) {
    this._selectedCustomerId = value;
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private static get _mediaRepo() {
    return injector.get<MediaRepository>(MEDIA_REPOSITORY);
  }

  private static get _customersRepo() {
    return injector.get<CustomersRepository>(CUSTOMERS_REPOSITORY);
  }

  private static get _reservationRepo() {
    return injector.get<ReservationRepository>(RESERVATION_REPOSITORY);
  }

  private static get _customerRepo() {
    return injector.get<CustomerRepository>(CUSTOMER_REPOSITORY);
  }
}
