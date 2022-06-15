import { MyReservation } from "@/common/my-reservations/api/my-reservations.repo";
import { CreateMediaByBase64Values, Media } from "@/common/media/api/media.repo";
import {
  LockCarPayload,
  UnlockCarPayload,
  UploadEndTripImageIdPayload,
  UploadStartTripImageIdPayload
} from "@/common/lock-car/api/lock-car.repo";


export type UploadStartTripImageIdMethodPayload = Omit<UploadStartTripImageIdPayload, "startTripImageId">;
export type UploadEndTripImageIdMethodPayload = Omit<UploadEndTripImageIdPayload, "endTripImageId">;

export interface BaseLockCarService {
  currentStep: number;
  selectedReservation: MyReservation | null;
  isConfirm: boolean;
  selectedPaymentMethod: string;
  startTripImages: Array<Media>;
  endTripImages: Array<Media>;
  isLoadingLockUnlock: boolean;

  createStartTripImage(values: Array<CreateMediaByBase64Values>): Promise<void>

  createEndTripTripImage(values: Array<CreateMediaByBase64Values>): Promise<void>

  uploadStartTripImageId({ reservationId, carId }: UploadStartTripImageIdMethodPayload): Promise<void>;

  uploadEndTripImageId({ reservationId, carId }: UploadEndTripImageIdMethodPayload): Promise<void>;

  lockCar({ carId, deviceKey }: LockCarPayload): Promise<void>;

  unlockCar({ carId, deviceKey }: UnlockCarPayload): Promise<void>;

  onSubmitLockCar(): Promise<void>;

  onSubmitUnlockCar(): void;

  reset(): void;
}
