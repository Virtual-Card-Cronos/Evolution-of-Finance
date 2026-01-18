import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cartItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch all cart items
export async function GET() {
  try {
    const items = await db.select().from(cartItems);
    return NextResponse.json({ items, success: true });
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

    // Check if item with same card and amount already exists in cart
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cardId, cardId))
      .limit(10); // Get all items with this cardId

    // Find exact match (same card and same amount)
    const exactMatch = existingItem.find(
      (item) => parseFloat(item.selectedAmount) === selectedAmount
    );

    if (exactMatch) {
      // Update existing item quantity
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

    // Insert new item
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
    await db.delete(cartItems);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart", success: false },
      { status: 500 }
    );
  }
}
