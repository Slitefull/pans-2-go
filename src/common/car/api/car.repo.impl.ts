import { api } from "@/common/api";
import { CarRepository } from "./car.repo";
import { BaseCar, EditCarPayload, UpdateCarStatusPayload } from "./dto/car.dto";


export class HttpCarRepository implements CarRepository {
  async getCarById(id: string): Promise<BaseCar> {
    const { data: car } = await api.get(`/car/${id}`);
    return car;
  }

  async updateCar({ carId, editCarData }: EditCarPayload): Promise<void> {
    await api.put(`/car/${carId}`, editCarData);
  }

  async deleteCar(carId: string): Promise<void> {
    await api.delete(`/car/${carId}`);
  }

  async updateCarStatus({ carId, status }: UpdateCarStatusPayload): Promise<void> {
    await api.put(`/car/${carId}/status`, { status });
  }
}
