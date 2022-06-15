import { action, makeAutoObservable } from "mobx";
import { BaseMyReservationsService } from "@/common/my-reservations/domain/my-reservation.common.repo";
import { MyReservation, MyReservationsRepository } from "@/common/my-reservations/api/my-reservations.repo";
import { injector } from "@/common/injector/Injector";
import { MY_RESERVATIONS_REPOSITORY, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { NotificationService } from "@/infrastructure/notification/notification.service";


export class MyReservationsService implements BaseMyReservationsService {
  private _myReservations: Array<MyReservation>;
  private _limit: number;
  private _offset: number;
  private _isHistoryEndReached: boolean;

  constructor() {
    this._myReservations = [];
    this._limit = 0;
    this._offset = 10;
    this._isHistoryEndReached = false;

    makeAutoObservable(this);
  }

  @action
  public async getMyReservationsByType(type: "upcoming" | "past"): Promise<void> {
    try {
      const { data: myReservations } = await MyReservationsService._myReservationsRepo.getMyReservationsByType({
        type,
        limit: this._limit,
        offset: this._offset,
      });
      this._myReservations = myReservations;
    } catch (e) {
      MyReservationsService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getReservationsOnScroll(type: string): Promise<void> {
    const { data: myReservations } = await MyReservationsService._myReservationsRepo.getMyReservationsByType({
      type,
      limit: this._limit,
      offset: this._offset + this._limit,
    });

    this._offset = this._offset + this._limit;

    if (myReservations.length < this._offset) {
      this._isHistoryEndReached = true;
    }

    this._myReservations = [...this._myReservations, ...myReservations];
  }

  @action
  reset(): void {
    this._myReservations = [];
    this._limit = 0;
    this._offset = 10;
    this._isHistoryEndReached = false;
  }

  get myReservations(): Array<MyReservation> {
    return this._myReservations;
  }

  get isHistoryEndReached(): boolean {
    return this._isHistoryEndReached;
  }

  get offset(): number {
    return this._offset;
  }

  get limit(): number {
    return this._limit;
  }

  set limit(value: number) {
    this._limit = value;
  }

  set offset(value: number) {
    this._offset = value;
  }

  set isHistoryEndReached(value: boolean) {
    this._isHistoryEndReached = value;
  }

  set myReservations(value: Array<MyReservation>) {
    this._myReservations = value;
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private static get _myReservationsRepo() {
    return injector.get<MyReservationsRepository>(MY_RESERVATIONS_REPOSITORY);
  }
}
