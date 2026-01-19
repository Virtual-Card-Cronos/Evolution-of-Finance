/**
 * Home Page Component
 * 
 * This is the main landing page for the VirtualCards gift card platform.
 * It showcases the hero section, key features, and popular gift cards.
 * 
 * Features:
 * - Animated hero section with call-to-action
 * - Feature highlights with icons
 * - Popular gift cards grid
 * - Responsive design with dark mode support
 * 
 * @module app/page
 */

import Link from "next/link";
import GiftCardGrid from "@/components/GiftCardGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

/**
 * Home page server component
 * Renders the main landing page with hero, features, and gift card sections
 * 
 * @returns JSX element representing the home page
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      {/* Global navigation header */}
      <Header />
      
      {/* Hero Section - Main banner with animated entrance */}
      <HeroSection />

      {/* Features Section - Key value propositions with animated cards */}
      <FeaturesSection />

      {/* Popular Gift Cards Section - Showcases top gift card options */}
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          {/* Section heading */}
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Popular Gift Cards
          </h2>
          
          {/* Gift card grid with staggered animations */}
          <GiftCardGrid />
          
          {/* View all CTA button */}
          <div className="text-center mt-8">
            <Link 
              href="/cards"
              className="inline-block bg-purple-600 dark:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
            >
              View All Gift Cards
            </Link>
          </div>
        </div>
      </section>

      {/* Global footer with links and newsletter */}
      <Footer />
    </div>
  );
}
