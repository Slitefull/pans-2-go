export interface UploadStartTripImageIdPayload {
  reservationId: string;
  carId: string;
  startTripImageId: string;
}

export interface UploadEndTripImageIdPayload {
  reservationId: string;
  carId: string;
  endTripImageId: string;
}

export interface LockCarServicePayload {
  carId: string;
  deviceKey: string;
  reservationType: "upcoming" | "past";
}

export interface LockCarPayload {
  carId: string;
  deviceKey: string;
}

export interface UnlockCarServicePayload {
  carId: string;
  deviceKey: string;
  reservationType: "upcoming" | "past";
}

export interface UnlockCarPayload {
  carId: string;
  deviceKey: string;
}

export interface LockCarRepository {
  uploadStartTripImageId({ reservationId, carId, startTripImageId }: UploadStartTripImageIdPayload): Promise<void>;

  uploadEndTripImageId({ reservationId, carId, endTripImageId }: UploadEndTripImageIdPayload): Promise<void>;

  lockCar({ carId, deviceKey }: LockCarPayload): Promise<void>;

  unlockCar({ carId, deviceKey }: UnlockCarPayload): Promise<void>;
}
