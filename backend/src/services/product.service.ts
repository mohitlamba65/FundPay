import { productRepository, ProductRepository } from "../repositories/product.repository.js";
import { AppError } from "../middlewares/errorHandler.js";
import type { CalculateGrowthInput } from "../schemas/product.schema.js";

export class ProductService {
  constructor(private repo: ProductRepository = productRepository) {}

  async getAllProducts() {
    const products = await this.repo.findAll();

    return products.map((product) => {
      const prices = product.variants.map((v) => Number(v.price));
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

      const availableStorage = [...new Set(product.variants.map((v) => v.storage))];
      const availableColors = [...new Set(product.variants.map((v) => v.color))];

      return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        description: product.description,
        minPrice,
        maxPrice,
        variantCount: product.variants.length,
        availableStorage,
        availableColors,
        thumbnailUrl: product.variants[0]?.imageUrl || "",
        variants: product.variants,
      };
    });
  }

  async getProductBySlug(slug: string) {
    const product = await this.repo.findBySlug(slug);

    if (!product) {
      throw new AppError(404, `Product with slug '${slug}' not found.`);
    }

    const enrichedVariants = product.variants.map((variant) => {
      const enrichedPlans = variant.emiPlans.map((plan) => {
        const monthlyAmount = Number(plan.monthlyAmount);
        const tenureMonths = plan.tenureMonths;
        const interestRate = Number(plan.interestRate);
        const expectedReturnRate = Number(plan.mutualFund.expectedReturnRate);
        const cashback = Number(plan.cashback || 0);

        const totalEmiPaid = monthlyAmount * tenureMonths;
        const totalInterestPaid = totalEmiPaid - Number(variant.price);

        const monthlyReturnRate = expectedReturnRate / (12 * 100);
        const projectedMfValue = Math.round(
          monthlyAmount *
            ((Math.pow(1 + monthlyReturnRate, tenureMonths) - 1) / monthlyReturnRate) *
            (1 + monthlyReturnRate)
        );
        const estimatedMfGain = Math.max(0, projectedMfValue - totalEmiPaid);
        const netEffectiveCost = Math.max(0, totalEmiPaid - cashback - estimatedMfGain);

        return {
          id: plan.id,
          tenureMonths: plan.tenureMonths,
          interestRate,
          monthlyAmount,
          cashback,
          totalEmiPaid,
          totalInterestPaid: Math.max(0, totalInterestPaid),
          mutualFund: {
            id: plan.mutualFund.id,
            name: plan.mutualFund.name,
            fundHouse: plan.mutualFund.fundHouse,
            schemeName: plan.mutualFund.schemeName,
            schemeCode: plan.mutualFund.schemeCode,
            expectedReturnRate,
            projectedMfValue,
            estimatedMfGain,
          },
          netEffectiveCost,
        };
      });

      return {
        id: variant.id,
        storage: variant.storage,
        color: variant.color,
        mrp: Number(variant.mrp),
        price: Number(variant.price),
        imageUrl: variant.imageUrl,
        discountPercentage: Math.round(
          ((Number(variant.mrp) - Number(variant.price)) / Number(variant.mrp)) * 100
        ),
        emiPlans: enrichedPlans,
      };
    });

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      description: product.description,
      variants: enrichedVariants,
    };
  }

  calculateFinancialGrowth(input: CalculateGrowthInput) {
    const { monthlyAmount, tenureMonths, expectedReturnRate, interestRate, cashback } = input;

    const totalInvested = monthlyAmount * tenureMonths;
    const monthlyRate = expectedReturnRate / (12 * 100);
    const projectedWealth = Math.round(
      monthlyAmount *
        ((Math.pow(1 + monthlyRate, tenureMonths) - 1) / monthlyRate) *
        (1 + monthlyRate)
    );
    const estimatedReturns = Math.max(0, projectedWealth - totalInvested);

    return {
      monthlyAmount,
      tenureMonths,
      totalInvested,
      expectedReturnRate,
      interestRate,
      cashback,
      projectedWealth,
      estimatedReturns,
      netEffectiveCost: Math.max(0, totalInvested - cashback - estimatedReturns),
    };
  }
}

export const productService = new ProductService();
