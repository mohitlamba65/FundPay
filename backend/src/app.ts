import express from "express";
import cors, { type CorsOptions } from "cors";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { env } from "./config/env.js";

export function createApp() {
  const app = express();

  const hasWildcard = env.CORS_ORIGIN.includes("*");

  const corsOptions: CorsOptions = {
    origin: hasWildcard
      ? true // Automatically reflects caller origin, allowing credentials
      : (origin, callback) => {
          // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
          if (!origin || env.CORS_ORIGIN.includes(origin)) {
            callback(null, true);
          } else {
            callback(null, false);
          }
        },
    methods: env.CORS_METHODS,
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
