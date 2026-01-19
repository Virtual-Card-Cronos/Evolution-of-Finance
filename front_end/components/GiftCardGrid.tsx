/**
 * Gift Card Grid Component
 * 
 * Displays a responsive grid of gift cards with staggered entrance animations.
 * Uses anime.js for smooth, performant animations that enhance the user experience.
 * 
 * Features:
 * - Responsive grid layout (1 col mobile, 2 col tablet, 4 col desktop)
 * - Staggered fade-in animation for cards
 * - Reusable GiftCardItem components
 * 
 * @module components/GiftCardGrid
 */

"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import GiftCardItem from "./GiftCardItem";
import { giftCardsData } from "@/lib/giftCardData";
import { ANIMATION_DURATION, EASING, setStyles } from "@/lib/animations";

/**
 * GiftCardGrid component with animated card entrance
 * 
 * Renders a grid of GiftCardItem components with staggered animations.
 * Cards animate in sequence from left to right, top to bottom.
 * 
 * @returns JSX element representing the gift card grid
 */
export default function GiftCardGrid() {
  // Reference to the grid container for animation targeting
  const gridRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize card entrance animations on component mount
   * Uses anime.js stagger for sequential reveal effect
   */
  useEffect(() => {
    // Get all card items within the grid
    const cards = gridRef.current?.querySelectorAll('.gift-card-item');
    
    if (cards && cards.length > 0) {
      // Set initial hidden state to prevent flash of content
      cards.forEach((card) => {
        setStyles(card as HTMLElement, { 
          opacity: '0', 
          transform: 'translateY(30px) scale(0.95)' 
        });
      });

      // Animate cards with staggered timing
      animate(cards, {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.95, 1],
        duration: ANIMATION_DURATION.normal,
        delay: stagger(60, { start: 100 }), // Start after 100ms, stagger by 60ms
        ease: EASING.easeOutQuad,
      });
    }
  }, []);

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {/* Map through gift cards data and render individual card items */}
      {giftCardsData.map((card) => (
        <div key={card.id} className="gift-card-item">
          <GiftCardItem card={card} />
        </div>
      ))}
    </div>
  );
}
