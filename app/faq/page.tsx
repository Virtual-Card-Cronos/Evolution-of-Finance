import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I purchase a gift card?",
      answer: "Simply browse our catalog, select a gift card, choose your denomination, and proceed to checkout. Your gift card code will be delivered to your email instantly after payment.",
    },
    {
      question: "How long does delivery take?",
      answer: "Digital gift cards are delivered instantly to your email address. In rare cases, it may take up to 5 minutes during peak times.",
    },
    {
      question: "Can I use my gift card internationally?",
      answer: "It depends on the brand. Some gift cards are region-specific while others can be used globally. Please check the gift card details before purchasing.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, debit cards, and various digital payment methods. All payments are processed securely.",
    },
    {
      question: "Can I get a refund?",
      answer: "Due to the digital nature of gift cards, refunds are generally not available once the code has been delivered. Please contact our support team for exceptional circumstances.",
    },
    {
      question: "Is it safe to buy gift cards online?",
      answer: "Yes! We use bank-level encryption to protect your payment information, and all our gift cards are sourced directly from official brand partners.",
    },
    {
      question: "Can I send a gift card to someone else?",
      answer: "Absolutely! During checkout, you can enter the recipient&apos;s email address, and the gift card will be delivered directly to them.",
    },
    {
      question: "What if I didn&apos;t receive my gift card?",
      answer: "First, check your spam or junk folder. If you still can&apos;t find it, contact our support team with your order details, and we&apos;ll help resolve the issue promptly.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-purple-100 dark:text-purple-200">
              Find answers to common questions about our service
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Still have questions?
              </p>
              <a
                href="/contact"
                className="inline-block bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
