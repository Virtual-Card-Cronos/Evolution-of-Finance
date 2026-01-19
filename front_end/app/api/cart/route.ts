/**
 * Cart API Route Handler
 * 
 * Handles cart operations including:
 * - GET: Fetch all cart items
 * - POST: Add item to cart
 * - DELETE: Clear entire cart
 * 
 * Supports both database and in-memory storage modes.
 * Falls back to in-memory when DATABASE_URL is not configured.
 * 
 * @module app/api/cart/route
 */

import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db";
import { cartItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  getInMemoryCart,
  addToInMemoryCart,
  findInMemoryCartItem,
  updateInMemoryCartItem,
  clearInMemoryCart,
} from "@/lib/cart-storage";

/**
 * GET /api/cart
 * 
 * Fetches all items currently in the shopping cart.
 * Returns array of cart items with success status.
 * 
 * @returns JSON response with cart items array
 */
export async function GET() {
  try {
    // Use database if configured
    if (isDatabaseConfigured && db) {
      const items = await db.select().from(cartItems);
      return NextResponse.json({ items, success: true });
    }

    // Fallback to in-memory storage for demo mode
    return NextResponse.json({ items: getInMemoryCart(), success: true });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart items", success: false },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cart
 * 
 * Adds a new item to the cart or updates quantity if exists.
 * If the same card with same amount exists, increments quantity.
 * Otherwise, creates a new cart item entry.
 * 
 * Request body:
 * - cardId: number - Gift card ID from catalog
 * - cardName: string - Display name of the card
 * - category: string - Card category
 * - image: string - Card image/emoji
 * - selectedAmount: number - Dollar amount for the card
 * - quantity: number - Number of cards to add
 * 
 * @param request - NextRequest with JSON body
 * @returns JSON response with created/updated item
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId, cardName, category, image, selectedAmount, quantity } = body;

    // Validate all required fields are present
    if (!cardId || !cardName || !category || !image || !selectedAmount || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    // Database mode
    if (isDatabaseConfigured && db) {
      // Check if item with same cardId already exists
      const existingItem = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.cardId, cardId))
        .limit(10);

      // Find exact match (same card AND same amount)
      const exactMatch = existingItem.find(
        (item) => parseFloat(item.selectedAmount) === selectedAmount
      );

      // Update quantity if exact match found
      if (exactMatch) {
        const updated = await db
          .update(cartItems)
          .set({
            quantity: exactMatch.quantity + quantity,
            updatedAt: new Date(),
          })
          .where(eq(cartItems.id, exactMatch.id))
          .returning();

        return NextResponse.json({ item: updated[0], success: true });
      }

      // Create new cart item if no exact match
      const newItem = await db
        .insert(cartItems)
        .values({
          cardId,
          cardName,
          category,
          image,
          selectedAmount: selectedAmount.toString(),
          quantity,
        })
        .returning();

      return NextResponse.json({ item: newItem[0], success: true }, { status: 201 });
    }

    // Fallback to in-memory storage
    const existingItem = findInMemoryCartItem(
      (item) => item.cardId === cardId && parseFloat(item.selectedAmount) === selectedAmount
    );

    // Update existing item quantity
    if (existingItem) {
      const updated = updateInMemoryCartItem(existingItem.id, {
        quantity: existingItem.quantity + quantity,
      });
      return NextResponse.json({ item: updated, success: true });
    }

    // Create new in-memory cart item
    const newItem = addToInMemoryCart({
      cardId,
      cardName,
      category,
      image,
      selectedAmount: selectedAmount.toString(),
      quantity,
    });

    return NextResponse.json({ item: newItem, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart", success: false },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cart
 * 
 * Removes all items from the cart.
 * Used for clearing cart after checkout or user request.
 * 
 * @returns JSON response with success status
 */
export async function DELETE() {
  try {
    // Database mode - delete all cart items
    if (isDatabaseConfigured && db) {
      await db.delete(cartItems);
      return NextResponse.json({ success: true });
    }

    // Fallback - clear in-memory storage
    clearInMemoryCart();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart", success: false },
      { status: 500 }
    );
  }
}
