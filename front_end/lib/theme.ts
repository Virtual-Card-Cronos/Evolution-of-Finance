/**
 * Theme Utilities Module
 * 
 * Provides theme detection and initialization utilities.
 * Handles localStorage persistence and system preference detection.
 * 
 * @module lib/theme
 */

/**
 * Theme type definition
 * Represents the available theme options
 */
export type Theme = "light" | "dark";

/**
 * Get the initial theme preference
 * 
 * Determines the theme to use on page load based on:
 * 1. Previously saved preference in localStorage
 * 2. System color scheme preference
 * 3. Default fallback to "light"
 * 
 * @returns The theme to apply on initial load
 * 
 * @example
 * ```ts
 * const theme = getInitialTheme();
 * // Returns "dark" if user previously selected dark mode
 * // or if system prefers dark color scheme
 * ```
 */
export function getInitialTheme(): Theme {
  // Return default for SSR (no window object)
  if (typeof window === "undefined") {
    return "light";
  }
  
  // Check for saved user preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  
  // Check system preference using media query
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  
  // Default to light theme
  return "light";
}

/**
 * Generate initial theme script for SSR
 * 
 * Returns a script string that runs before React hydration
 * to prevent flash of incorrect theme (FOUC).
 * 
 * This script:
 * 1. Checks localStorage for saved preference
 * 2. Falls back to system preference
 * 3. Adds 'dark' class to document if needed
 * 
 * @returns JavaScript code string for inline script tag
 * 
 * @example
 * ```tsx
 * // In layout.tsx
 * <head>
 *   <script dangerouslySetInnerHTML={{ __html: getInitialThemeScript() }} />
 * </head>
 * ```
 */
export function getInitialThemeScript(): string {
  return `
    try {
      const savedTheme = localStorage.getItem('theme');
      const theme = (savedTheme === 'light' || savedTheme === 'dark') 
        ? savedTheme 
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  `;
}
