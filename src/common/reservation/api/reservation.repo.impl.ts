import { api } from "@/common/api";
import {
  ChangePaymentType,
  CreateReservationValues,
  GetReservationHistoryByCarIdPayload,
  GetReservationHistoryByUserIdPayload,
  GetReservationSummaryPrice,
  GetReservationSummaryPriceDTO,
  HourlyPackage,
  ReservationHistoryElementDTO,
  ReservationRepository,
} from "@/common/reservation/api/reservation.repo";


export class HttpReservationRepository implements ReservationRepository {
  async getSummaryPrice(data: GetReservationSummaryPrice): Promise<GetReservationSummaryPriceDTO> {
    return api.post("/reservation/summary", data);
  }

  async getReservationById(id: string): Promise<any> {
    const response = await api.get<any>(`/reservation/${id}`);
    return response.data;
  }

  async createReservation(data: CreateReservationValues): Promise<any> {
    return await api.post("/reservation", data);
  }

  async changePaymentType({ reservationId, paymentType }: ChangePaymentType): Promise<void> {
    await api.get(`/reservation/${reservationId}/payment/${paymentType}`)
  }

  async changeStatus(id: string, status: string): Promise<void> {
    await api.put(`/reservation/${id}/status`, { status, timeZone: new Date().getTimezoneOffset() / 60 });
  }

  async updateReservation(id: string, data: any): Promise<void> {
    await api.put(`/reservation/${id}`, data);
  }

  async getHourlyPackagesByCategory(categoryId: string): Promise<Array<HourlyPackage>> {
    const response = await api.get(`/reservation/packages/${categoryId}/byCategory`);
    return response.data;
  }

  async getHourlyAllPackages(): Promise<Array<HourlyPackage>> {
    const response = await api.get(`/reservation/packages`);
    return response.data;
  }

  async getReservationHistoryByCarId(
    {
      carId,
      limit,
      offset
    }: GetReservationHistoryByCarIdPayload
  ): Promise<Array<ReservationHistoryElementDTO>> {
    const response = await api.get(`/reservation/${carId}/byCar?limit=${limit}&offset=${offset}`);
    return response.data;
  }

  async getReservationHistoryByUserId(
    {
      userId,
      limit,
      offset,
      type,
    }: GetReservationHistoryByUserIdPayload
  ): Promise<Array<ReservationHistoryElementDTO>> {
    const response = await api.get(`/reservation/${userId}/byUser`, {
      params: { type, offset, limit }
    });

    return response.data;
  }

  async updateReservationDates(reservationId: string, pickUpDate: Date | string, dropOffDate: Date | string): Promise<void> {
    await api.put(`/reservation/${reservationId}/dates`, {
      pickUpDate,
      dropOffDate,
    });
  }
}
