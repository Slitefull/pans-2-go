import {
  ChangeReservationStatusPayload,
  GetReservationsWithFiltersPayload,
  Reservation,
  ReservationStatusesCount
} from "../api/dto/reservations.dto";


export interface BaseReservationsService {
  reservations: Array<Reservation>;
  statusesCount: ReservationStatusesCount | null;
  selectedFilterTab: string;
  page: number;
  perPage: number;
  isHistoryEndReached: boolean;
  customerName: string | null;
  carType: string | null;
  pickUpDate: string | null;
  pickUpTime: string | null;
  sortBy: string | null;
  desc: string | null;
  status: string | null;
  isLoading: boolean;

  getReservationsWithFilters(
    {
      pickUpDate,
      pickUpTime,
      page,
      perPage,
      sortBy,
      desc
    }: GetReservationsWithFiltersPayload
  ): Promise<void>;

  changeReservationStatus({ id, status }: ChangeReservationStatusPayload): Promise<void>;

  getReservationsStatusesCount(): Promise<void>;
}
