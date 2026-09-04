import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`FundPay API server running on port ${env.PORT} (${env.NODE_ENV})`);
  console.log(`Health check: http://localhost:${env.PORT}${env.API_PREFIX}/health`);
  console.log(`Products:     http://localhost:${env.PORT}${env.API_PREFIX}/products`);
  console.log(`Allowed CORS origins: ${env.CORS_ORIGIN.join(", ")}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing HTTP server gracefully...");
  server.close(() => {
    console.log("HTTP server closed.");
  });
});
