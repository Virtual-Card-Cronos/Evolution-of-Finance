"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-purple-600">
            VirtualCards
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link href="/cards" className="text-gray-700 hover:text-purple-600 transition-colors">
              Gift Cards
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">
              How It Works
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-purple-600 transition-colors">
              Cart (0)
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/cards"
              className="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gift Cards
            </Link>
            <Link
              href="/how-it-works"
              className="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/cart"
              className="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart (0)
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
