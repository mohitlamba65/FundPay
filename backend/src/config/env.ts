import "dotenv/config";

/**
 * Parses a comma-separated string into an array of clean, trimmed strings.
 */
function parseCommaSeparated(value: string | undefined, defaultValue: string[]): string[] {
  if (!value) return defaultValue;
  const items = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : defaultValue;
}

export const env = {
  // Application
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  API_PREFIX: process.env.API_PREFIX || "/api",

  // Database
  DATABASE_URL: process.env.DATABASE_URL || "",

  // CORS Configuration (Comma-separated values supported)
  CORS_ORIGIN: parseCommaSeparated(process.env.CORS_ORIGIN, [
    "http://localhost:5173",
    "http://localhost:5174",
  ]),
  CORS_METHODS: parseCommaSeparated(process.env.CORS_METHODS, [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ]),
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS !== "false",
};

export default env;
