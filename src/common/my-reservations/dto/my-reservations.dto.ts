import { MyReservation } from "@/common/my-reservations/api/my-reservations.repo";

export interface GetMyReservationsByTypePayload {
  type: string,
  limit: number,
  offset: number;
}

export interface GetReservationsOnScrollPayload {
  type: string,
  limit: number,
}

export interface GetMyReservationsByTypeDTO {
  data: Array<MyReservation>
}
