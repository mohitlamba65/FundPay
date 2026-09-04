import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  getProductBySlugSchema,
  calculateGrowthSchema,
} from "../schemas/product.schema.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:slug", validateRequest(getProductBySlugSchema), productController.getProductBySlug);
router.post("/calculate-growth", validateRequest(calculateGrowthSchema), productController.calculateGrowth);

export default router;
