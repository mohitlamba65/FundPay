import { z } from "zod";

export const getProductBySlugSchema = {
  params: z.object({
    slug: z.string().min(1, "Product slug is required"),
  }),
};

export const getVariantPlansSchema = {
  params: z.object({
    variantId: z.string().min(1, "Variant ID is required"),
  }),
};

export const calculateGrowthSchema = {
  body: z.object({
    monthlyAmount: z.number().positive("Monthly amount must be positive"),
    tenureMonths: z.number().int().positive("Tenure must be a positive integer"),
    expectedReturnRate: z.number().positive("Expected return rate must be positive"),
    interestRate: z.number().nonnegative("Interest rate cannot be negative").default(0),
    cashback: z.number().nonnegative().optional().default(0),
  }),
};

export type CalculateGrowthInput = z.infer<typeof calculateGrowthSchema.body>;
