import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export function createApp() {
  const app = express();

  // Middleware
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:3000", "*"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );
  app.use(express.json());

  // Mount API
  app.use("/api", apiRouter);

  // 404 Fallback
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      message: "API endpoint not found",
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
