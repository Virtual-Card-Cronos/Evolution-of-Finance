"use client";

import { useState } from "react";
import Link from "next/link";
import { GiftCard } from "@/lib/giftCardData";
import { useCart } from "@/components/CartProvider";

interface GiftCardItemProps {
  card: GiftCard;
}

export default function GiftCardItem({ card }: GiftCardItemProps) {
  const { refreshCartCount } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;
    setIsAdding(true);

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardId: card.id,
          cardName: card.name,
          category: card.category,
          image: card.image,
          selectedAmount: card.minValue,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await refreshCartCount();
        alert(`Added $${card.minValue} ${card.name} gift card to cart!`);
      } else {
        alert("Failed to add item to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link href={`/cards/${card.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-700 dark:to-blue-700 h-48 flex items-center justify-center text-6xl">
          {card.image}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{card.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{card.category}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            ${card.minValue} - ${card.maxValue}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-purple-600 dark:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
