/**
 * React hooks for anime.js animations
 * 
 * Custom hooks that provide easy-to-use animation patterns for React components.
 * These hooks handle cleanup, refs, and lifecycle management automatically.
 * 
 * @module hooks/useAnimation
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import {
  fadeIn,
  scaleIn,
  staggerFadeIn,
  setStyles,
  ANIMATION_DURATION,
  EASING,
} from '@/lib/animations';

/* ============================================================================
 * Type Definitions
 * ============================================================================ */

/**
 * Configuration options for the fade-in animation hook
 */
interface UseFadeInOptions {
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Vertical translation distance */
  translateY?: number;
  /** Whether to run animation on mount */
  runOnMount?: boolean;
}

/**
 * Configuration options for the stagger animation hook
 */
interface UseStaggerOptions {
  /** Duration of each item's animation */
  duration?: number;
  /** Delay between each item */
  staggerDelay?: number;
  /** Whether to run animation on mount */
  runOnMount?: boolean;
}

/* ============================================================================
 * Animation Hooks
 * ============================================================================ */

/**
 * Hook for fade-in animation on a single element
 * Returns a ref to attach to the element you want to animate
 * 
 * @param options - Animation configuration options
 * @returns Object containing ref and trigger function
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, animate } = useFadeIn({ delay: 200 });
 *   return <div ref={ref}>Animated content</div>;
 * }
 * ```
 */
export function useFadeIn<T extends HTMLElement>(options?: UseFadeInOptions) {
  const ref = useRef<T>(null);
  const { runOnMount = true, ...animationOptions } = options || {};

  // Trigger animation function
  const runAnimation = useCallback(() => {
    if (ref.current) {
      fadeIn(ref.current, animationOptions);
    }
  }, [animationOptions]);

  // Run animation on mount if enabled
  useEffect(() => {
    if (runOnMount && ref.current) {
      // Set initial hidden state
      setStyles(ref.current, { opacity: '0' });
      // Run animation
      runAnimation();
    }
  }, [runOnMount, runAnimation]);

  return { ref, animate: runAnimation };
}

/**
 * Hook for scale-in animation on a single element
 * Great for buttons, cards, and interactive elements
 * 
 * @param options - Animation configuration options
 * @returns Object containing ref and trigger function
 * 
 * @example
 * ```tsx
 * function Card() {
 *   const { ref } = useScaleIn({ delay: 100 });
 *   return <div ref={ref}>Card content</div>;
 * }
 * ```
 */
export function useScaleIn<T extends HTMLElement>(
  options?: UseFadeInOptions & { scale?: [number, number] }
) {
  const ref = useRef<T>(null);
  const { runOnMount = true, ...animationOptions } = options || {};

  const runAnimation = useCallback(() => {
    if (ref.current) {
      scaleIn(ref.current, animationOptions);
    }
  }, [animationOptions]);

  useEffect(() => {
    if (runOnMount && ref.current) {
      setStyles(ref.current, { opacity: '0', transform: 'scale(0.9)' });
      runAnimation();
    }
  }, [runOnMount, runAnimation]);

  return { ref, animate: runAnimation };
}

/**
 * Hook for staggered animations on a container's children
 * Perfect for grids and lists where items animate in sequence
 * 
 * @param childSelector - CSS selector for child elements to animate
 * @param options - Animation configuration options
 * @returns Object containing container ref and trigger function
 * 
 * @example
 * ```tsx
 * function CardGrid() {
 *   const { ref } = useStaggerAnimation('.card-item', { staggerDelay: 100 });
 *   return (
 *     <div ref={ref}>
 *       <div className="card-item">Card 1</div>
 *       <div className="card-item">Card 2</div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useStaggerAnimation<T extends HTMLElement>(
  childSelector: string,
  options?: UseStaggerOptions
) {
  const ref = useRef<T>(null);
  const { runOnMount = true, ...animationOptions } = options || {};

  const runAnimation = useCallback(() => {
    if (ref.current) {
      const children = ref.current.querySelectorAll(childSelector);
      if (children.length > 0) {
        staggerFadeIn(children, animationOptions);
      }
    }
  }, [childSelector, animationOptions]);

  useEffect(() => {
    if (runOnMount && ref.current) {
      const children = ref.current.querySelectorAll(childSelector);
      children.forEach((child) => {
        (child as HTMLElement).style.opacity = '0';
      });
      runAnimation();
    }
  }, [runOnMount, childSelector, runAnimation]);

  return { ref, animate: runAnimation };
}

/**
 * Hook for hero section entrance animation
 * Coordinates h1, p, and button/link animations
 * 
 * @param runOnMount - Whether to run animation on mount (default: true)
 * @returns Object containing container ref and trigger function
 * 
 * @example
 * ```tsx
 * function HeroSection() {
 *   const { ref } = useHeroAnimation();
 *   return (
 *     <section ref={ref}>
 *       <h1>Welcome</h1>
 *       <p>Description</p>
 *       <button>CTA</button>
 *     </section>
 *   );
 * }
 * ```
 */
export function useHeroAnimation<T extends HTMLElement>(runOnMount: boolean = true) {
  const ref = useRef<T>(null);

  const runAnimation = useCallback(() => {
    if (ref.current) {
      // Set initial hidden state for all children
      const h1 = ref.current.querySelector('h1') as HTMLElement | null;
      const p = ref.current.querySelector('p') as HTMLElement | null;
      const cta = ref.current.querySelector('a, button') as HTMLElement | null;

      if (h1) setStyles(h1, { opacity: '0', transform: 'translateY(30px)' });
      if (p) setStyles(p, { opacity: '0', transform: 'translateY(20px)' });
      if (cta) setStyles(cta, { opacity: '0', transform: 'translateY(20px) scale(0.9)' });

      // Create timeline for coordinated animation
      const timeline = createTimeline({
        defaults: {
          ease: EASING.easeOutQuad,
        },
      });

      if (h1) {
        timeline.add(h1, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: ANIMATION_DURATION.slow,
        });
      }

      if (p) {
        timeline.add(p, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: ANIMATION_DURATION.normal,
        }, '-=200');
      }

      if (cta) {
        timeline.add(cta, {
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.9, 1],
          duration: ANIMATION_DURATION.normal,
        }, '-=100');
      }
    }
  }, []);

  useEffect(() => {
    if (runOnMount) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(runAnimation, 50);
      return () => clearTimeout(timer);
    }
  }, [runOnMount, runAnimation]);

  return { ref, animate: runAnimation };
}

/**
 * Hook for feature cards animation
 * Animates a container's child elements with staggered scale effect
 * 
 * @param cardSelector - CSS selector for card elements
 * @param runOnMount - Whether to run animation on mount
 * @returns Object containing container ref and trigger function
 */
export function useFeatureCardsAnimation<T extends HTMLElement>(
  cardSelector: string = '.feature-card',
  runOnMount: boolean = true
) {
  const ref = useRef<T>(null);

  const runAnimation = useCallback(() => {
    if (ref.current) {
      const cards = ref.current.querySelectorAll(cardSelector);
      if (cards.length > 0) {
        cards.forEach((card) => {
          setStyles(card as HTMLElement, { 
            opacity: '0', 
            transform: 'translateY(40px) scale(0.95)' 
          });
        });
        animate(cards, {
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.95, 1],
          duration: ANIMATION_DURATION.slow,
          delay: stagger(100),
          ease: EASING.easeOutBack,
        });
      }
    }
  }, [cardSelector]);

  useEffect(() => {
    if (runOnMount && ref.current) {
      const timer = setTimeout(runAnimation, 100);
      return () => clearTimeout(timer);
    }
  }, [runOnMount, runAnimation]);

  return { ref, animate: runAnimation };
}

/**
 * Hook for hover scale effect on an element
 * Automatically handles cleanup on unmount
 * 
 * @param scale - Scale factor on hover (default: 1.05)
 * @returns Ref to attach to the hoverable element
 * 
 * @example
 * ```tsx
 * function HoverableCard() {
 *   const hoverRef = useHoverScale(1.03);
 *   return <div ref={hoverRef}>Hover me!</div>;
 * }
 * ```
 */
export function useHoverScale<T extends HTMLElement>(scale: number = 1.05) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mouseEnter = () => {
      animate(element, {
        scale: scale,
        duration: ANIMATION_DURATION.fast,
        ease: EASING.easeOutQuad,
      });
    };

    const mouseLeave = () => {
      animate(element, {
        scale: 1,
        duration: ANIMATION_DURATION.fast,
        ease: EASING.easeOutQuad,
      });
    };

    element.addEventListener('mouseenter', mouseEnter);
    element.addEventListener('mouseleave', mouseLeave);

    // Cleanup on unmount
    return () => {
      element.removeEventListener('mouseenter', mouseEnter);
      element.removeEventListener('mouseleave', mouseLeave);
    };
  }, [scale]);

  return ref;
}

/**
 * Hook for intersection observer-based animations
 * Triggers animation when element enters viewport
 * 
 * @param animationType - Type of animation to trigger
 * @param options - Intersection observer options
 * @returns Ref to attach to the element to observe
 * 
 * @example
 * ```tsx
 * function LazySection() {
 *   const ref = useScrollAnimation('fadeIn', { threshold: 0.2 });
 *   return <section ref={ref}>Animate on scroll</section>;
 * }
 * ```
 */
export function useScrollAnimation<T extends HTMLElement>(
  animationType: 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight' = 'fadeIn',
  options?: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  }
) {
  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial hidden state
    setStyles(element, { opacity: '0' });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasAnimated.current) return;
            
            hasAnimated.current = true;

            switch (animationType) {
              case 'fadeIn':
                fadeIn(element);
                break;
              case 'scaleIn':
                scaleIn(element);
                break;
              default:
                fadeIn(element);
            }

            if (triggerOnce) {
              observer.unobserve(element);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animationType, threshold, rootMargin, triggerOnce]);

  return ref;
}
