import { CartItem } from "@/lib/db/schema";

// Shared in-memory cart storage for fallback when database is not configured
// NOTE: This is intended for development/demo purposes only.
// In production, always use a proper database with DATABASE_URL configured.
// This in-memory storage is NOT suitable for multi-user production environments.
let inMemoryCart: CartItem[] = [];
let nextId = Date.now(); // Use timestamp as starting ID for uniqueness

export function getInMemoryCart(): CartItem[] {
  return inMemoryCart;
}

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

export function findInMemoryCartItem(predicate: (item: CartItem) => boolean): CartItem | undefined {
  return inMemoryCart.find(predicate);
}

export function updateInMemoryCartItem(id: number, updates: Partial<CartItem>): CartItem | null {
  const item = inMemoryCart.find((item) => item.id === id);
  if (!item) return null;
  
  Object.assign(item, updates, { updatedAt: new Date() });
  return item;
}

export function removeFromInMemoryCart(id: number): boolean {
  const index = inMemoryCart.findIndex((item) => item.id === id);
  if (index === -1) return false;
  
  inMemoryCart.splice(index, 1);
  return true;
}

export function clearInMemoryCart(): void {
  inMemoryCart = [];
}
