import { BaseCar } from "@/common/car/api/dto/car.dto";
import { BodyTypes } from "@/common/constants/bodyTypes";


export interface GetCarsWithFiltersPayload {
  title?: string,
  plateNumber?: string,
  status?: string,
  category: string,
  page?: number,
  perPage?: number,
  sortBy?: string,
  desc?: string,
  endDate?: string | null,
  startDate?: string | null,
  reservationId?: string | null,
}

export interface GetAllCarsDTO {
  data: Array<BaseCar>;
}

export interface GetAllCategoriesDTO {
  data: Array<CarCategory>;
}

export interface GetCategoryByIdDTO {
  data: CarCategory;
}

export interface GetCarsWithFiltersDTO {
  data: Array<BaseCar>;
}

export interface GetCarByIdDTO {
  data: BaseCar;
}

export interface GetAllCarMakesDTO {
  data: Array<CarMake>;
}

export interface CarMake {
  id: string;
  title: string;
}

export interface CarCategory {
  id: string;
  title: BodyTypes;
  description: string;
  categoryRate: CategoryRate;
  imageUrl: string;
}

export interface CategoryRate {
  dailyRate: number;
  hourlyRate: number;
}
