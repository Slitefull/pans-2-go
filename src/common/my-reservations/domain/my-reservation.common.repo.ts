import { MyReservation } from "@/common/my-reservations/api/my-reservations.repo";


export interface BaseMyReservationsService {
  myReservations: Array<MyReservation>;
  offset: number;
  limit: number;
  isHistoryEndReached: boolean;

  reset(): void;

  getMyReservationsByType(type: string): Promise<void>;

  getReservationsOnScroll(type: string): Promise<void>;
}
