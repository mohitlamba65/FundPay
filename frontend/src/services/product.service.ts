import { productsApi, type CalculateGrowthParams } from "@/api";
import type { Product, GrowthCalculationResult } from "@/types";

/**
 * Service layer facade that delegates directly to the centralized Axios API client.
 */
export const productService = {
  getProducts(): Promise<Product[]> {
    return productsApi.getProducts();
  },

  getProductBySlug(slug: string): Promise<Product> {
    return productsApi.getProductBySlug(slug);
  },

  calculateGrowth(params: CalculateGrowthParams): Promise<GrowthCalculationResult> {
    return productsApi.calculateGrowth(params);
  },
};
