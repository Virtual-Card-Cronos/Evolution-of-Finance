/**
 * Root Layout Component
 * 
 * The root layout wraps all pages and provides global functionality.
 * Includes theme initialization, context providers, and metadata.
 * 
 * Features:
 * - Theme initialization script (prevents flash of wrong theme)
 * - ThemeProvider for dark/light mode
 * - CartProvider for shopping cart state
 * - Global CSS import
 * - SEO metadata
 * 
 * @module app/layout
 */

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/components/CartProvider";
import { getInitialThemeScript } from "@/lib/theme";

/**
 * Metadata configuration for SEO
 * Applied to all pages unless overridden
 */
export const metadata: Metadata = {
  title: "Virtual Gift Cards - Buy Digital Gift Cards Online",
  description: "Purchase virtual gift cards from top brands. Fast, secure, and convenient digital gift card platform.",
};

/**
 * RootLayout component
 * 
 * Wraps all pages with necessary providers and global configurations.
 * Includes theme initialization script in head to prevent FOUC.
 * 
 * @param props - Component props
 * @param props.children - Child page components
 * @returns JSX element representing the root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 
          Theme initialization script runs before React hydration
          Prevents flash of incorrect theme on page load
        */}
        <script dangerouslySetInnerHTML={{ __html: getInitialThemeScript() }} />
      </head>
      <body className="antialiased">
        {/* ThemeProvider wraps entire app for dark/light mode */}
        <ThemeProvider>
          {/* CartProvider wraps entire app for cart state management */}
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
