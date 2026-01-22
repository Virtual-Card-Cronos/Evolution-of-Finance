/**
 * Gift Card Item Component
 * 
 * Individual gift card display component with interactive animations.
 * Provides hover effects and click animations for enhanced UX.
 * 
 * Features:
 * - Hover scale animation for interactivity
 * - Add to cart functionality with loading state
 * - Responsive card layout with gradient header
 * - Dark mode support
 * 
 * @module components/GiftCardItem
 */

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { animate } from "animejs";
import { GiftCard } from "@/lib/giftCardData";
import { useCart } from "@/components/CartProvider";
import { ANIMATION_DURATION, EASING } from "@/lib/animations";

/**
 * Props interface for GiftCardItem component
 */
interface GiftCardItemProps {
  /** The gift card data to display */
  card: GiftCard;
}

/**
 * GiftCardItem component with interactive animations
 * 
 * Renders an individual gift card with hover effects, add to cart
 * functionality, and smooth animations using anime.js.
 * 
 * @param props - Component props containing card data
 * @returns JSX element representing a single gift card
 */
export default function GiftCardItem({ card }: GiftCardItemProps) {
  // Access cart context for refreshing cart count
  const { refreshCartCount } = useCart();
  
  // Local state for add to cart loading state
  const [isAdding, setIsAdding] = useState(false);
  
  // Ref for the card element for hover animations
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Setup hover animation effects
   * Adds mouseenter/mouseleave listeners for smooth scale animation
   */
  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    /**
     * Handle mouse enter - scale up the card
     */
    const handleMouseEnter = () => {
      animate(cardElement, {
        scale: 1.02,
        duration: ANIMATION_DURATION.fast,
        ease: EASING.easeOutQuad,
      });
    };

    /**
     * Handle mouse leave - reset scale to normal
     */
    const handleMouseLeave = () => {
      animate(cardElement, {
        scale: 1,
        duration: ANIMATION_DURATION.fast,
        ease: EASING.easeOutQuad,
      });
    };

    // Attach event listeners
    cardElement.addEventListener('mouseenter', handleMouseEnter);
    cardElement.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup listeners on unmount
    return () => {
      cardElement.removeEventListener('mouseenter', handleMouseEnter);
      cardElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  /**
   * Handle add to cart action
   * Sends POST request to cart API and updates cart count
   * 
   * @param e - Click event to prevent link navigation
   */
  const handleAddToCart = async (e: React.MouseEvent) => {
    // Prevent navigation to card detail page
    e.preventDefault();
    e.stopPropagation();

    // Prevent duplicate submissions
    if (isAdding) return;
    setIsAdding(true);

    try {
      // Send add to cart request
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
        // Refresh cart count in header
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
      <div 
        ref={cardRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
      >
        {/* Card image/icon section with gradient background */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-700 dark:to-blue-700 h-48 flex items-center justify-center text-6xl">
          {card.image}
        </div>
        
        {/* Card content section */}
        <div className="p-4">
          {/* Card name */}
          <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
            {card.name}
          </h3>
          
          {/* Card category */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {card.category}
          </p>
          
          {/* Price range */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            ${card.minValue} - ${card.maxValue}
          </p>
          
          {/* Add to cart button with loading state */}
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
