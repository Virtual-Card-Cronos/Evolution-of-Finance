import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cartItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// PATCH - Update cart item quantity
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    
    // Validate params
    if (!params.id || isNaN(parseInt(params.id))) {
      return NextResponse.json(
        { error: "Invalid item ID", success: false },
        { status: 400 }
      );
    }
    
    const id = parseInt(params.id);
    const body = await request.json();
    const { quantity } = body;

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid quantity", success: false },
        { status: 400 }
      );
    }

    const updated = await db
      .update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(eq(cartItems.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Item not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ item: updated[0], success: true });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item", success: false },
      { status: 500 }
    );
  }
}

// DELETE - Remove specific item from cart
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    
    // Validate params
    if (!params.id || isNaN(parseInt(params.id))) {
      return NextResponse.json(
        { error: "Invalid item ID", success: false },
        { status: 400 }
      );
    }
    
    const id = parseInt(params.id);

    const deleted = await db
      .delete(cartItems)
      .where(eq(cartItems.id, id))
      .returning();

    if (deleted.length === 0) {
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
