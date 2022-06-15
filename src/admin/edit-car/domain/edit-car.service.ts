import { action, makeAutoObservable } from "mobx";
import i18next from "i18next";
import { BaseEditCarService } from "@/admin/edit-car/domain/edit-car.common.service";
import { injector } from "@/common/injector/Injector";
import { CarRepository } from "@/common/car/api/car.repo";
import { BaseCar } from "@/common/car/api/dto/car.dto";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { CreateMediaByBase64Values, Media, MediaRepository } from "@/common/media/api/media.repo";
import moment from "moment";
import { ReservationRepository } from "@/common/reservation/api/reservation.repo";
import { EditCarRepository } from "@/admin/edit-car/api/edit-car.repo";
import { getHoursCount } from "./heplers/getHoursCount.helper";
import { TypesOfServiceValues } from "@/common/constants/typesOfService";
import {
  CAR_REPOSITORY,
  EDIT_CAR_REPOSITORY,
  MEDIA_REPOSITORY,
  NOTIFICATION_SERVICE,
  RESERVATION_REPOSITORY
} from "@/common/injector/constants";
import {
  ChangeLogElement,
  CreateMaintenancePayload,
  EditMaintenanceValues,
  GetChangeLogByIdPayload,
  GetReservationHistoryByCarIdPayload,
  MaintenanceDTO,
  ReservationHistoryElement,
  UpdateCarValues
} from "@/admin/edit-car/api/dto/edit-car.dto";


export class EditCarService implements BaseEditCarService {
  private _selectedCar: BaseCar | null;
  private _carPhotoMedia: Array<Media>;
  private _insuranceMedia: Array<Media>;
  private _registrationMedia: Array<Media>;
  private _serviceInspectionMedia: Array<Media>;
  private _maintenanceMedia: Array<Media>;
  private _isMaintenanceMediaDeleted: boolean;
  private _isOpenAddServiceModal: boolean;
  private _reservationHistory: Array<ReservationHistoryElement>;
  private _maintenance: Array<MaintenanceDTO>;
  private _filteredMaintenance: Array<MaintenanceDTO>;
  private _selectedMaintenanceId: string;
  private _selectedMaintenance: MaintenanceDTO | null;
  private _changeLogs: Array<ChangeLogElement>;
  private _page: number;
  private _perPage: number;

  constructor() {
    this._selectedCar = null;
    this._carPhotoMedia = [];
    this._insuranceMedia = [];
    this._registrationMedia = [];
    this._maintenanceMedia = [];
    this._isMaintenanceMediaDeleted = false;
    this._serviceInspectionMedia = [];
    this._isOpenAddServiceModal = false;
    this._reservationHistory = [];
    this._maintenance = [];
    this._filteredMaintenance = [];
    this._selectedMaintenanceId = '';
    this._selectedMaintenance = null;
    this._changeLogs = [];
    this._page = 0;
    this._perPage = 10;

    makeAutoObservable(this);
  }

  @action
  async setSelectedCar(carId: string): Promise<void> {
    try {
      this._selectedCar = await EditCarService._carRepo.getCarById(carId);
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async updateCar(carId: string, values: UpdateCarValues): Promise<void> {
    try {
      await EditCarService._editCarRepo.updateCar(carId, values);
      EditCarService._notificationService.notify({
        message: "Car updated!",
        status: "success",
      })
      await this.getChangeLogById({
        userId: this._selectedCar!.id,
        page: this._page,
        perPage: this._perPage
      })
      await this.setSelectedCar(this._selectedCar!.id)
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async createInsuranceMedia(values: Array<CreateMediaByBase64Values>): Promise<void> {
    try {
      const { data: createdMediaIds } = await EditCarService._mediaRepo.createMediaByBase64(values);
      this._insuranceMedia = createdMediaIds;

      EditCarService._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async removeInsuranceMedia(): Promise<void> {
    this._insuranceMedia = [];
    EditCarService._notificationService.notify({
      message: i18next.t("admin.mediaDeleted"),
      status: "success",
    })
  }

  @action
  async createRegistrationMedia(values: Array<CreateMediaByBase64Values>): Promise<void> {
    try {
      const { data: createdMediaIds } = await EditCarService._mediaRepo.createMediaByBase64(values);
      this._registrationMedia = createdMediaIds;

      EditCarService._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  removeRegistrationMedia(): void {
    this._registrationMedia = [];
    EditCarService._notificationService.notify({
      message: i18next.t("admin.mediaDeleted"),
      status: "success",
    })
  }

  @action
  async createServiceInspectionMedia(values: Array<CreateMediaByBase64Values>): Promise<void> {
    try {
      const { data: createdMediaIds } = await EditCarService._mediaRepo.createMediaByBase64(values);
      this._serviceInspectionMedia = createdMediaIds;

      EditCarService._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  removeServiceInspectionMedia(): void {
    this._serviceInspectionMedia = [];
    EditCarService._notificationService.notify({
      message: i18next.t("admin.mediaDeleted"),
      status: "success",
    })
  }

  @action
  async createMaintenanceMedia(values: Array<CreateMediaByBase64Values>): Promise<void> {
    try {
      const { data: createdMediaIds } = await EditCarService._mediaRepo.createMediaByBase64(values);
      this._maintenanceMedia = createdMediaIds;

      EditCarService._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  removeMaintenanceMedia(): void {
    if (this._selectedMaintenance) {
      const { media, ...rest } = this._selectedMaintenance;
      this._selectedMaintenance = rest;
    }
    this._isMaintenanceMediaDeleted = true;
    this._maintenanceMedia = [];
    EditCarService._notificationService.notify({
      message: i18next.t("admin.mediaDeleted"),
      status: "success",
    })
  }

  @action
  async createCarPhotoMedia(values: Array<CreateMediaByBase64Values>): Promise<void> {
    try {
      const { data: createdMediaIds } = await EditCarService._mediaRepo.createMediaByBase64(values);
      this._carPhotoMedia = createdMediaIds;

      EditCarService._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getReservationHistoryByCarId({ carId, limit, offset }: GetReservationHistoryByCarIdPayload): Promise<void> {
    try {
      const reservationHistoryElements = await EditCarService._reservationRepo.getReservationHistoryByCarId({
        carId,
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
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async createMaintenance(
    {
      typeOfService,
      odometer,
      date,
      comment,
      carId,
      mediaId
    }: CreateMaintenancePayload
  ): Promise<void> {
    try {
      await EditCarService._editCarRepo.createMaintenance({
        typeOfService,
        odometer,
        date,
        comment,
        carId,
        mediaId
      })
      await this.getMaintenanceByCarId(this._selectedCar!.id);

      EditCarService._notificationService.notify({
        message: "New maintenance has been created!",
        status: "success",
      })

      this.resetEditMaintenance();
      this._isOpenAddServiceModal = false;
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getMaintenanceByCarId(carId: string): Promise<void> {
    try {
      const maintenance = await EditCarService._editCarRepo.getMaintenanceByCarId(carId);
      this._maintenance = maintenance;
      this._filteredMaintenance = maintenance;
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async getMaintenanceElementById(maintenanceId: string): Promise<void> {
    try {
      this._selectedMaintenance = await EditCarService._editCarRepo.getMaintenanceElementById(maintenanceId);
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async editMaintenanceElementById(maintenanceId: string, values: EditMaintenanceValues): Promise<void> {
    try {
      await EditCarService._editCarRepo.editMaintenanceElementById(maintenanceId, values);
      await this.getMaintenanceByCarId(this._selectedCar!.id);
      this.resetEditMaintenance();
      this._isOpenAddServiceModal = false;
      EditCarService._notificationService.notify({
        message: "Maintenance has been successfully updated!",
        status: "success",
      })
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  async deleteMaintenanceElementById(id: string): Promise<void> {
    try {
      await EditCarService._editCarRepo.deleteMaintenanceElementById(id);
      await this.getMaintenanceByCarId(this._selectedCar!.id);
      EditCarService._notificationService.notify({
        message: "Maintenance has been successfully deleted!",
        status: "success",
      })
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async getChangeLogById({ userId, page, perPage }: GetChangeLogByIdPayload): Promise<void> {
    try {
      this._changeLogs = await EditCarService._editCarRepo.getChangeLogById({
        userId,
        page,
        perPage
      });
    } catch (e) {
      EditCarService._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  filterMaintenanceByServiceType(serviceType: TypesOfServiceValues): void {
    if (serviceType === TypesOfServiceValues.AllServices) {
      this._filteredMaintenance = this._maintenance;
      return;
    }
    this._filteredMaintenance = this._maintenance.filter((element) => element.typeOfService === serviceType);
  }

  @action
  removeCarPhotoMedia(): void {
    this._carPhotoMedia = [];
    EditCarService._notificationService.notify({
      message: i18next.t("admin.mediaDeleted"),
      status: "success",
    })
  }

  @action
  reset(): void {
    this._selectedCar = null;
    this._carPhotoMedia = [];
    this._insuranceMedia = [];
    this._registrationMedia = [];
    this._maintenanceMedia = [];
    this._isMaintenanceMediaDeleted = false;
    this._serviceInspectionMedia = [];
    this._isOpenAddServiceModal = false;
    this._reservationHistory = [];
    this._maintenance = [];
    this._filteredMaintenance = [];
    this._selectedMaintenanceId = '';
    this._selectedMaintenance = null;
    this._changeLogs = [];
    this._page = 0;
    this._perPage = 10;
  }

  @action
  resetEditMaintenance(): void {
    this._selectedMaintenanceId = '';
    this._selectedMaintenance = null;
    this._isMaintenanceMediaDeleted = false;
    this._maintenanceMedia = [];
  }

  get selectedCar(): BaseCar | null {
    return this._selectedCar;
  }

  get insuranceMedia(): Array<Media> {
    return this._insuranceMedia;
  }

  get registrationMedia(): Array<Media> {
    return this._registrationMedia;
  }

  get serviceInspectionMedia(): Array<Media> {
    return this._serviceInspectionMedia;
  }

  get carPhotoMedia(): Array<Media> {
    return this._carPhotoMedia;
  }

  get isOpenAddServiceModal(): boolean {
    return this._isOpenAddServiceModal;
  }

  get reservationHistory(): Array<ReservationHistoryElement> {
    return this._reservationHistory;
  }

  get maintenance(): Array<MaintenanceDTO> {
    return this._maintenance;
  }

  get maintenanceMedia(): Array<Media> {
    return this._maintenanceMedia;
  }

  get filteredMaintenance(): Array<MaintenanceDTO> {
    return this._filteredMaintenance;
  }

  get perPage(): number {
    return this._perPage;
  }

  get isMaintenanceMediaDeleted(): boolean {
    return this._isMaintenanceMediaDeleted;
  }

  set isMaintenanceMediaDeleted(value: boolean) {
    this._isMaintenanceMediaDeleted = value;
  }

  set perPage(value: number) {
    this._perPage = value;
  }

  get page(): number {
    return this._page;
  }

  get selectedMaintenance(): MaintenanceDTO | null {
    return this._selectedMaintenance;
  }

  get selectedMaintenanceId(): string {
    return this._selectedMaintenanceId;
  }

  set selectedMaintenance(value: MaintenanceDTO | null) {
    this._selectedMaintenance = value;
  }

  set selectedMaintenanceId(value: string) {
    this._selectedMaintenanceId = value;
  }

  set page(value: number) {
    this._page = value;
  }

  get changeLogs(): Array<ChangeLogElement> {
    return this._changeLogs;
  }

  set changeLogs(value: Array<ChangeLogElement>) {
    this._changeLogs = value;
  }

  set filteredMaintenance(value: Array<MaintenanceDTO>) {
    this._filteredMaintenance = value;
  }

  set maintenanceMedia(value: Array<Media>) {
    this._maintenanceMedia = value;
  }

  set maintenance(value: Array<MaintenanceDTO>) {
    this._maintenance = value;
  }

  set reservationHistory(value: Array<ReservationHistoryElement>) {
    this._reservationHistory = value;
  }

  set isOpenAddServiceModal(value: boolean) {
    this._isOpenAddServiceModal = value;
  }

  set carPhotoMedia(value: Array<Media>) {
    this._carPhotoMedia = value;
  }

  set selectedCar(value: BaseCar | null) {
    this._selectedCar = value;
  }

  set serviceInspectionMedia(value: Array<Media>) {
    this._serviceInspectionMedia = value;
  }

  set insuranceMedia(value: Array<Media>) {
    this._insuranceMedia = value;
  }

  set registrationMedia(value: Array<Media>) {
    this._registrationMedia = value;
  }

  private static get _mediaRepo() {
    return injector.get<MediaRepository>(MEDIA_REPOSITORY);
  }

  private static get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private static get _editCarRepo() {
    return injector.get<EditCarRepository>(EDIT_CAR_REPOSITORY);
  }

  private static get _reservationRepo() {
    return injector.get<ReservationRepository>(RESERVATION_REPOSITORY);
  }

  private static get _carRepo() {
    return injector.get<CarRepository>(CAR_REPOSITORY);
  }
}
