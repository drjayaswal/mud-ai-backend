import { pgTable, bigint, text, timestamp } from "drizzle-orm/pg-core";

const user_model = pgTable("users", {
  id: bigint({ mode: "bigint" }).primaryKey(),
  username: text().unique(),
  ucode: text(),
  hashed_password: text(),
  avatar: text(),
  api_key: text(),
  created_at: timestamp().defaultNow(),
});

export { user_model };
