import { prisma } from "../config/database.js";

export class ProductRepository {
  /**
   * Find all active products with their active variants
   */
  async findAll() {
    return prisma.product.findMany({
      where: { isActive: true },
      include: {
        variants: {
          where: { isActive: true },
          orderBy: { price: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Find a single product by slug with all active variants and their EMI plans + mutual funds
   */
  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug, isActive: true },
      include: {
        variants: {
          where: { isActive: true },
          include: {
            emiPlans: {
              where: { isActive: true },
              include: {
                mutualFund: true,
              },
              orderBy: { tenureMonths: "asc" },
            },
          },
          orderBy: { price: "asc" },
        },
      },
    });
  }

  /**
   * Find a single variant by ID with its EMI plans and mutual fund links
   */
  async findVariantById(variantId: string) {
    return prisma.variant.findUnique({
      where: { id: variantId, isActive: true },
      include: {
        product: true,
        emiPlans: {
          where: { isActive: true },
          include: {
            mutualFund: true,
          },
          orderBy: { tenureMonths: "asc" },
        },
      },
    });
  }
}

export const productRepository = new ProductRepository();
