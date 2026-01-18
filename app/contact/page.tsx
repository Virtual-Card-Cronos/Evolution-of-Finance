"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a production environment, this would send the form data to a backend service
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-purple-100 dark:text-purple-200">
              We&apos;re here to help with any questions
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  Send Us a Message
                </h2>
                {isSubmitted ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                    <span className="text-4xl mb-4 block">✅</span>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                      Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📧</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        support@virtualcards.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">💬</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Live Chat</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Available 24/7 on our website
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📱</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Social Media</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Follow us @virtualcards
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We typically respond within 24 hours. For urgent matters, please use our
                    live chat feature for immediate assistance.
                  </p>
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
