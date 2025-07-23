import { text, timestamp, pgTable, bigint } from "drizzle-orm/pg-core";
import { user_model } from "./user.model";

export const connection_model = pgTable("connections", {
  id: bigint({ mode: "bigint" }).primaryKey(),
  username: text().references(() => user_model.username),
  prompt: text().notNull(),
  response: text().notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
});
