/**
 * Footer Component
 * 
 * Global footer section displayed at the bottom of all pages.
 * Contains company information, quick links, support links, and newsletter signup.
 * 
 * Features:
 * - Responsive 4-column grid layout
 * - Quick navigation links
 * - Support and legal links
 * - Newsletter email subscription form
 * - Dark mode support
 * 
 * @module components/Footer
 */

import Link from "next/link";

/**
 * Footer component
 * 
 * Renders the site-wide footer with navigation links,
 * company info, and newsletter subscription.
 * 
 * @returns JSX element representing the footer
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-auto transition-colors">
      <div className="container mx-auto px-4 py-12">
        {/* Footer grid - 4 columns on desktop, stacked on mobile */}
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Company Info Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">VirtualCards</h3>
            <p className="text-gray-400 dark:text-gray-500">
              Your trusted platform for instant digital gift cards from top brands worldwide.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cards" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  Browse Cards
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              Subscribe to get special offers and updates.
            </p>
            {/* Email subscription input */}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-gray-800 dark:bg-gray-900 text-white border border-gray-700 dark:border-gray-800 focus:outline-none focus:border-purple-500 dark:focus:border-purple-600"
              aria-label="Email for newsletter"
            />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; 2026 VirtualCards. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
