import {
  GetAllCarMakesDTO,
  GetAllCarsDTO,
  GetAllCategoriesDTO,
  GetCarByIdDTO,
  GetCarsWithFiltersDTO,
  GetCarsWithFiltersPayload,
  GetCategoryByIdDTO
} from "./dto/cars.dto";


export interface CarsRepository {
  getAllCars(): Promise<GetAllCarsDTO>;

  getAllCategories(): Promise<GetAllCategoriesDTO>;

  getCategoryById(id: string): Promise<GetCategoryByIdDTO>;

  getCarsByCategory(categoryId: string, startDate?: string, endDate?: string, id?: string): Promise<GetCarsWithFiltersDTO>;

  getCarsWithFilters(
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
    }: GetCarsWithFiltersPayload
  ): Promise<GetCarsWithFiltersDTO>;

  getCarById(id: string): Promise<GetCarByIdDTO>;

  getAllCarMakes(): Promise<GetAllCarMakesDTO>
}
