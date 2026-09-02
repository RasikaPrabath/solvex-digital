import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Solvex — We Solve. We Build. We Deliver.",
    template: "%s | Solvex",
  },
  description:
    "Solvex is a small software studio that builds custom business software, web apps, and mobile apps. Process-first development for small and mid-size businesses.",
  keywords: [
    "software development",
    "web application",
    "mobile app",
    "business process software",
    "custom software",
    "Solvex",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable} notranslate`} translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <script src="/hydration-fix.js" />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Header />
        <main className="flex-1" suppressHydrationWarning>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

