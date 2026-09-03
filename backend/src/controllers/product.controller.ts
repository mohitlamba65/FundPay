import type { Request, Response, NextFunction } from "express";
import { productService, ProductService } from "../services/product.service.js";

export class ProductController {
  constructor(private service: ProductService = productService) {}

  /**
   * GET /api/products
   */
  getAllProducts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products = await this.service.getAllProducts();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/products/:slug
   */
  getProductBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { slug } = req.params as { slug: string };
      const product = await this.service.getProductBySlug(slug);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/plans/calculate-growth
   */
  calculateGrowth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = this.service.calculateFinancialGrowth(req.body);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const productController = new ProductController();
