export interface GetAllCategoriesDTO {
  data: Array<CarCategory>
}

export interface CarCategory {
  id: string,
  title: string,
  description: string,
  categoryRate: {
    dailyRate: number,
    hourlyRate: number,
  }
}
