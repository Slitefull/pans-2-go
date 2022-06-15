import { CarCategory, CarMake } from "../api/dto/cars.dto";
import { BaseCar, CarLocation } from "@/common/car/api/dto/car.dto";


export interface BaseCarsService {
  cars: Array<BaseCar>;
  carsLocations: Array<CarLocation>;
  carMakes: Array<CarMake>;
  carsCategories: Array<CarCategory>;
  searchName: string | null;
  searchPlateNumber: string | null;
  selectedCarType: string | null;
  selectedStatus: string | null;
  offset: number;
  page: number;
  isHistoryEndReached: boolean;
  desc: string | null;

  getCarsWithFilters(): Promise<void>;

  getCarsWithFiltersOnScroll(): Promise<void>;

  getCarById(carId: string): Promise<void>;

  getAllCategories(): Promise<void>;

  getCategoryById(categoryId: string): Promise<void>;
}
