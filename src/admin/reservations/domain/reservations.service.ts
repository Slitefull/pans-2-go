import { BaseReservationsService } from "./reservations.common.service";
import { action, makeAutoObservable } from "mobx";
import { injector } from "@/common/injector/Injector";
import { HISTORY, NOTIFICATION_SERVICE, RESERVATIONS_REPOSITORY } from "@/common/injector/constants";
import { ReservationsRepository } from "@/admin/reservations/api/reservations.repo";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import {
  ChangeReservationStatusPayload,
  Reservation,
  ReservationStatusesCount
} from "@/admin/reservations/api/dto/reservations.dto";
import { SortTypes } from "@/common/constants/sortTypes";
import { ReservationStatuses } from "@/common/constants/reservationStatuses";
import { History } from "history";


export class ReservationsService implements BaseReservationsService {
  private _reservations: Array<Reservation>;
  private _statusesCount: ReservationStatusesCount | null;
  private _selectedFilterTab: string;
  private _page: number;
  private _perPage: number;
  private _isHistoryEndReached: boolean;
  private _customerName: string | null;
  private _carType: string | null;
  private _pickUpDate: string | null;
  private _pickUpTime: string | null;
  private _sortBy: string | null;
  private _desc: string | null;
  private _status: string | null;
  private _isLoading: boolean;

  constructor() {
    this._reservations = [];
    this._statusesCount = null;
    this._selectedFilterTab = 'New';
    this._page = 0;
    this._perPage = 5;
    this._isHistoryEndReached = false;
    this._customerName = null;
    this._carType = null;
    this._pickUpDate = null;
    this._pickUpTime = null;
    this._sortBy = null;
    this._desc = SortTypes.ASC;
    this._status = this._selectedFilterTab;
    this._isLoading = false;

    makeAutoObservable(this);
  }

  @action
  async getReservationsWithFilters(): Promise<void> {
    this._isLoading = true;

    const { data } = await this._reservationsRepo.getReservationsWithFilters({
      pickUpDate: this._pickUpDate!,
      pickUpTime: this._pickUpTime!,
      carType: this._carType!,
      page: this._page,
      perPage: this._perPage,
      customerName: this._customerName!,
      sortBy: this._sortBy!,
      desc: this._desc!,
      status: this._status!,
    });

    if (data.rows.length < this._perPage) {
      this._isHistoryEndReached = true;
    }

    this._reservations = data.rows;
    this._isLoading = false;
  }

  @action
  async getReservationsWithFiltersOnScroll(): Promise<void> {
    const { data } = await this._reservationsRepo.getReservationsWithFilters({
      pickUpDate: this._pickUpDate!,
      pickUpTime: this._pickUpTime!,
      carType: this._carType!,
      page: this._page + 1,
      perPage: this._perPage,
      customerName: this._customerName!,
      sortBy: this._sortBy!,
      desc: this._desc!,
      status: this._status!,
    });

    this._page = this._page + 1;

    if (data.rows.length < this._perPage) {
      this._isHistoryEndReached = true;
    }

    const seen = new Set();

    this._reservations = [...this._reservations, ...data.rows].filter((el) => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });
  }

  async changeReservationStatus({ id, status }: ChangeReservationStatusPayload): Promise<void> {
    try {
      this.reset()
      await this._reservationsRepo.changeReservationStatus({ id, status })

      await this.getReservationsWithFilters();
      await this.getReservationsStatusesCount();

      if (status === ReservationStatuses.Approved) {
        this._history.push(`/reservation/${id}`)
      }

      this._notificationService.notify({ status: "success", message: "Status has been successfully changed!" })
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  async getReservationsStatusesCount(): Promise<void> {
    try {
      const { data: statusesCount } = await this._reservationsRepo.getReservationsStatusesCount();
      this._statusesCount = statusesCount;
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  reset() {
    this._reservations = [];
    this._page = 0;
    this._perPage = 10;
    this._isHistoryEndReached = false;
    this._customerName = null;
    this._carType = null;
    this._pickUpDate = null;
    this._pickUpTime = null;
    this._sortBy = null;
    this._desc = SortTypes.ASC;
    this._status = this._selectedFilterTab
  }

  get reservations(): Array<Reservation> {
    return this._reservations;
  }

  get selectedFilterTab(): string {
    return this._selectedFilterTab;
  }

  get isHistoryEndReached(): boolean {
    return this._isHistoryEndReached;
  }

  get perPage(): number {
    return this._perPage;
  }

  get page(): number {
    return this._page;
  }

  get carType(): string | null {
    return this._carType;
  }

  get customerName(): string | null {
    return this._customerName;
  }

  get desc(): string | null {
    return this._desc;
  }

  get sortBy(): string | null {
    return this._sortBy;
  }

  get pickUpTime(): string | null {
    return this._pickUpTime;
  }

  get pickUpDate(): string | null {
    return this._pickUpDate;
  }

  get status(): string | null {
    return this._status;
  }

  get statusesCount(): ReservationStatusesCount | null {
    return this._statusesCount;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    this._isLoading = value;
  }

  set statusesCount(value: ReservationStatusesCount | null) {
    this._statusesCount = value;
  }

  set status(value: string | null) {
    this._status = value;
  }

  set pickUpTime(value: string | null) {
    this._pickUpTime = value;
  }

  set desc(value: string | null) {
    this._desc = value;
  }

  set sortBy(value: string | null) {
    this._sortBy = value;
  }

  set pickUpDate(value: string | null) {
    this._pickUpDate = value;
  }

  set customerName(value: string | null) {
    this._customerName = value;
  }

  set isHistoryEndReached(value: boolean) {
    this._isHistoryEndReached = value;
  }

  set carType(value: string | null) {
    this._carType = value;
  }

  set perPage(value: number) {
    this._perPage = value;
  }

  set page(value: number) {
    this._page = value;
  }

  set selectedFilterTab(value: string) {
    this._selectedFilterTab = value;
  }

  set reservations(value: Array<Reservation>) {
    this._reservations = value;
  }

  private get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private get _history() {
    return injector.get<History>(HISTORY);
  }

  private get _reservationsRepo() {
    return injector.get<ReservationsRepository>(RESERVATIONS_REPOSITORY);
  }
}
