import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export class ApiClientError extends Error {
  statusCode: number;
  data?: unknown;

  constructor(message: string, statusCode = 500, data?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<{ success?: boolean; message?: string; errors?: unknown }>) => {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        `Server responded with error status ${error.response.status}`;
      return Promise.reject(
        new ApiClientError(errorMessage, error.response.status, error.response.data)
      );
    } else if (error.request) {
      return Promise.reject(
        new ApiClientError(
          "No response from backend server. Please verify the FundPay server is running at " +
            API_BASE_URL,
          0
        )
      );
    } else {
      return Promise.reject(new ApiClientError(error.message || "An unexpected request error occurred."));
    }
  }
);

export default apiClient;
