import "dotenv/config";

function parseCommaSeparated(value: string | undefined, defaultValue: string[]): string[] {
  if (!value) return defaultValue;
  const items = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : defaultValue;
}

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl && process.env.NODE_ENV === "production") {
  throw new Error("Missing required environment variable: DATABASE_URL");
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  API_PREFIX: process.env.API_PREFIX || "/api",
  DATABASE_URL: databaseUrl || "",
  CORS_ORIGIN: parseCommaSeparated(process.env.CORS_ORIGIN, [
    "http://localhost:5173",
    "http://localhost:5174",
  ]),
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS !== "false",
};

export default env;
