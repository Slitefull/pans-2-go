import { api } from "@/common/api";
import { CarsRepository } from "./cars.repo";
import {
  GetAllCarMakesDTO, GetAllCarsDTO,
  GetAllCategoriesDTO,
  GetCarByIdDTO,
  GetCarsWithFiltersDTO,
  GetCarsWithFiltersPayload,
  GetCategoryByIdDTO
} from "./dto/cars.dto";


export class HttpCarsRepository implements CarsRepository {
  async getAllCars(): Promise<GetAllCarsDTO> {
    return await api.get("/car");
  }

  async getAllCategories(): Promise<GetAllCategoriesDTO> {
    return await api.get(`/car/categories`);
  }

  async getCategoryById(id: string): Promise<GetCategoryByIdDTO> {
    return await api.get(`/car/categories/${id}`);
  }

  async getCarsByCategory(categoryId: string, startDate?: string, endDate?: string, id?: string): Promise<GetCarsWithFiltersDTO> {
    return await api.get(`/car/${categoryId}/byCategory`, {
      params: {
        startDate,
        endDate,
        reservationId: id,
      }
    });
  }

  async getCarsWithFilters(
    {
      title,
      plateNumber,
      status,
      category,
      page,
      perPage,
      sortBy,
      desc,
      endDate,
      startDate,
      reservationId,
    }: GetCarsWithFiltersPayload): Promise<GetCarsWithFiltersDTO> {
    return await api.get(`/car`, {
      params: {
        title,
        plateNumber,
        status,
        page,
        perPage,
        sortBy,
        desc,
        category,
        endDate,
        startDate,
        reservationId,
      }
    })
  }

  async getCarById(id: string): Promise<GetCarByIdDTO> {
    return await api.get(`/car/${id}`);
  }

  async getAllCarMakes(): Promise<GetAllCarMakesDTO> {
    return await api.get("/car/makes");
  }
}
