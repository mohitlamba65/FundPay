import { Router } from "express";
import productRoutes from "./product.routes.js";
import { prisma } from "../config/database.js";

const apiRouter = Router();

// Health check endpoint
apiRouter.get("/health", async (_req, res) => {
  try {
    // Quick DB ping
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Mount product routes
apiRouter.use("/products", productRoutes);

export default apiRouter;
