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

// GET - Fetch all cart items
export async function GET() {
  try {
    if (isDatabaseConfigured && db) {
      try {
        const items = await db.select().from(cartItems);
        return NextResponse.json({ items, success: true });
      } catch (dbError) {
        console.warn("Database error, falling back to in-memory storage:", dbError);
        // Fall through to in-memory storage
      }
    }

    // Fallback to in-memory storage
    return NextResponse.json({ items: getInMemoryCart(), success: true });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart items", success: false },
      { status: 500 }
    );
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId, cardName, category, image, selectedAmount, quantity } = body;

    // Validate required fields
    if (!cardId || !cardName || !category || !image || !selectedAmount || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    if (isDatabaseConfigured && db) {
      try {
        // Database mode
        const existingItem = await db
          .select()
          .from(cartItems)
          .where(eq(cartItems.cardId, cardId))
          .limit(10);

        const exactMatch = existingItem.find(
          (item) => parseFloat(item.selectedAmount) === selectedAmount
        );

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
      } catch (dbError) {
        console.warn("Database error, falling back to in-memory storage:", dbError);
        // Fall through to in-memory storage
      }
    }

    // Fallback to in-memory storage
    const existingItem = findInMemoryCartItem(
      (item) => item.cardId === cardId && parseFloat(item.selectedAmount) === selectedAmount
    );

    if (existingItem) {
      const updated = updateInMemoryCartItem(existingItem.id, {
        quantity: existingItem.quantity + quantity,
      });
      return NextResponse.json({ item: updated, success: true });
    }

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

// DELETE - Remove all items from cart
export async function DELETE() {
  try {
    if (isDatabaseConfigured && db) {
      try {
        await db.delete(cartItems);
        return NextResponse.json({ success: true });
      } catch (dbError) {
        console.warn("Database error, falling back to in-memory storage:", dbError);
        // Fall through to in-memory storage
      }
    }

    // Fallback to in-memory storage
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
