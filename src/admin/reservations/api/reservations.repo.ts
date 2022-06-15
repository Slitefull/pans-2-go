import {
  ChangeReservationStatusPayload,
  GetReservationsStatusesCountDTO,
  GetReservationsWithFiltersDTO,
  GetReservationsWithFiltersPayload
} from "./dto/reservations.dto";


export interface ReservationsRepository {
  getReservationsWithFilters(
    {
      pickUpDate,
      pickUpTime,
      carType,
      page,
      customerName,
      perPage,
      sortBy,
      desc,
      status,
    }: GetReservationsWithFiltersPayload
  ): Promise<GetReservationsWithFiltersDTO>;

  changeReservationStatus({ id, status }: ChangeReservationStatusPayload): Promise<void>;

  getReservationsStatusesCount(): Promise<GetReservationsStatusesCountDTO>
}
