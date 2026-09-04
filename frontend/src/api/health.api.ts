import { apiClient } from "./client";

export interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp: string;
  database: "connected" | "disconnected";
  error?: string;
}

export const healthApi = {
  async checkHealth(): Promise<HealthCheckResponse> {
    const response = await apiClient.get<HealthCheckResponse>("/health");
    return response.data;
  },
};
