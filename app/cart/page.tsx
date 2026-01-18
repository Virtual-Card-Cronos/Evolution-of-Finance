"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartProvider";

interface CartItem {
  id: number;
  cardId: number;
  cardName: string;
  category: string;
  image: string;
  selectedAmount: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { refreshCartCount } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart");
      const data = await response.json();
      if (data.success) {
        setCartItems(data.items);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        await fetchCartItems();
        await refreshCartCount();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCartItems();
        await refreshCartCount();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.selectedAmount) * item.quantity;
    }, 0);
  };

  const calculateProcessingFee = () => {
    return calculateSubtotal() * 0.02; // 2% processing fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateProcessingFee();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-2xl text-gray-900 dark:text-gray-100">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Add some gift cards to get started!
              </p>
              <a
                href="/cards"
                className="inline-block bg-purple-600 dark:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
              >
                Browse Gift Cards
              </a>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Card Image */}
                      <div className="text-6xl bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-700 dark:to-blue-700 rounded-lg w-24 h-24 flex items-center justify-center flex-shrink-0">
                        {item.image}
                      </div>

                      {/* Card Details */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {item.cardName}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {item.category}
                        </p>
                        <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                          ${parseFloat(item.selectedAmount).toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-gray-900 dark:text-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="text-right min-w-[100px]">
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          ${(parseFloat(item.selectedAmount) * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        title="Remove item"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Order Summary</h2>
                  <div className="space-y-2 mb-4 text-gray-900 dark:text-gray-100">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span>${calculateProcessingFee().toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full bg-purple-600 dark:bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
