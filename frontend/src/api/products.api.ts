import { apiClient } from "./client";
import type { ApiResponse, Product, GrowthCalculationResult } from "@/types";

export interface CalculateGrowthParams {
  monthlyAmount: number;
  tenureMonths: number;
  expectedReturnRate: number;
  interestRate?: number;
  cashback?: number;
}

export const productsApi = {
  async getProducts(): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>("/products");
    return response.data.data;
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${slug}`);
    return response.data.data;
  },

  async calculateGrowth(params: CalculateGrowthParams): Promise<GrowthCalculationResult> {
    const payload = {
      monthlyAmount: params.monthlyAmount,
      tenureMonths: params.tenureMonths,
      expectedReturnRate: params.expectedReturnRate,
      interestRate: params.interestRate ?? 0,
      cashback: params.cashback ?? 0,
    };
    const response = await apiClient.post<ApiResponse<GrowthCalculationResult>>(
      "/products/calculate-growth",
      payload
    );
    return response.data.data;
  },
};
