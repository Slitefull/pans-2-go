import { CreateMediaByBase64Values, Media } from "@/common/media/api/media.repo";

import {
  LoginValues,
  RegistrationValues,
  ResetPasswordValues,
  RestorePasswordActivationValues,
  RestorePasswordValues,
  SendRestoreCodeValues
} from "../api/dto/auth.dto";


export interface BaseAuthService {
  isAuthenticated: boolean;
  isOpenRestorePassword: boolean;
  driverLicenceMedias: Array<Media>;
  openedMobileTab: number;

  getMe(): void;

  login(values: LoginValues, redirectToPage?: string): Promise<void>;

  registration(values: RegistrationValues): Promise<void>;

  userActivation(token: string): Promise<void>;

  sendRestoreCode(data: SendRestoreCodeValues): Promise<void>;

  restorePassword(data: RestorePasswordValues): Promise<void>;

  restorePasswordActivation(data: RestorePasswordActivationValues, redirectPage: string): Promise<void>;

  resetPassword(values: ResetPasswordValues): Promise<void>;

  createDriverLicenceImage(values: Array<CreateMediaByBase64Values>): Promise<void>;

  logout(page: string): void;
}
