import { bigint, pgTable, text } from "drizzle-orm/pg-core";

export const connect_model = pgTable("connect", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});
