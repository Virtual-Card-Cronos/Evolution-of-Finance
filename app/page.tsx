import Link from "next/link";
import GiftCardGrid from "@/components/GiftCardGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Buy Virtual Gift Cards Instantly
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Choose from hundreds of brands. Delivered digitally in seconds.
            </p>
            <Link 
              href="/cards"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Gift Cards
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
              <p className="text-gray-600">
                Receive your gift card code immediately after purchase
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Your transactions are protected with bank-level security
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Hundreds of brands across multiple categories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Gift Cards Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Gift Cards</h2>
          <GiftCardGrid />
          <div className="text-center mt-8">
            <Link 
              href="/cards"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              View All Gift Cards
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
