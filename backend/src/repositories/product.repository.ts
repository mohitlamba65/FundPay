import { prisma } from "../config/database.js";

export class ProductRepository {
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
