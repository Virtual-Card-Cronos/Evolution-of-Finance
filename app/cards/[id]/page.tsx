"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { giftCardsData } from "@/lib/giftCardData";

const amounts = [10, 25, 50, 100, 200];

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cardId = parseInt(params.id as string);
  const card = giftCardsData.find((c) => c.id === cardId);

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Gift Card Not Found</h1>
            <button
              onClick={() => router.push("/cards")}
              className="bg-purple-600 dark:bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800"
            >
              Browse Gift Cards
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount < card.minValue || amount > card.maxValue) {
      alert(
        `Please select or enter an amount between $${card.minValue} and $${card.maxValue}`
      );
      return;
    }
    alert(`Added ${quantity} x $${amount} ${card.name} gift card(s) to cart!`);
    // In a real app, this would add to cart state/context
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6 flex items-center transition-colors"
          >
            ← Back
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Card Image */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-700 dark:to-blue-700 rounded-lg h-96 flex items-center justify-center text-9xl shadow-xl">
              {card.image}
            </div>

            {/* Right: Card Details */}
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">{card.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{card.category}</p>
              <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">{card.description}</p>

              {/* Amount Selection */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Select Amount</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {amounts
                    .filter((amt) => amt >= card.minValue && amt <= card.maxValue)
                    .map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                          selectedAmount === amount
                            ? "border-purple-600 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                            : "border-gray-300 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Or enter custom amount (${card.minValue} - ${card.maxValue})
                  </label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    min={card.minValue}
                    max={card.maxValue}
                    placeholder={`$${card.minValue}`}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-32 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>

              {/* Total */}
              <div className="mb-6">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Total: ${((selectedAmount || parseFloat(customAmount) || 0) * quantity).toFixed(2)}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-purple-600 dark:bg-purple-700 text-white py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
              >
                Add to Cart
              </button>

              {/* Features */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  <span>Instant digital delivery</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  <span>No expiration date</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
