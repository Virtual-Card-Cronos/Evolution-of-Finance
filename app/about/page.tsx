import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-purple-100 dark:text-purple-200">
              Your trusted platform for digital gift cards
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Our Mission</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  At VirtualCards, we believe in making gifting simple, instant, and accessible to everyone. 
                  Our platform connects you with digital gift cards from hundreds of top brands worldwide, 
                  allowing you to send the perfect gift in seconds.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Who We Are</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  We are a team of passionate individuals dedicated to revolutionizing the way people 
                  give and receive gifts. Founded with the vision of making digital gifting seamless, 
                  we have grown to become a trusted marketplace for gift cards across multiple categories.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Why Choose Us</h2>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Instant Delivery</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Get your gift cards delivered to your email within seconds of purchase.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Wide Selection</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose from hundreds of brands across gaming, retail, dining, and more.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Secure Payments</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Bank-level encryption ensures your payment information is always protected.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">24/7 Support</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our support team is always ready to help you with any questions or issues.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
