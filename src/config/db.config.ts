import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
import postgres from "postgres";
import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
});

function DbConnect() {
  try {
    if (
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_NAME ||
      !process.env.DB_USER ||
      !process.env.DB_PASSWORD
    ) {
      logger.error(
        `[DB]  :  ENV missing for DB connection  :  ${new Date().toLocaleString()}`
      );
      throw new Error("[DB]  :  ENV missing for DB connection");
    }

    const client = postgres({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      password: process.env.DB_PASSWORD,
      ssl: "require", // important for deployment
      debug: function (_, query) {
        logger.info(
          `[DB]  :  QUERY EXECUTED  :  ${new Date().toLocaleString()}`
        );
      },
    });

    const db = drizzle({ client: client });

    logger.info(`[DB]   :  Connected  :   ${new Date().toLocaleString()}`);

    return db;
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

const db = DbConnect();
export default db;
