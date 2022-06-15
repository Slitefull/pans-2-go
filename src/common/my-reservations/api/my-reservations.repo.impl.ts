import { api } from "@/common/api";
import { MyReservationsRepository } from "@/common/my-reservations/api/my-reservations.repo";
import { GetMyReservationsByTypeDTO, GetMyReservationsByTypePayload } from "../dto/my-reservations.dto";


export class HttpMyReservationsRepository implements MyReservationsRepository {
  async getMyReservationsByType(
    {
      type,
      limit,
      offset
    }: GetMyReservationsByTypePayload
  ): Promise<GetMyReservationsByTypeDTO> {
    return api.get(`/reservation/byUser`, {
      params: {
        type,
        limit,
        offset
      }
    });
  }
}
