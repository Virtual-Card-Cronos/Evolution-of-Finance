/**
 * Cart Provider Component
 * 
 * Context provider for shopping cart state management.
 * Provides cart item count and refresh functionality across the application.
 * 
 * Features:
 * - Real-time cart item count
 * - Automatic count refresh from API
 * - Available throughout the application
 * 
 * @module components/CartProvider
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Cart item structure from API response
 */
interface CartItem {
  /** Unique identifier for the cart item */
  id: number;
  /** Quantity of this item in cart */
  quantity: number;
}

/**
 * Cart context type definition
 */
interface CartContextType {
  /** Total number of items in cart */
  cartCount: number;
  /** Function to refresh cart count from API */
  refreshCartCount: () => Promise<void>;
}

/**
 * Cart context with default values
 * Used when no provider is present (shouldn't happen in normal use)
 */
const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCartCount: async () => {},
});

/**
 * CartProvider component
 * 
 * Wraps the application to provide cart state to all children.
 * Fetches initial cart count on mount and provides refresh function.
 * 
 * @param props - Component props
 * @param props.children - Child components to wrap
 * @returns JSX element wrapping children with cart context
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Total items count in cart
  const [cartCount, setCartCount] = useState(0);

  /**
   * Fetch cart items from API and calculate total count
   * Called on mount and when cart is modified
   */
  const refreshCartCount = async () => {
    try {
      // Fetch current cart items from API
      const response = await fetch("/api/cart");
      const data = await response.json();
      
      if (data.success) {
        // Sum up quantities from all cart items
        const totalItems = data.items.reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        );
        setCartCount(totalItems);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  /**
   * Fetch initial cart count when component mounts
   */
  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to access cart context
 * 
 * Provides access to cart count and refresh function.
 * Must be used within a CartProvider.
 * 
 * @returns Cart context with count and refresh function
 * 
 * @example
 * ```tsx
 * function CartButton() {
 *   const { cartCount, refreshCartCount } = useCart();
 *   return (
 *     <button>Cart ({cartCount})</button>
 *   );
 * }
 * ```
 */
export function useCart() {
  return useContext(CartContext);
}
