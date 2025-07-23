import { Elysia } from "elysia";
import "dotenv/config";
import cors from "@elysiajs/cors";
import { routes as connectionRoutes } from "./routes/connection.route";
import { routes as authRoutes } from "./routes/auth.route";
import { routes as userRoutes } from "./routes/user.route";
import pino from "pino";

const BACKEND = process.env.BACKEND;
const FRONTEND = process.env.FRONTEND;
const NODE_ENV = process.env.NODE_ENV || "development";

const logger = pino({
  level: NODE_ENV === "production" ? "info" : "debug",
  transport:
    NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
});

if (!BACKEND || !FRONTEND) {
  logger.error(`[SERVER]  :  ENV missing  :  ${new Date().toLocaleString()}`);
  throw new Error("[SYSTEM]    ENV missing");
}

// Security headers plugin for Elysia
const securityHeaders = () => (app: Elysia) =>
  app.onRequest(({ set }) => {
    set.headers["X-Content-Type-Options"] = "nosniff";
    set.headers["X-Frame-Options"] = "DENY";
    set.headers["X-XSS-Protection"] = "1; mode=block";
    set.headers["Referrer-Policy"] = "no-referrer";
    set.headers["Strict-Transport-Security"] =
      "max-age=63072000; includeSubDomains; preload";
  });

// Environment-based CORS
const allowedOrigins =
  NODE_ENV === "production" ? [FRONTEND] : [BACKEND, FRONTEND];

const app = new Elysia()
  .all("/", "Welcome to Various Knots of Loads API..!")
  .use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  )
  .use(securityHeaders())
  .use(authRoutes)
  .use(userRoutes)
  .use(connectionRoutes)
  .listen(4000);

logger.info(`[SERVER]  :  Server Connected  :  ${new Date().toLocaleString()}`);

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("[SERVER]  :  SIGTERM received, shutting down gracefully...");
  app.stop();
  process.exit(0);
});
process.on("SIGINT", () => {
  logger.info("[SERVER]  :  SIGINT received, shutting down gracefully...");
  app.stop();
  process.exit(0);
});
