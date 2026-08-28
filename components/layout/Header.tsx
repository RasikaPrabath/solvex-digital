"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, ArrowRight } from "lucide-react";
import MobileNav from "./MobileNav";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-white/90 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
            : "bg-white/75 backdrop-blur-xl border-b border-transparent"
          }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 h-16 sm:h-18 flex items-center justify-between">
          {/* Razor-sharp Clean Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
            <span
              className="text-[21px] sm:text-[22px] font-black text-black tracking-[-0.04em] transition-opacity group-hover:opacity-75"
              style={{
                fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 900,
              }}
            >
              Solvex
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black translate-y-[2px]" />
          </Link>

          {/* Desktop Nav Links (Crisp, dark, 100% clearly readable) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[14px] transition-all duration-150 ${isActive
                      ? "text-black font-bold tracking-tight"
                      : "text-neutral-800 hover:text-black font-semibold tracking-tight"
                    }`}
                  style={{
                    fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Luxury Enterprise CTA Pill */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-semibold text-[13.5px] rounded-full transition-all duration-200 shadow-xs hover:-translate-y-0.5 group"
                style={{
                  fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <button
              className="lg:hidden p-2 text-black hover:text-neutral-600 transition-colors cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
