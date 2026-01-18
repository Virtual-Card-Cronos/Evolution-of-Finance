"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GiftCard } from "@/lib/giftCardData";

interface CartItem extends GiftCard {
  quantity: number;
  selectedAmount: number;
}

export default function CartPage() {
  const [cartItems] = useState<CartItem[]>([]);

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
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
                  {/* Cart items would go here */}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Order Summary</h2>
                  <div className="space-y-2 mb-4 text-gray-900 dark:text-gray-100">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
                      <span>Total</span>
                      <span>$0.00</span>
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
