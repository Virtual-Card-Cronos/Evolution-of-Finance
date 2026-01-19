/**
 * Hero Section Component
 * 
 * Main landing section featuring animated entrance effects using anime.js.
 * Displays the primary call-to-action and value proposition.
 * 
 * Animation Features:
 * - Staggered fade-in for heading, description, and CTA
 * - Smooth entrance from bottom
 * - Responsive design with dark mode support
 * 
 * @module components/HeroSection
 */

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";
import { ANIMATION_DURATION, EASING, setStyles } from "@/lib/animations";

/**
 * HeroSection component with animated entrance
 * 
 * Renders the main hero banner with animated text and CTA button.
 * Uses anime.js timeline for coordinated animations.
 * 
 * @returns JSX element representing the hero section
 */
export default function HeroSection() {
  // Refs for animated elements
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  /**
   * Initialize entrance animations on component mount
   * Uses anime.js timeline for coordinated staggered animations
   */
  useEffect(() => {
    // Set initial hidden states to prevent flash of content
    if (headingRef.current) {
      setStyles(headingRef.current, { opacity: '0', transform: 'translateY(30px)' });
    }
    if (descriptionRef.current) {
      setStyles(descriptionRef.current, { opacity: '0', transform: 'translateY(20px)' });
    }
    if (ctaRef.current) {
      setStyles(ctaRef.current, { opacity: '0', transform: 'translateY(20px) scale(0.95)' });
    }

    // Create animation timeline for coordinated entrance
    const timeline = createTimeline({
      defaults: {
        ease: EASING.easeOutQuad,
      },
    });

    // Animate heading first
    if (headingRef.current) {
      timeline.add(headingRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: ANIMATION_DURATION.slow,
      });
    }

    // Animate description with slight overlap
    if (descriptionRef.current) {
      timeline.add(descriptionRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: ANIMATION_DURATION.normal,
      }, '-=200');
    }

    // Animate CTA button last with scale effect
    if (ctaRef.current) {
      timeline.add(ctaRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.95, 1],
        duration: ANIMATION_DURATION.normal,
        ease: EASING.easeOutBack,
      }, '-=150');
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main heading with animation */}
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Buy Virtual Gift Cards Instantly
          </h1>
          
          {/* Subheading/description with animation */}
          <p 
            ref={descriptionRef}
            className="text-xl md:text-2xl mb-8 text-purple-100 dark:text-purple-200"
          >
            Choose from hundreds of brands. Delivered digitally in seconds.
          </p>
          
          {/* Call-to-action button with animation */}
          <Link 
            ref={ctaRef}
            href="/cards"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors hover:scale-105 transform"
          >
            Browse Gift Cards
          </Link>
        </div>
      </div>
    </section>
  );
}
