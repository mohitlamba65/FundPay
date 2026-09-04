import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`FundPay API server running on port ${env.PORT} (${env.NODE_ENV})`);
  console.log(`Health check: http://localhost:${env.PORT}${env.API_PREFIX}/health`);
  console.log(`Products:     http://localhost:${env.PORT}${env.API_PREFIX}/products`);
  console.log(`Allowed CORS origins: ${env.CORS_ORIGIN.join(", ")}`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} signal received: closing HTTP server.`);
  server.close(async () => {
    console.log("HTTP server closed.");
    try {
      await prisma.$disconnect();
      console.log("Database connection pool disconnected.");
      process.exit(0);
    } catch (err) {
      console.error("Error disconnecting database pool:", err);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error("Forced shutdown due to timeout.");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
