/**
 * Database Schema Module
 * 
 * Defines the database schema using Drizzle ORM.
 * Contains table definitions and TypeScript type exports.
 * 
 * Tables:
 * - cartItems: Stores shopping cart items with gift card details
 * 
 * @module lib/db/schema
 */

import { pgTable, serial, text, integer, timestamp, decimal } from "drizzle-orm/pg-core";

/**
 * Cart Items Table
 * 
 * Stores items added to user shopping carts.
 * Each row represents a unique gift card selection with quantity.
 * 
 * Note: In a production multi-user system, this would include
 * a user_id or session_id foreign key for cart isolation.
 */
export const cartItems = pgTable("cart_items", {
  /** Auto-incrementing primary key */
  id: serial("id").primaryKey(),
  
  /** Reference to the gift card (from giftCardData) */
  cardId: integer("card_id").notNull(),
  
  /** Display name of the gift card brand */
  cardName: text("card_name").notNull(),
  
  /** Category for display purposes */
  category: text("category").notNull(),
  
  /** Emoji or image URL for the card */
  image: text("image").notNull(),
  
  /** Selected amount in USD (stored as decimal for precision) */
  selectedAmount: decimal("selected_amount", { precision: 10, scale: 2 }).notNull(),
  
  /** Number of cards at this amount */
  quantity: integer("quantity").notNull().default(1),
  
  /** Timestamp when item was added to cart */
  createdAt: timestamp("created_at").notNull().defaultNow(),
  
  /** Timestamp when item was last modified */
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * CartItem type for SELECT queries
 * Inferred from the table schema
 */
export type CartItem = typeof cartItems.$inferSelect;

/**
 * NewCartItem type for INSERT queries
 * Excludes auto-generated fields (id, timestamps)
 */
export type NewCartItem = typeof cartItems.$inferInsert;
