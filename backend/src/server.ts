import "dotenv/config";
import { createApp } from "./app.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`FundPay API server running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Products:     http://localhost:${PORT}/api/products`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing HTTP server...");
  server.close(() => {
    console.log("HTTP server closed.");
  });
});
