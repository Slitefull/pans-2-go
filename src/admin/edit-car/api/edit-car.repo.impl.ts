import { api } from "@/common/api";
import { EditCarRepository } from "@/admin/edit-car/api/edit-car.repo";
import {
  ChangeLogElement,
  CreateMaintenancePayload,
  EditMaintenanceValues,
  GetChangeLogByIdPayload,
  MaintenanceDTO,
  UpdateCarValues
} from "@/admin/edit-car/api/dto/edit-car.dto";


export class HttpEditCarRepository implements EditCarRepository {
  async updateCar(carId: string, values: UpdateCarValues): Promise<void> {
    return await api.put(`/car/${carId}`, {
      ...values
    })
  }

  async createMaintenance(
    {
      typeOfService,
      odometer,
      date,
      comment,
      carId,
      mediaId
    }: CreateMaintenancePayload): Promise<void> {
    return await api.post(`/car/maintenance`, {
      typeOfService,
      odometer,
      date,
      comment,
      carId,
      mediaId
    })
  }

  async getMaintenanceByCarId(carId: string): Promise<Array<MaintenanceDTO>> {
    const response = await api.get("/car/maintenance");
    return response.data;
  }

  async getMaintenanceElementById(maintenanceId: string): Promise<MaintenanceDTO> {
    const response = await api.get(`/car/maintenance/${maintenanceId}`);
    return response.data;
  }

  async editMaintenanceElementById(maintenanceId: string, values: EditMaintenanceValues): Promise<void> {
    return await api.put(`/car/maintenance/${maintenanceId}`, {
      ...values
    })
  }

  async deleteMaintenanceElementById(id: string): Promise<void> {
    await api.delete(`/car/maintenance/${id}`)
  }

  async getChangeLogById({ userId, page, perPage }: GetChangeLogByIdPayload): Promise<Array<ChangeLogElement>> {
    const response = await api.get(`/car/log/${userId}/byCar?page=${page}&perPage=${perPage}`);
    return response.data;
  }
}
