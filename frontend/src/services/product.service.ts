import type { ApiResponse, Product, GrowthCalculationResult } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `Request failed with status ${response.status}`
      );
    }

    const json: ApiResponse<T> = await response.json();
    return json.data;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new Error(
      err instanceof Error ? err.message : "Unable to connect to the backend server. Please ensure it is running."
    );
  }
}

export const productService = {
  /**
   * Fetch all active products
   */
  async getProducts(): Promise<Product[]> {
    return request<Product[]>("/products");
  },

  /**
   * Fetch single product by slug with variants and EMI plans
   */
  async getProductBySlug(slug: string): Promise<Product> {
    return request<Product>(`/products/${slug}`);
  },

  /**
   * Calculate investment growth & effective EMI savings
   */
  async calculateGrowth(params: {
    monthlyAmount: number;
    tenureMonths: number;
    expectedReturnRate: number;
    interestRate?: number;
    cashback?: number;
  }): Promise<GrowthCalculationResult> {
    return request<GrowthCalculationResult>("/products/calculate-growth", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },
};
