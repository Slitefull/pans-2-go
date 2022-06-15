import { injector } from "@/common/injector/Injector";
import { DASHBOARD_REPOSITORY, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { action, makeAutoObservable } from "mobx";
import { BaseDashboardService } from "@/admin/dashboard/domain/dashboard.common.service";
import { BodyTypes } from "@/common/constants/bodyTypes";
import { BusyCar } from "@/admin/dashboard/api/dto/dashboard.dto";
import { DashboardRepository, GetBusyTimePayload } from "@/admin/dashboard/api/dashboard.repo";
import debounce from 'lodash/debounce';


export class DashboardService implements BaseDashboardService {
  private _searchName: string;
  private _selectedCarType: BodyTypes | null;
  private _selectedDate: Date | string;
  private _cars: Array<BusyCar>;
  private _reservationsCount: number | null;
  private _freeCarsCount: number | null;

  constructor() {
    this._searchName = '';
    this._selectedCarType = null;
    this._selectedDate = new Date().toDateString();
    this._cars = [];
    this._reservationsCount = null;
    this._freeCarsCount = null;

    makeAutoObservable(this);
  }

  @action
  async getBusyCars(
    {
      title = this._searchName,
      page = 0,
      sortBy = "status",
      desc = "ASC",
      startDate = this._selectedDate,
      perPage = 10,
      category = '',
    }: GetBusyTimePayload
  ): Promise<void> {
    try {
      const { rows, freeCars, countReservations } = await DashboardService._dashboardRepo.getBusyTime({
        title,
        page,
        sortBy,
        desc,
        startDate,
        perPage,
        category,
      });
      this._cars = rows;
      this._reservationsCount = countReservations;
      this._freeCarsCount = freeCars;
    } catch (e) {
      DashboardService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  get freeCarsCount(): number | null {
    return this._freeCarsCount;
  }

  get reservationsCount(): number | null {
    return this._reservationsCount;
  }

  get selectedDate(): Date | string {
    return this._selectedDate;
  }

  get selectedCarType(): BodyTypes | null {
    return this._selectedCarType;
  }

  get searchName(): string {
    return this._searchName;
  }

  get cars(): Array<BusyCar> {
    return this._cars;
  }

  set cars(value: Array<BusyCar>) {
    this._cars = value;
  }

  set freeCarsCount(value: number | null) {
    this._freeCarsCount = value;
  }

  set reservationsCount(value: number | null) {
    this._reservationsCount = value;
  }

  set selectedDate(value: Date | string) {
    this._selectedDate = value;
  }

  set selectedCarType(value: BodyTypes | null) {
    this._selectedCarType = value;
  }

  set searchName(value: string) {
    this._searchName = value;
  }

  private static get _dashboardRepo() {
    return injector.get<DashboardRepository>(DASHBOARD_REPOSITORY);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }
}
