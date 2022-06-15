import { BaseCar } from "@/common/car/api/dto/car.dto";
import { CreateMediaByBase64Values, Media } from "@/common/media/api/media.repo";
import { TypesOfServiceValues } from "@/common/constants/typesOfService";
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


export interface BaseEditCarService {
  selectedCar: BaseCar | null;
  carPhotoMedia: Array<Media>;
  insuranceMedia: Array<Media>;
  registrationMedia: Array<Media>;
  serviceInspectionMedia: Array<Media>;
  maintenanceMedia: Array<Media>;
  isMaintenanceMediaDeleted: boolean;
  isOpenAddServiceModal: boolean;
  reservationHistory: Array<ReservationHistoryElement>;
  maintenance: Array<MaintenanceDTO>;
  selectedMaintenanceId: string;
  selectedMaintenance: MaintenanceDTO | null;
  filteredMaintenance: Array<MaintenanceDTO>;
  changeLogs: Array<ChangeLogElement>;
  page: number;
  perPage: number;

  setSelectedCar(carId: string): Promise<void>;

  updateCar(carId: string, values: UpdateCarValues): Promise<void>;

  createInsuranceMedia(values: Array<CreateMediaByBase64Values>): Promise<void>;

  removeInsuranceMedia(): void;

  createRegistrationMedia(values: Array<CreateMediaByBase64Values>): Promise<void>;

  removeRegistrationMedia(): void;

  createServiceInspectionMedia(values: Array<CreateMediaByBase64Values>): Promise<void>;

  removeServiceInspectionMedia(): void;

  createMaintenanceMedia(values: Array<CreateMediaByBase64Values>): Promise<void>;

  removeMaintenanceMedia(): void;

  createCarPhotoMedia(values: Array<CreateMediaByBase64Values>): Promise<void>;

  getReservationHistoryByCarId({ carId, limit, offset }: GetReservationHistoryByCarIdPayload): Promise<void>;

  removeCarPhotoMedia(): void;

  createMaintenance(
    {
      typeOfService,
      odometer,
      date,
      comment,
      carId,
      mediaId
    }: CreateMaintenancePayload
  ): Promise<void>;

  getMaintenanceByCarId(carId: string): Promise<void>;

  getMaintenanceElementById(maintenanceId: string): Promise<void>;

  editMaintenanceElementById(maintenanceId: string, values: EditMaintenanceValues): Promise<void>;

  deleteMaintenanceElementById(id: string): Promise<void>;

  filterMaintenanceByServiceType(serviceType: TypesOfServiceValues): void;

  getChangeLogById({ userId, page, perPage }: GetChangeLogByIdPayload): Promise<void>;

  reset(): void;

  resetEditMaintenance(): void;
}
