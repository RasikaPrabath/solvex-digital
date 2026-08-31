"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/30 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
          : "bg-transparent backdrop-blur-none border-b border-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Refined Lightweight Brand Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0 group">
          <span
            className="text-[17px] sm:text-[19px] font-semibold text-white tracking-[-0.02em] transition-opacity group-hover:opacity-70"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            Solvex
          </span>
          <span className="w-1 h-1 rounded-full bg-white/80 translate-y-[0.5px]" />
        </Link>

        {/* Inline Horizontal Navbar Links */}
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-4 overflow-x-auto no-scrollbar py-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-[13px] transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-white/20 text-white font-medium backdrop-blur-sm"
                    : "text-white hover:bg-white/10 font-normal"
                }`}
                style={{
                  fontFamily:
                    "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="shrink-0 hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 sm:px-4.5 sm:py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/20 font-medium text-xs sm:text-xs rounded-full transition-all duration-200 hover:-translate-y-0.5 group"
            style={{
              fontFamily:
                "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </header>
  );
}
