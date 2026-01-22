/**
 * In-Memory Cart Storage Module
 * 
 * Provides a fallback cart storage when database is not configured.
 * Uses a simple array to store cart items in memory.
 * 
 * WARNING: This is for development/demo purposes only.
 * In production, always use a proper database with DATABASE_URL configured.
 * This storage:
 * - Is NOT persistent across server restarts
 * - Is NOT suitable for multi-user environments
 * - Shares state across all users (no session isolation)
 * 
 * @module lib/cart-storage
 */

import { CartItem } from "@/lib/db/schema";

/**
 * In-memory cart items array
 * Stores all cart items when database is not available
 */
let inMemoryCart: CartItem[] = [];

/**
 * Auto-incrementing ID counter
 * Uses timestamp as starting value for uniqueness
 */
let nextId = Date.now();

/**
 * Get all items in the cart
 * 
 * @returns Array of all cart items
 */
export function getInMemoryCart(): CartItem[] {
  return inMemoryCart;
}

/**
 * Add a new item to the cart
 * 
 * Creates a new cart item with auto-generated ID and timestamps.
 * 
 * @param item - Cart item data without auto-generated fields
 * @returns The newly created cart item with all fields
 */
export function addToInMemoryCart(item: Omit<CartItem, "id" | "createdAt" | "updatedAt">): CartItem {
  const newItem: CartItem = {
    id: nextId++,
    ...item,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  inMemoryCart.push(newItem);
  return newItem;
}

/**
 * Find a cart item by custom predicate
 * 
 * @param predicate - Function to test each item
 * @returns The first matching item, or undefined if not found
 */
export function findInMemoryCartItem(predicate: (item: CartItem) => boolean): CartItem | undefined {
  return inMemoryCart.find(predicate);
}

/**
 * Update an existing cart item
 * 
 * @param id - ID of the item to update
 * @param updates - Partial item data to merge
 * @returns The updated item, or null if not found
 */
export function updateInMemoryCartItem(id: number, updates: Partial<CartItem>): CartItem | null {
  const item = inMemoryCart.find((item) => item.id === id);
  if (!item) return null;
  
  // Merge updates and set new updatedAt timestamp
  Object.assign(item, updates, { updatedAt: new Date() });
  return item;
}

/**
 * Remove an item from the cart
 * 
 * @param id - ID of the item to remove
 * @returns true if item was removed, false if not found
 */
export function removeFromInMemoryCart(id: number): boolean {
  const index = inMemoryCart.findIndex((item) => item.id === id);
  if (index === -1) return false;
  
  inMemoryCart.splice(index, 1);
  return true;
}

/**
 * Clear all items from the cart
 * Resets the cart to empty state
 */
export function clearInMemoryCart(): void {
  inMemoryCart = [];
}
