import { injector } from "@/common/injector/Injector";
import { action, makeAutoObservable } from "mobx";
import { APP_SERVICE, CARS_REPOSITORY, NOTIFICATION_SERVICE } from "@/common/injector/constants";
import { BaseCarsService } from "@/admin/cars/domain/cars.common.service";
import { CarsRepository } from "../api/cars.repo";
import { CarCategory, CarMake } from "../api/dto/cars.dto";
import { BaseCar, CarLocation } from "@/common/car/api/dto/car.dto";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { AppService } from "@/common/app/domain/app.service";


export class CarsService implements BaseCarsService {
  private _cars: Array<BaseCar>;
  private _carsLocations: Array<CarLocation>;
  private _carMakes: Array<CarMake>;
  private _carsCategories: Array<CarCategory>;
  private _searchName: string | null;
  private _searchPlateNumber: string | null;
  private _selectedCarType: string | null;
  private _selectedStatus: string | null;
  private _offset: number;
  private _page: number;
  private _isHistoryEndReached: boolean;
  private _desc: string | null;
  private _startDate: string | null;
  private _endDate: string | null;
  private _reservationId: string | null;

  constructor() {
    this._cars = [];
    this._carsLocations = [];
    this._carMakes = [];
    this._carsCategories = [];
    this._searchName = null;
    this._searchPlateNumber = null;
    this._selectedCarType = null;
    this._selectedStatus = null;
    this._offset = 12;
    this._page = 0;
    this._isHistoryEndReached = false;
    this._desc = null;
    this._endDate = null;
    this._startDate = null;
    this._reservationId = null;

    makeAutoObservable(this);
  }

  @action
  async getAllCars(): Promise<void> {
    try {
      const { data: cars } = await this._carsRepo.getAllCars()
      this._cars = cars;
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getCarsByCategory(
    categoryId: string,
    startDate?: string,
    endDate?: string,
    id?: string
  ): Promise<void> {
    try {
      const { data: cars } = await this._carsRepo.getCarsByCategory(categoryId, startDate, endDate, id);

      this._carsLocations = cars.map((car) => ({
        latitude: car.location?.latitude,
        longitude: car.location?.longitude
      }));

      this._cars = cars;
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getCarsWithFilters(): Promise<void> {
    try {
      const { data: cars } = await this._carsRepo.getCarsWithFilters({
        title: this._searchName!,
        plateNumber: this._searchPlateNumber!,
        status: this._selectedStatus!,
        category: this._selectedCarType!,
        page: 0,
        perPage: this._offset,
        desc: this._desc!,
        endDate: this._endDate!,
        startDate: this._startDate!,
        reservationId: this._reservationId!,
      });

      this._carsLocations = cars.map((car) => ({
        latitude: car.location.latitude,
        longitude: car.location.longitude
      }));

      this._isHistoryEndReached = cars.length < this._offset;

      this._cars = cars;
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
      this._appService.isLoading = false;
    }
  }

  @action
  async getCarsWithFiltersOnScroll(): Promise<void> {
    try {
      const { data } = await this._carsRepo.getCarsWithFilters({
        title: this._searchName!,
        plateNumber: this._searchPlateNumber!,
        status: this._selectedStatus!,
        category: this._selectedCarType!,
        page: this._page,
        perPage: this._offset,
        desc: this._desc!,
      });

      this._page = this._page + 1;

      if (data.length < this._offset) {
        this._isHistoryEndReached = true;
      }

      this._cars = [...this._cars, ...data]
        .filter((car, index, self) => self.findIndex(t => t.id === car.id) === index);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getAllCarMakes(): Promise<void> {
    try {
      const { data: carMakes } = await this._carsRepo.getAllCarMakes();
      this._carMakes = carMakes;
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getCarById(carId: string): Promise<void> {
    try {
      await this._carsRepo.getCarById(carId);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getAllCategories(): Promise<void> {
    try {
      const { data } = await this._carsRepo.getAllCategories();
      this._carsCategories = data;
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getCategoryById(categoryId: string): Promise<void> {
    try {
      await this._carsRepo.getCategoryById(categoryId);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  reset() {
    this._cars = [];
    this._carsLocations = [];
    this._carMakes = [];
    this._carsCategories = [];
    this._searchName = null;
    this._searchPlateNumber = null;
    this._selectedCarType = null;
    this._selectedStatus = null;
    this._offset = 12;
    this._page = 0;
    this._isHistoryEndReached = false;
    this._desc = null;
    this._endDate = null;
    this._startDate = null;
    this._reservationId = null;
  }

  get cars(): Array<BaseCar> {
    return this._cars;
  }

  get carCategories(): Array<CarCategory> {
    return this._carsCategories;
  }

  get carsOffset(): number {
    return this._offset;
  }

  get isHistoryEndReached(): boolean {
    return this._isHistoryEndReached;
  }

  get selectedStatus(): string | null {
    return this._selectedStatus;
  }

  get selectedCarType(): string | null {
    return this._selectedCarType;
  }

  get searchPlateNumber(): string | null {
    return this._searchPlateNumber;
  }

  get searchName(): string | null {
    return this._searchName;
  }

  get page(): number {
    return this._page;
  }

  get offset(): number {
    return this._offset;
  }

  get carsCategories(): Array<CarCategory> {
    return this._carsCategories;
  }

  get desc(): string | null {
    return this._desc;
  }

  get startDate(): string | null {
    return this._startDate;
  }

  get endDate(): string | null {
    return this._endDate;
  }

  get reservationId(): string | null {
    return this._reservationId;
  }

  get carMakes(): Array<CarMake> {
    return this._carMakes;
  }

  get carsLocations(): Array<CarLocation> {
    return this._carsLocations;
  }

  set carsLocations(value: Array<CarLocation>) {
    this._carsLocations = value;
  }

  set carMakes(value: Array<CarMake>) {
    this._carMakes = value;
  }

  set desc(value: string | null) {
    this._desc = value;
  }

  set startDate(value: string | null) {
    this._startDate = value;
  }

  set endDate(value: string | null) {
    this._endDate = value;
  }

  set reservationId(value: string | null) {
    this._reservationId = value;
  }

  set offset(value: number) {
    this._offset = value;
  }

  set carsCategories(value: Array<CarCategory>) {
    this._carsCategories = value;
  }

  set page(value: number) {
    this._page = value;
  }

  set selectedCarType(value: string | null) {
    this._selectedCarType = value;
  }

  set selectedStatus(value: string | null) {
    this._selectedStatus = value;
  }

  set searchPlateNumber(value: string | null) {
    this._searchPlateNumber = value;
  }

  set searchName(value: string | null) {
    this._searchName = value;
  }

  set isHistoryEndReached(value: boolean) {
    this._isHistoryEndReached = value;
  }

  set carsOffset(value: number) {
    this._offset = value;
  }

  set cars(value: Array<BaseCar>) {
    this._cars = value;
  }

  set carCategories(value: Array<CarCategory>) {
    this._carsCategories = value;
  }

  private get _appService() {
    return injector.get<AppService>(APP_SERVICE);
  }

  private get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private get _carsRepo() {
    return injector.get<CarsRepository>(CARS_REPOSITORY);
  }
}
