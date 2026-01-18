import { pgTable, serial, text, integer, timestamp, decimal } from "drizzle-orm/pg-core";

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cardId: integer("card_id").notNull(),
  cardName: text("card_name").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  selectedAmount: decimal("selected_amount", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
