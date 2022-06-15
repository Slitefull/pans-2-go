import { api } from "@/common/api";
import {
  LockCarPayload,
  LockCarRepository,
  UnlockCarPayload,
  UploadEndTripImageIdPayload,
  UploadStartTripImageIdPayload
} from "./lock-car.repo";


export class HttpLockCarRepository implements LockCarRepository {
  async uploadStartTripImageId(
    {
      reservationId,
      carId,
      startTripImageId
    }: UploadStartTripImageIdPayload): Promise<void> {
    return await api.put(`/reservation/upload/${reservationId}/car/${carId}`, {
      startTripImageId
    });
  }

  async uploadEndTripImageId(
    {
      reservationId,
      carId,
      endTripImageId
    }: UploadEndTripImageIdPayload): Promise<void> {
    return await api.put(`/reservation/upload/${reservationId}/car/${carId}`, {
      endTripImageId
    });
  }

  async lockCar({ carId, deviceKey }: LockCarPayload): Promise<void> {
    return await api.get(`/car/${carId}/lock/${deviceKey}`);
  }

  async unlockCar({ carId, deviceKey }: UnlockCarPayload): Promise<void> {
    return await api.get(`/car/${carId}/unlock/${deviceKey}`);
  }
}
