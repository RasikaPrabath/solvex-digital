import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Geist:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
