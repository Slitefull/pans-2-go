import {
  ChangeLogElement,
  CreateMaintenancePayload, EditMaintenanceValues,
  GetChangeLogByIdPayload,
  MaintenanceDTO,
  UpdateCarValues
} from "@/admin/edit-car/api/dto/edit-car.dto";


export interface EditCarRepository {
  updateCar(carId: string, values: UpdateCarValues): Promise<void>;

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

  getMaintenanceByCarId(carId: string): Promise<Array<MaintenanceDTO>>;

  getMaintenanceElementById(maintenanceId: string): Promise<MaintenanceDTO>;

  editMaintenanceElementById(maintenanceId: string, values: EditMaintenanceValues): Promise<void>;

  deleteMaintenanceElementById(id: string): Promise<void>;

  getChangeLogById({ userId, page, perPage }: GetChangeLogByIdPayload): Promise<Array<ChangeLogElement>>;
}
