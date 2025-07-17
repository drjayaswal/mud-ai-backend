import { defineConfig } from "drizzle-kit";
import "dotenv/config";

// via connection params
export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    user: process.env.DB_USER || "mud",
    password: process.env.DB_PASSWORD || "mud",
    database: process.env.DB_NAME || "mud",
    ssl: true, // important for deployment
  },
  schema: ["./src/models/*"],
  out: "./drizzle",
});
