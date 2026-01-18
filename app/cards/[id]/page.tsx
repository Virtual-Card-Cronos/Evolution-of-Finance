"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Sample gift card data (in a real app, this would come from an API or database)
const giftCards = [
  {
    id: 1,
    name: "Amazon",
    category: "Shopping",
    image: "🛒",
    minValue: 10,
    maxValue: 500,
    description: "Shop for millions of products on Amazon with this digital gift card. Perfect for any occasion!",
  },
  {
    id: 2,
    name: "Netflix",
    category: "Entertainment",
    image: "🎬",
    minValue: 15,
    maxValue: 100,
    description: "Stream unlimited movies and TV shows with a Netflix gift card. Entertainment at your fingertips!",
  },
  {
    id: 3,
    name: "Spotify",
    category: "Music",
    image: "🎵",
    minValue: 10,
    maxValue: 100,
    description: "Enjoy millions of songs and podcasts with Spotify Premium. Music for every mood!",
  },
  {
    id: 4,
    name: "Starbucks",
    category: "Food & Dining",
    image: "☕",
    minValue: 5,
    maxValue: 200,
    description: "Get your favorite coffee and treats at Starbucks. The perfect gift for coffee lovers!",
  },
  {
    id: 5,
    name: "Steam",
    category: "Gaming",
    image: "🎮",
    minValue: 10,
    maxValue: 100,
    description: "Buy games, software, and more on Steam. The ultimate gaming platform!",
  },
  {
    id: 6,
    name: "iTunes",
    category: "Entertainment",
    image: "🎧",
    minValue: 10,
    maxValue: 200,
    description: "Purchase music, movies, apps, and more from the iTunes Store.",
  },
  {
    id: 7,
    name: "Google Play",
    category: "Apps & Games",
    image: "📱",
    minValue: 10,
    maxValue: 200,
    description: "Get apps, games, movies, and more from Google Play Store.",
  },
  {
    id: 8,
    name: "Uber",
    category: "Transportation",
    image: "🚗",
    minValue: 15,
    maxValue: 200,
    description: "Ride with Uber or get food delivered with Uber Eats.",
  },
];

const amounts = [10, 25, 50, 100, 200];

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cardId = parseInt(params.id as string);
  const card = giftCards.find((c) => c.id === cardId);

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Gift Card Not Found</h1>
            <button
              onClick={() => router.push("/cards")}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="text-purple-600 hover:text-purple-700 mb-6 flex items-center"
          >
            ← Back
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Card Image */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg h-96 flex items-center justify-center text-9xl shadow-xl">
              {card.image}
            </div>

            {/* Right: Card Details */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{card.name}</h1>
              <p className="text-gray-600 mb-4">{card.category}</p>
              <p className="text-lg mb-6">{card.description}</p>

              {/* Amount Selection */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Select Amount</h3>
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
                            ? "border-purple-600 bg-purple-50 text-purple-600"
                            : "border-gray-300 hover:border-purple-300"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Total */}
              <div className="mb-6">
                <p className="text-2xl font-bold">
                  Total: ${((selectedAmount || parseFloat(customAmount) || 0) * quantity).toFixed(2)}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-purple-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Add to Cart
              </button>

              {/* Features */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center text-gray-700">
                  <span className="mr-2">✓</span>
                  <span>Instant digital delivery</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="mr-2">✓</span>
                  <span>No expiration date</span>
                </div>
                <div className="flex items-center text-gray-700">
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
