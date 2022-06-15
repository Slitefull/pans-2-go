import { injector } from "@/common/injector/Injector";
import { action, makeAutoObservable } from "mobx";
import { CreateMediaByBase64Values, Media, MediaRepository } from "@/common/media/api/media.repo";
import { CreateCarData } from "../api/dto/new-car.dto";
import { NewCarRepository } from "../api/new-car.repo";
import { BaseNewCarService } from "@/admin/new-car/domain/new-car.common.service";
import { History } from "history";
import { CARS_PAGE } from "@/common/constants/routes";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import i18next from "i18next";
import { DroneMobileRepository } from "@/common/drone-mobile/api/drone-mobile.repo";
import { DMVehicle } from "@/common/drone-mobile/api/dto/drone-mobile.dto";

import {
  DRONE_MOBILE_REPOSITORY,
  HISTORY,
  MEDIA_REPOSITORY,
  NEW_CAR_REPOSITORY,
  NOTIFICATION_SERVICE
} from "@/common/injector/constants";


export class NewCarService implements BaseNewCarService {
  private _deviceKey: string;
  private _isAddedDeviceKey: boolean;
  private _isPassedSettingCar: boolean;
  private _uploadedCarPhoto: Array<Media>;
  private _insuranceMedia: Array<Media>;
  private _registrationMedia: Array<Media>;
  private _serviceInspectionMedia: Array<Media>;
  private _selectedCarDM: DMVehicle | null;
  private _isOpenAddDeviceKeyModal: boolean;

  constructor() {
    this._deviceKey = '';
    this._isAddedDeviceKey = false;
    this._isPassedSettingCar = false;
    this._uploadedCarPhoto = [];
    this._insuranceMedia = [];
    this._registrationMedia = [];
    this._serviceInspectionMedia = [];
    this._selectedCarDM = null;
    this._isOpenAddDeviceKeyModal = true;

    makeAutoObservable(this);
  }

  @action
  async getCarByDeviceKey(): Promise<void> {
    try {
      const car = await this._droneMobileRepo.getVehicle(this.deviceKey);
      this._selectedCarDM = car;
      this._isAddedDeviceKey = true;
      this._isOpenAddDeviceKeyModal = false;
      this._isPassedSettingCar = true;
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
      this._isPassedSettingCar = true;
    }
  }

  @action
  async createCarPhotoMedia(values: Array<CreateMediaByBase64Values>): Promise<void> {
    try {
      const { data: createdMediaIds } = await this._mediaRepo.createMediaByBase64(values);
      this._uploadedCarPhoto = createdMediaIds;

      this._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  removeCarPhotoMedia(): void {
    this._uploadedCarPhoto = [];
    this._selectedCarDM!.image = '';

    this._notificationService.notify({
      message: i18next.t("admin.mediaWasRemoved"),
      status: "success",
    })
  }

  @action
  async createInsuranceMedia(values: Array<CreateMediaByBase64Values>): Promise<void> {
    try {
      const { data: createdMediaIds } = await this._mediaRepo.createMediaByBase64(values);
      this._insuranceMedia = createdMediaIds;

      this._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  removeInsuranceMedia(): void {
    this._insuranceMedia = [];

    this._notificationService.notify({
      message: i18next.t("admin.mediaWasRemoved"),
      status: "success",
    })
  }

  @action
  async createRegistrationMedia(values: Array<CreateMediaByBase64Values>): Promise<void> {
    try {
      const { data: createdMediaIds } = await this._mediaRepo.createMediaByBase64(values);
      this._registrationMedia = createdMediaIds;

      this._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  removeRegistrationMedia(): void {
    this._registrationMedia = [];

    this._notificationService.notify({
      message: i18next.t("admin.mediaWasRemoved"),
      status: "success",
    })
  }

  @action
  async createServiceInspectionMedia(values: Array<CreateMediaByBase64Values>): Promise<void> {
    try {
      const { data: createdMediaIds } = await this._mediaRepo.createMediaByBase64(values);
      this._serviceInspectionMedia = createdMediaIds;

      this._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  removeServiceInspectionMedia(): void {
    this._serviceInspectionMedia = [];

    this._notificationService.notify({
      message: i18next.t("admin.mediaWasRemoved"),
      status: "success",
    })
  }

  @action
  async createCar(data: CreateCarData): Promise<void> {
    try {
      await this._newCarRepo.createCar(data);
      this._notificationService.notify({
        message: i18next.t("admin.newCarHasBeenSuccessfullyCreated"),
        status: "success",
      })
      this.reset();
      this._history.push(CARS_PAGE);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  reset(): void {
    this._deviceKey = '';
    this._isAddedDeviceKey = false;
    this._isPassedSettingCar = false;
    this._uploadedCarPhoto = [];
    this._insuranceMedia = [];
    this._registrationMedia = [];
    this._serviceInspectionMedia = [];
    this._selectedCarDM = null;
    this._isOpenAddDeviceKeyModal = true;
  }

  get serviceInspectionMedia(): Array<Media> {
    return this._serviceInspectionMedia;
  }

  get registrationMedia(): Array<Media> {
    return this._registrationMedia;
  }

  get insuranceMedia(): Array<Media> {
    return this._insuranceMedia;
  }

  get uploadedCarPhoto(): Array<Media> {
    return this._uploadedCarPhoto;
  }

  get deviceKey(): string {
    return this._deviceKey;
  }

  get selectedCarDM(): DMVehicle | null {
    return this._selectedCarDM;
  }

  get isAddedDeviceKey(): boolean {
    return this._isAddedDeviceKey;
  }

  get isOpenAddDeviceKeyModal(): boolean {
    return this._isOpenAddDeviceKeyModal;
  }

  get isPassedSettingCar(): boolean {
    return this._isPassedSettingCar;
  }

  set isPassedSettingCar(value: boolean) {
    this._isPassedSettingCar = value;
  }

  set isOpenAddDeviceKeyModal(value: boolean) {
    this._isOpenAddDeviceKeyModal = value;
  }

  set isAddedDeviceKey(value: boolean) {
    this._isAddedDeviceKey = value;
  }

  set selectedCarDM(value: DMVehicle | null) {
    this._selectedCarDM = value;
  }

  set deviceKey(value: string) {
    this._deviceKey = value;
  }

  set uploadedCarPhoto(value: Array<Media>) {
    this._uploadedCarPhoto = value;
  }

  set insuranceMedia(value: Array<Media>) {
    this._insuranceMedia = value;
  }

  set registrationMedia(value: Array<Media>) {
    this._registrationMedia = value;
  }

  set serviceInspectionMedia(value: Array<Media>) {
    this._serviceInspectionMedia = value;
  }

  private get _history() {
    return injector.get<History>(HISTORY);
  }

  private get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private get _newCarRepo() {
    return injector.get<NewCarRepository>(NEW_CAR_REPOSITORY);
  }

  private get _droneMobileRepo() {
    return injector.get<DroneMobileRepository>(DRONE_MOBILE_REPOSITORY);
  }

  private get _mediaRepo() {
    return injector.get<MediaRepository>(MEDIA_REPOSITORY);
  }
}
