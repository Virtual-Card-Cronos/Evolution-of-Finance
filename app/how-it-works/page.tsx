import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">How It Works</h1>
            <p className="text-xl text-purple-100 dark:text-purple-200">
              Get your digital gift cards in 3 easy steps
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-600 dark:bg-purple-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6">
                  1
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Choose Your Gift Card</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Browse through our extensive catalog of digital gift cards from top brands. 
                    Use our search and filter options to find the perfect gift card for any occasion.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-600 dark:bg-purple-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6">
                  2
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Select Amount & Checkout</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Choose from preset denominations or enter a custom amount. Add multiple cards 
                    to your cart and proceed to secure checkout with various payment options.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-600 dark:bg-purple-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6">
                  3
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Receive Instantly</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Get your gift card code delivered to your email instantly after payment. 
                    Redeem it immediately or send it as a gift to friends and family.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-16 bg-gray-50 dark:bg-gray-900 rounded-lg p-8 transition-colors">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Why Choose Us?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">⚡</span>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">Instant Delivery</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Receive your gift card codes within seconds of completing your purchase
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🔒</span>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">Secure Payments</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Bank-level encryption protects your payment information
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💯</span>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">Authentic Cards</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      All gift cards are genuine and sourced directly from brands
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🎁</span>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">Perfect for Gifting</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Send digital gift cards instantly to anyone, anywhere
                    </p>
                  </div>
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
