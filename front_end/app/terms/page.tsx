import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-purple-100 dark:text-purple-200">
              Please read these terms carefully before using our service
            </p>
          </div>
        </div>

        {/* Terms Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose dark:prose-invert">
            <div className="space-y-8 text-gray-600 dark:text-gray-400">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using VirtualCards, you accept and agree to be bound by
                  the terms and provisions of this agreement. If you do not agree to these
                  terms, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  2. Use of Service
                </h2>
                <p>
                  VirtualCards provides a platform for purchasing digital gift cards. You
                  agree to use this service only for lawful purposes and in accordance with
                  these terms.
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>You must be at least 18 years old to use our service</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You agree not to resell gift cards purchased through our platform</li>
                  <li>You agree not to use our service for any fraudulent activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  3. Purchases and Payments
                </h2>
                <p>
                  All purchases are final once the gift card code has been delivered to your
                  email. We accept various payment methods, and all transactions are processed
                  securely.
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Prices are displayed in the currency selected at checkout</li>
                  <li>Gift cards are delivered electronically to your email</li>
                  <li>
                    Delivery is typically instant but may take up to 24 hours in some cases
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  4. Refund Policy
                </h2>
                <p>
                  Due to the digital nature of our products, refunds are generally not
                  available once a gift card code has been delivered. However, we may consider
                  refunds in the following circumstances:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>The gift card code is invalid or does not work</li>
                  <li>You were charged but did not receive the gift card</li>
                  <li>Technical errors on our part</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  5. Gift Card Terms
                </h2>
                <p>
                  Each gift card is subject to the terms and conditions of the issuing brand.
                  VirtualCards is not responsible for:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Expiration dates set by the gift card issuer</li>
                  <li>Changes to the value or terms by the issuer</li>
                  <li>Lost or stolen gift card codes after delivery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  6. Privacy
                </h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy to
                  understand how we collect, use, and protect your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  7. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be
                  effective immediately upon posting to our website. Your continued use of
                  the service constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  8. Contact
                </h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us
                  at{" "}
                  <a
                    href="/contact"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    our contact page
                  </a>
                  .
                </p>
              </section>

              <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
                Last updated: January 2026
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
