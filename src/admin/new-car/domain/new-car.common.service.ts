import { CreateCarData } from "@/admin/new-car/api/dto/new-car.dto";
import { CreateMediaByBase64Values, Media } from "@/common/media/api/media.repo";
import { DMVehicle } from "@/common/drone-mobile/api/dto/drone-mobile.dto";


export interface BaseNewCarService {
  deviceKey: string;
  isAddedDeviceKey: boolean;
  uploadedCarPhoto: Array<Media>;
  isPassedSettingCar: boolean;
  insuranceMedia: Array<Media>;
  registrationMedia: Array<Media>;
  serviceInspectionMedia: Array<Media>;
  selectedCarDM: DMVehicle | null;
  isOpenAddDeviceKeyModal: boolean;

  getCarByDeviceKey(): Promise<void>;

  createCarPhotoMedia(values: Array<CreateMediaByBase64Values>): Promise<void>;

  removeCarPhotoMedia(): void;

  createServiceInspectionMedia(values: Array<CreateMediaByBase64Values>): Promise<void>;

  removeServiceInspectionMedia(): void;

  createRegistrationMedia(values: Array<CreateMediaByBase64Values>): Promise<void>;

  removeRegistrationMedia(): void;

  createInsuranceMedia(values: Array<CreateMediaByBase64Values>): Promise<void>;

  removeInsuranceMedia(): void;

  createCar(data: CreateCarData): Promise<void>;

  reset(): void
}
