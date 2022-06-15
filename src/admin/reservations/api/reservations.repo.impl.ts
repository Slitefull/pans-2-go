import { api } from "@/common/api";
import { ReservationsRepository } from "@/admin/reservations/api/reservations.repo";
import {
  ChangeReservationStatusPayload, GetReservationsStatusesCountDTO,
  GetReservationsWithFiltersDTO,
  GetReservationsWithFiltersPayload
} from "@/admin/reservations/api/dto/reservations.dto";


export class HttpReservationsRepository implements ReservationsRepository {
  async getReservationsWithFilters(
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
    }: GetReservationsWithFiltersPayload): Promise<GetReservationsWithFiltersDTO> {
    return await api.get(`/reservation`, {
      params: {
        pickUpDate,
        pickUpTime,
        carType,
        page,
        customerName,
        perPage,
        sortBy,
        desc,
        status,
      }
    })
  }

  async changeReservationStatus({ id, status }: ChangeReservationStatusPayload): Promise<void> {
    return await api.put(`/reservation/${id}/status`, {
      status
    })
  }

  async getReservationsStatusesCount(): Promise<GetReservationsStatusesCountDTO> {
    return await api.get("/reservation/statuses/list")
  }
}
