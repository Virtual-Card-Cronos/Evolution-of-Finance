/**
 * Animation utilities using anime.js library
 * 
 * This module provides reusable animation configurations and helper functions
 * for creating smooth, performant animations throughout the application.
 * 
 * @module lib/animations
 * @see https://animejs.com/documentation/
 */

import { animate, stagger, createTimeline } from 'animejs';

/* ============================================================================
 * Animation Configuration Constants
 * ============================================================================ */

/**
 * Default animation durations (in milliseconds)
 * Used across the application for consistent animation timing
 */
export const ANIMATION_DURATION = {
  /** Fast animations for micro-interactions (150ms) */
  fast: 150,
  /** Normal animations for standard transitions (300ms) */
  normal: 300,
  /** Slow animations for emphasis (500ms) */
  slow: 500,
  /** Extra slow for dramatic effects (800ms) */
  extraSlow: 800,
} as const;

/**
 * Common easing functions for different animation feels
 * @see https://animejs.com/documentation/#pennerFunctions
 */
export const EASING = {
  /** Smooth start and end - default for most animations */
  easeInOutQuad: 'inOutQuad',
  /** Quick start, slow end - good for entering elements */
  easeOutQuad: 'outQuad',
  /** Slow start, quick end - good for exiting elements */
  easeInQuad: 'inQuad',
  /** Bouncy effect at the end */
  easeOutBack: 'outBack',
  /** Elastic bounce effect */
  easeOutElastic: 'outElastic(1, .5)',
  /** Spring-like animation */
  spring: 'spring(1, 80, 10, 0)',
} as const;

/* ============================================================================
 * Fade Animations
 * ============================================================================ */

/**
 * Fade in animation with optional upward movement
 * Great for revealing content as users scroll or navigate
 * 
 * @param targets - CSS selector or DOM elements to animate
 * @param options - Optional animation configuration overrides
 * @returns anime.js animation instance
 * 
 * @example
 * // Fade in a hero section
 * fadeIn('.hero-content', { delay: 200 });
 */
export function fadeIn(
  targets: string | HTMLElement | HTMLElement[] | NodeList,
  options?: {
    duration?: number;
    delay?: number;
    easing?: string;
    translateY?: number;
  }
) {
  const {
    duration = ANIMATION_DURATION.normal,
    delay = 0,
    easing = EASING.easeOutQuad,
    translateY = 20,
  } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    translateY: [translateY, 0],
    duration,
    delay,
    ease: easing,
  });
}

/**
 * Fade out animation with optional downward movement
 * Used for hiding elements smoothly
 * 
 * @param targets - CSS selector or DOM elements to animate
 * @param options - Optional animation configuration overrides
 * @returns anime.js animation instance
 */
export function fadeOut(
  targets: string | HTMLElement | HTMLElement[] | NodeList,
  options?: {
    duration?: number;
    delay?: number;
    easing?: string;
    translateY?: number;
  }
) {
  const {
    duration = ANIMATION_DURATION.normal,
    delay = 0,
    easing = EASING.easeInQuad,
    translateY = 20,
  } = options || {};

  return animate(targets, {
    opacity: [1, 0],
    translateY: [0, translateY],
    duration,
    delay,
    ease: easing,
  });
}

/* ============================================================================
 * Scale Animations
 * ============================================================================ */

/**
 * Scale up animation - makes elements appear with a growing effect
 * Perfect for buttons, cards, and interactive elements
 * 
 * @param targets - CSS selector or DOM elements to animate
 * @param options - Optional animation configuration overrides
 * @returns anime.js animation instance
 * 
 * @example
 * // Animate gift cards appearing
 * scaleIn('.gift-card', { delay: stagger(100) });
 */
export function scaleIn(
  targets: string | HTMLElement | HTMLElement[] | NodeList,
  options?: {
    duration?: number;
    delay?: number | ReturnType<typeof stagger>;
    easing?: string;
    scale?: [number, number];
  }
) {
  const {
    duration = ANIMATION_DURATION.normal,
    delay = 0,
    easing = EASING.easeOutBack,
    scale = [0.9, 1],
  } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    scale,
    duration,
    delay,
    ease: easing,
  });
}

/**
 * Pulse animation - creates an attention-grabbing pulse effect
 * Good for highlighting important elements or CTAs
 * 
 * @param targets - CSS selector or DOM elements to animate
 * @param options - Optional animation configuration overrides
 * @returns anime.js animation instance
 */
export function pulse(
  targets: string | HTMLElement | HTMLElement[] | NodeList,
  options?: {
    duration?: number;
    scale?: number;
    loop?: boolean | number;
  }
) {
  const {
    duration = ANIMATION_DURATION.slow,
    scale = 1.05,
    loop = true,
  } = options || {};

  return animate(targets, {
    scale: [1, scale, 1],
    duration,
    loop,
    ease: EASING.easeInOutQuad,
  });
}

/* ============================================================================
 * Slide Animations
 * ============================================================================ */

/**
 * Slide in from left animation
 * Used for navigation elements and side panels
 * 
 * @param targets - CSS selector or DOM elements to animate
 * @param options - Optional animation configuration overrides
 * @returns anime.js animation instance
 */
export function slideInLeft(
  targets: string | HTMLElement | HTMLElement[] | NodeList,
  options?: {
    duration?: number;
    delay?: number;
    distance?: number;
    easing?: string;
  }
) {
  const {
    duration = ANIMATION_DURATION.normal,
    delay = 0,
    distance = 50,
    easing = EASING.easeOutQuad,
  } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    translateX: [-distance, 0],
    duration,
    delay,
    ease: easing,
  });
}

/**
 * Slide in from right animation
 * Used for notifications and sliding panels
 * 
 * @param targets - CSS selector or DOM elements to animate
 * @param options - Optional animation configuration overrides
 * @returns anime.js animation instance
 */
export function slideInRight(
  targets: string | HTMLElement | HTMLElement[] | NodeList,
  options?: {
    duration?: number;
    delay?: number;
    distance?: number;
    easing?: string;
  }
) {
  const {
    duration = ANIMATION_DURATION.normal,
    delay = 0,
    distance = 50,
    easing = EASING.easeOutQuad,
  } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    translateX: [distance, 0],
    duration,
    delay,
    ease: easing,
  });
}

/* ============================================================================
 * Stagger Animations
 * ============================================================================ */

/**
 * Staggered fade in for multiple elements
 * Creates a cascading reveal effect for lists and grids
 * 
 * @param targets - CSS selector or DOM elements to animate
 * @param options - Optional animation configuration overrides
 * @returns anime.js animation instance
 * 
 * @example
 * // Stagger gift card grid items
 * staggerFadeIn('.grid > div', { staggerDelay: 50 });
 */
export function staggerFadeIn(
  targets: string | HTMLElement | HTMLElement[] | NodeList,
  options?: {
    duration?: number;
    staggerDelay?: number;
    translateY?: number;
    easing?: string;
  }
) {
  const {
    duration = ANIMATION_DURATION.normal,
    staggerDelay = 100,
    translateY = 30,
    easing = EASING.easeOutQuad,
  } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    translateY: [translateY, 0],
    duration,
    delay: stagger(staggerDelay),
    ease: easing,
  });
}

/**
 * Staggered scale in for grid items
 * Creates a popping effect perfect for card grids
 * 
 * @param targets - CSS selector or DOM elements to animate
 * @param options - Optional animation configuration overrides
 * @returns anime.js animation instance
 */
export function staggerScaleIn(
  targets: string | HTMLElement | HTMLElement[] | NodeList,
  options?: {
    duration?: number;
    staggerDelay?: number;
    scale?: [number, number];
    easing?: string;
  }
) {
  const {
    duration = ANIMATION_DURATION.normal,
    staggerDelay = 80,
    scale = [0.8, 1],
    easing = EASING.easeOutBack,
  } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    scale,
    duration,
    delay: stagger(staggerDelay),
    ease: easing,
  });
}

/* ============================================================================
 * Interaction Animations
 * ============================================================================ */

/**
 * Hover scale effect for interactive elements
 * Call this to add hover animations to buttons and cards
 * 
 * @param target - Single DOM element to animate
 * @param scale - Scale factor on hover (default: 1.05)
 * @returns Cleanup function to remove event listeners
 */
export function addHoverScale(
  target: HTMLElement,
  scale: number = 1.05
): () => void {
  const mouseEnter = () => {
    animate(target, {
      scale: scale,
      duration: ANIMATION_DURATION.fast,
      ease: EASING.easeOutQuad,
    });
  };

  const mouseLeave = () => {
    animate(target, {
      scale: 1,
      duration: ANIMATION_DURATION.fast,
      ease: EASING.easeOutQuad,
    });
  };

  target.addEventListener('mouseenter', mouseEnter);
  target.addEventListener('mouseleave', mouseLeave);

  // Return cleanup function
  return () => {
    target.removeEventListener('mouseenter', mouseEnter);
    target.removeEventListener('mouseleave', mouseLeave);
  };
}

/**
 * Button click animation effect
 * Creates a quick scale-down-up effect on click
 * 
 * @param target - DOM element to animate
 * @returns anime.js animation instance
 */
export function clickEffect(target: HTMLElement) {
  return animate(target, {
    scale: [1, 0.95, 1],
    duration: ANIMATION_DURATION.fast * 2,
    ease: EASING.easeInOutQuad,
  });
}

/* ============================================================================
 * Page Transition Animations
 * ============================================================================ */

/**
 * Hero section entrance animation
 * Coordinates multiple elements fading in with stagger
 * 
 * @param containerSelector - CSS selector for the hero container
 * @returns anime.js timeline instance
 */
export function animateHeroSection(containerSelector: string) {
  const timeline = createTimeline({
    defaults: {
      ease: EASING.easeOutQuad,
    },
  });

  timeline
    .add(`${containerSelector} h1`, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: ANIMATION_DURATION.slow,
    })
    .add(`${containerSelector} p`, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: ANIMATION_DURATION.normal,
    }, '-=200')
    .add(`${containerSelector} a, ${containerSelector} button`, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.9, 1],
      duration: ANIMATION_DURATION.normal,
    }, '-=100');

  return timeline;
}

/**
 * Feature cards entrance animation
 * Staggered scale-in effect for feature sections
 * 
 * @param cardsSelector - CSS selector for feature cards
 * @returns anime.js animation instance
 */
export function animateFeatureCards(cardsSelector: string) {
  return animate(cardsSelector, {
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.95, 1],
    duration: ANIMATION_DURATION.slow,
    delay: stagger(100),
    ease: EASING.easeOutBack,
  });
}

/* ============================================================================
 * Utility Functions
 * ============================================================================ */

/**
 * Set initial styles on elements
 * Call this before triggering animations to prevent flash of content
 * 
 * @param element - DOM element to style
 * @param styles - CSS styles to apply
 */
export function setStyles(
  element: HTMLElement,
  styles: Record<string, string | number>
) {
  Object.entries(styles).forEach(([key, value]) => {
    const styleKey = key as keyof CSSStyleDeclaration;
    if (typeof element.style[styleKey] !== 'undefined') {
      (element.style as unknown as Record<string, string>)[key] = typeof value === 'number' ? `${value}` : value;
    }
  });
}

// Re-export anime functions for direct access if needed
export { animate, stagger, createTimeline };
