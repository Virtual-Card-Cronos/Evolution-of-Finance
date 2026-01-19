/**
 * Theme Provider Component
 * 
 * Context provider for application-wide theme management.
 * Handles light/dark mode switching with localStorage persistence
 * and system preference detection.
 * 
 * Features:
 * - Light and dark theme support
 * - Persists user preference to localStorage
 * - Respects system color scheme preference
 * - Prevents flash of incorrect theme on load
 * 
 * @module components/ThemeProvider
 */

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getInitialTheme, type Theme } from "@/lib/theme";

/**
 * Theme context type definition
 * Provides current theme and toggle function
 */
interface ThemeContextType {
  /** Current active theme */
  theme: Theme;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
}

/**
 * Theme context instance
 * Initially undefined, set by ThemeProvider
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component
 * 
 * Wraps the application to provide theme context to all children.
 * Manages theme state and applies dark class to document element.
 * 
 * @param props - Component props
 * @param props.children - Child components to wrap
 * @returns JSX element wrapping children with theme context
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Current theme state - defaults to light
  const [theme, setTheme] = useState<Theme>("light");
  
  // Track if component has mounted to prevent SSR hydration issues
  const [mounted, setMounted] = useState(false);

  /**
   * Initialize theme state after component mounts
   * Reads saved preference or system preference
   */
  useEffect(() => {
    setMounted(true);
    setTheme(getInitialTheme());
  }, []);

  /**
   * Apply theme class to document when theme changes
   * Persists preference to localStorage
   */
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      
      // Add or remove dark class based on theme
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      
      // Persist preference to localStorage
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access theme context
 * 
 * Provides access to current theme and toggle function.
 * Must be used within a ThemeProvider.
 * 
 * @returns Theme context with current theme and toggle function
 * @throws Error if used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme();
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}
