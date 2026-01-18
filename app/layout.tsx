import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/components/CartProvider";
import { getInitialThemeScript } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Virtual Gift Cards - Buy Digital Gift Cards Online",
  description: "Purchase virtual gift cards from top brands. Fast, secure, and convenient digital gift card platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getInitialThemeScript() }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
