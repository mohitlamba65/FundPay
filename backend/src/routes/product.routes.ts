import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  getProductBySlugSchema,
  calculateGrowthSchema,
} from "../schemas/product.schema.js";

const router = Router();

// GET /api/products - list all products
router.get("/", productController.getAllProducts);

// GET /api/products/:slug - get product details with variants & EMI plans
router.get("/:slug", validateRequest(getProductBySlugSchema), productController.getProductBySlug);

// POST /api/products/calculate-growth - financial projection
router.post(
  "/calculate-growth",
  validateRequest(calculateGrowthSchema),
  productController.calculateGrowth
);

export default router;
