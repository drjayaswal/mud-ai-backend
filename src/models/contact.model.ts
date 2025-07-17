import { bigint, pgTable, text } from "drizzle-orm/pg-core";

export const contact_model = pgTable("contact", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});
