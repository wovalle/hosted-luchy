import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  data: text("data"),
  createdAt: timestamp("created_at").defaultNow(),
});
