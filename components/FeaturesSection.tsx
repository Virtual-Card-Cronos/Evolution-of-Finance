/**
 * Features Section Component
 * 
 * Displays the key value propositions of the platform with animated cards.
 * Each feature card animates in with a staggered effect using anime.js.
 * 
 * Animation Features:
 * - Staggered entrance for each feature card
 * - Scale and fade-in effects
 * - Hover interactions for engagement
 * 
 * @module components/FeaturesSection
 */

"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ANIMATION_DURATION, EASING, setStyles } from "@/lib/animations";

/**
 * Feature data structure for type safety
 */
interface Feature {
  /** Emoji icon for the feature */
  icon: string;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

/**
 * Array of features to display
 * Easily extendable by adding new feature objects
 */
const features: Feature[] = [
  {
    icon: "⚡",
    title: "Instant Delivery",
    description: "Receive your gift card code immediately after purchase",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    description: "Your transactions are protected with bank-level security",
  },
  {
    icon: "🎁",
    title: "Wide Selection",
    description: "Hundreds of brands across multiple categories",
  },
];

/**
 * FeaturesSection component with animated cards
 * 
 * Renders a grid of feature cards that animate in when the component mounts.
 * Uses intersection observer pattern internally through anime.js for performance.
 * 
 * @returns JSX element representing the features section
 */
export default function FeaturesSection() {
  // Ref for the container to animate children
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize staggered card animations on mount
   */
  useEffect(() => {
    // Get all feature cards within the container
    const cards = containerRef.current?.querySelectorAll('.feature-card');
    
    if (cards && cards.length > 0) {
      // Set initial hidden state for all cards
      cards.forEach((card) => {
        setStyles(card as HTMLElement, { 
          opacity: '0', 
          transform: 'translateY(40px) scale(0.95)' 
        });
      });

      // Animate cards with staggered timing
      animate(cards, {
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.95, 1],
        duration: ANIMATION_DURATION.slow,
        delay: stagger(100, { start: 200 }), // Start after 200ms, stagger by 100ms
        ease: EASING.easeOutBack,
      });
    }
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Why Choose Us?
        </h2>
        
        {/* Feature cards grid with staggered animations */}
        <div 
          ref={containerRef}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transition-all hover:shadow-xl hover:scale-[1.02] cursor-default"
            >
              {/* Feature icon */}
              <div className="text-4xl mb-4" role="img" aria-label={feature.title}>
                {feature.icon}
              </div>
              
              {/* Feature title */}
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              
              {/* Feature description */}
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
