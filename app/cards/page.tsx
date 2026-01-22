/**
 * Gift Cards Browse Page
 * 
 * Page for browsing and filtering the full gift card catalog.
 * Provides search and category filtering functionality.
 * 
 * Features:
 * - Search by card name
 * - Filter by category
 * - Responsive grid layout
 * - Real-time filtering
 * 
 * @module app/cards/page
 */

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GiftCardItem from "@/components/GiftCardItem";
import { giftCardsData, categories } from "@/lib/giftCardData";

/**
 * CardsPage component
 * 
 * Renders the gift card catalog with search and filtering capabilities.
 * Users can browse all available cards, search by name, and filter by category.
 * 
 * @returns JSX element representing the cards browse page
 */
export default function CardsPage() {
  // State for category filter - defaults to "All"
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Filter cards based on selected category and search term
   * Both filters are applied simultaneously
   */
  const filteredCards = giftCardsData.filter((card) => {
    // Check if card matches selected category (or "All" shows everything)
    const matchesCategory =
      selectedCategory === "All" || card.category === selectedCategory;
    
    // Check if card name contains search term (case-insensitive)
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="flex-grow">
        {/* Page Header with gradient background */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Browse Gift Cards</h1>
            <p className="text-xl text-purple-100 dark:text-purple-200">
              Choose from our wide selection of digital gift cards
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search Input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search gift cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
              aria-label="Search gift cards"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-600 dark:bg-purple-700 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredCards.length} gift card
              {filteredCards.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Gift Cards Grid or Empty State */}
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCards.map((card) => (
                <GiftCardItem key={card.id} card={card} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
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
