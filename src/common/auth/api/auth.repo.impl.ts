import { api } from "@/common/api";
import { AUTH_TOKEN_KEY } from "@/common/auth/constants";
import { AuthRepository, } from "./auth.repo";

import {
  LoginResponse,
  LoginValues,
  RegistrationResponse,
  RegistrationValues,
  ResetPasswordValues,
  RestorePasswordActivationValues,
  RestorePasswordValues,
  SendRestoreCodeValues
} from "./dto/auth.dto";


export class HttpAuthRepository implements AuthRepository {
  async getMe(): Promise<any> {
    const response = await api.get<LoginResponse>("/user/me")
    return response.data;
  }

  async login(data: LoginValues): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/user/auth/login", data);
    return response.data;
  }

  async registration(data: RegistrationValues): Promise<RegistrationResponse> {
    return await api.post("/user/registration", data);
  }

  async userActivation(token: string): Promise<void> {
    await api.put(`/user/registration/activate/${token}`);
  }

  async sendRestoreCode(data: SendRestoreCodeValues): Promise<void> {
    await api.post<Promise<void>>("/user/restore", data);
  }

  async resetPassword(data: ResetPasswordValues): Promise<void> {
    await api.post("/user/reset", data);
  }

  async restorePassword(data: RestorePasswordValues): Promise<void> {
    await api.put<Promise<void>>("/user/restore/", data);
  }

  async restorePasswordActivation(data: RestorePasswordActivationValues): Promise<void> {
    await api.put<Promise<void>>("/user/restore/activation", data);
  }

  setToken(token: string): void {
    if (typeof token === "string") {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
}
