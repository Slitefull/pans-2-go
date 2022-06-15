import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { injector } from "@/common/injector/Injector";
import { AuthService } from "@/common/auth/domain/auth.service";
import { AUTH_SERVICE, EXCEPTION_SERVICE } from "@/common/injector/constants";
import { LOGIN_PAGE } from "@/common/constants/routes";
import { ExceptionService } from "@/infrastructure/exception/exception.service";
import { BaseError } from "@/infrastructure/exception/exception.repo";


export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  }, (error) => {
    const authService = injector.get<AuthService>(AUTH_SERVICE);

    if (error.response?.status === 401) {
      authService.logout(LOGIN_PAGE);
    }

    const exceptionService = injector.get<ExceptionService>(EXCEPTION_SERVICE);
    exceptionService.consumeError(error.response?.data as BaseError);

    return Promise.reject(error);
  });

api.interceptors.request.use((config: AxiosRequestConfig) => {
    const authService = injector.get<AuthService>(AUTH_SERVICE);

    const newConfig = {
      ...config,
    };

    if (authService.token) {
      newConfig.headers.Authorization = `${authService.token}`;
    }

    return newConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.get("/echo");
