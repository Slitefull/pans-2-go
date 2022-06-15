import {
  GetMeResponse,
  LoginResponse,
  LoginValues,
  RegistrationResponse,
  RegistrationValues,
  ResetPasswordValues,
  RestorePasswordActivationValues,
  RestorePasswordValues,
  SendRestoreCodeValues
} from "./dto/auth.dto";


export interface AuthRepository {
  login(data: LoginValues): Promise<LoginResponse>;

  registration(data: RegistrationValues): Promise<RegistrationResponse>;

  sendRestoreCode(data: SendRestoreCodeValues): Promise<void>;

  restorePassword(data: RestorePasswordValues): Promise<void>;

  resetPassword(data: ResetPasswordValues): Promise<void>;

  restorePasswordActivation(data: RestorePasswordActivationValues): Promise<void>;

  userActivation(token: string): Promise<void>;

  setToken(token: string | null): void;

  getToken(): string | null;

  getMe(): Promise<GetMeResponse>;
}
