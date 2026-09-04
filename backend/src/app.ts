import express from "express";
import cors, { type CorsOptions } from "cors";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { env } from "./config/env.js";

export function createApp() {
  const app = express();

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const isAllowed = env.CORS_ORIGIN.some(
        (allowed) => allowed.trim().replace(/\/+$/, "") === origin.trim().replace(/\/+$/, "")
      );

      const isVercel = origin.endsWith(".vercel.app");

      if (isAllowed || isVercel) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: env.CORS_CREDENTIALS,
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  app.use(env.API_PREFIX, apiRouter);

  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      message: "API endpoint not found",
    });
  });

  app.use(errorHandler);

  return app;
}
