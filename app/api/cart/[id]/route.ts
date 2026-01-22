/**
 * Cart Item API Route Handler
 * 
 * Handles individual cart item operations by ID:
 * - PATCH: Update item quantity
 * - DELETE: Remove specific item from cart
 * 
 * Supports both database and in-memory storage modes.
 * 
 * @module app/api/cart/[id]/route
 */

import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db";
import { cartItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  updateInMemoryCartItem,
  removeFromInMemoryCart,
} from "@/lib/cart-storage";

/**
 * PATCH /api/cart/[id]
 * 
 * Updates the quantity of a specific cart item.
 * 
 * URL params:
 * - id: Cart item ID to update
 * 
 * Request body:
 * - quantity: number - New quantity (must be >= 1)
 * 
 * @param request - NextRequest with JSON body
 * @param context - Route context with params promise
 * @returns JSON response with updated item or error
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await dynamic route params (Next.js 15+ pattern)
    const params = await context.params;
    
    // Validate params - ensure ID is a valid number
    if (!params.id || isNaN(parseInt(params.id))) {
      return NextResponse.json(
        { error: "Invalid item ID", success: false },
        { status: 400 }
      );
    }
    
    const id = parseInt(params.id);
    const body = await request.json();
    const { quantity } = body;

    // Validate quantity - must be positive integer
    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid quantity", success: false },
        { status: 400 }
      );
    }

    // Database mode
    if (isDatabaseConfigured && db) {
      // Update item and return updated record
      const updated = await db
        .update(cartItems)
        .set({ quantity, updatedAt: new Date() })
        .where(eq(cartItems.id, id))
        .returning();

      // Check if item was found and updated
      if (updated.length === 0) {
        return NextResponse.json(
          { error: "Item not found", success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({ item: updated[0], success: true });
    }

    // Fallback to in-memory storage
    const item = updateInMemoryCartItem(id, { quantity });
    
    if (!item) {
      return NextResponse.json(
        { error: "Item not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ item, success: true });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item", success: false },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cart/[id]
 * 
 * Removes a specific item from the cart.
 * 
 * URL params:
 * - id: Cart item ID to remove
 * 
 * @param request - NextRequest (unused but required)
 * @param context - Route context with params promise
 * @returns JSON response with success status or error
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await dynamic route params
    const params = await context.params;
    
    // Validate params - ensure ID is a valid number
    if (!params.id || isNaN(parseInt(params.id))) {
      return NextResponse.json(
        { error: "Invalid item ID", success: false },
        { status: 400 }
      );
    }
    
    const id = parseInt(params.id);

    // Database mode
    if (isDatabaseConfigured && db) {
      // Delete item and return deleted record
      const deleted = await db
        .delete(cartItems)
        .where(eq(cartItems.id, id))
        .returning();

      // Check if item was found and deleted
      if (deleted.length === 0) {
        return NextResponse.json(
          { error: "Item not found", success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // Fallback to in-memory storage
    const removed = removeFromInMemoryCart(id);
    
    if (!removed) {
      return NextResponse.json(
        { error: "Item not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { error: "Failed to delete cart item", success: false },
      { status: 500 }
    );
  }
}
