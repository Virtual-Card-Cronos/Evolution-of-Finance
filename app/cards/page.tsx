"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GiftCardItem from "@/components/GiftCardItem";

// Extended gift card data
const allGiftCards = [
  {
    id: 1,
    name: "Amazon",
    category: "Shopping",
    image: "🛒",
    minValue: 10,
    maxValue: 500,
    featured: true,
  },
  {
    id: 2,
    name: "Netflix",
    category: "Entertainment",
    image: "🎬",
    minValue: 15,
    maxValue: 100,
    featured: true,
  },
  {
    id: 3,
    name: "Spotify",
    category: "Music",
    image: "🎵",
    minValue: 10,
    maxValue: 100,
    featured: true,
  },
  {
    id: 4,
    name: "Starbucks",
    category: "Food & Dining",
    image: "☕",
    minValue: 5,
    maxValue: 200,
    featured: true,
  },
  {
    id: 5,
    name: "Steam",
    category: "Gaming",
    image: "🎮",
    minValue: 10,
    maxValue: 100,
    featured: true,
  },
  {
    id: 6,
    name: "iTunes",
    category: "Entertainment",
    image: "🎧",
    minValue: 10,
    maxValue: 200,
    featured: true,
  },
  {
    id: 7,
    name: "Google Play",
    category: "Apps & Games",
    image: "📱",
    minValue: 10,
    maxValue: 200,
    featured: true,
  },
  {
    id: 8,
    name: "Uber",
    category: "Transportation",
    image: "🚗",
    minValue: 15,
    maxValue: 200,
    featured: true,
  },
  {
    id: 9,
    name: "Target",
    category: "Shopping",
    image: "🎯",
    minValue: 10,
    maxValue: 500,
    featured: false,
  },
  {
    id: 10,
    name: "Walmart",
    category: "Shopping",
    image: "🏪",
    minValue: 10,
    maxValue: 500,
    featured: false,
  },
  {
    id: 11,
    name: "PlayStation",
    category: "Gaming",
    image: "🕹️",
    minValue: 10,
    maxValue: 100,
    featured: false,
  },
  {
    id: 12,
    name: "Xbox",
    category: "Gaming",
    image: "🎯",
    minValue: 10,
    maxValue: 100,
    featured: false,
  },
];

const categories = [
  "All",
  "Shopping",
  "Entertainment",
  "Gaming",
  "Food & Dining",
  "Music",
  "Apps & Games",
  "Transportation",
];

export default function CardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCards = allGiftCards.filter((card) => {
    const matchesCategory =
      selectedCategory === "All" || card.category === selectedCategory;
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Browse Gift Cards</h1>
            <p className="text-xl text-purple-100">
              Choose from our wide selection of digital gift cards
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search gift cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gift Cards Grid */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredCards.length} gift card
              {filteredCards.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCards.map((card) => (
                <GiftCardItem key={card.id} card={card} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No gift cards found. Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
