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

import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [heroActive, setHeroActive] = useState(true);

  // Home page has a dark hero canvas background
  const isDarkHero = pathname === "/";

  useEffect(() => {
    if (!isDarkHero) {
      setHeroActive(true);
      return;
    }

    const handleScroll = () => {
      const heroEl = document.getElementById("hero-section");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Visible while the hero bottom is still inside/above viewport
        setHeroActive(rect.bottom > 80);
      } else {
        const heroHeight = window.innerHeight * 3.5;
        setHeroActive(window.scrollY < heroHeight);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDarkHero]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isDarkHero
          ? heroActive
            ? "translate-y-0 opacity-100 bg-neutral-950/75 backdrop-blur-xl border-b border-white/[0.08]"
            : "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100 bg-white/90 backdrop-blur-md border-b border-neutral-200/70"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo with Smooth Entrance */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
            <span
              className={`text-xl sm:text-2xl font-bold tracking-tight transition-opacity group-hover:opacity-80 ${
                isDarkHero ? "text-white" : "text-neutral-950"
              }`}
              style={{
                fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 800,
              }}
            >
              Solvex
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full translate-y-[1px] ${
                isDarkHero ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-black"
              }`}
            />
          </Link>
        </motion.div>

        {/* Center Nav Links with Staggered Entrance */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            let linkStyle = "";
            if (isDarkHero) {
              linkStyle = isActive
                ? "text-white font-semibold after:scale-x-100"
                : "text-neutral-300 hover:text-white font-medium after:scale-x-0 hover:after:scale-x-100";
            } else {
              linkStyle = isActive
                ? "text-black font-semibold after:scale-x-100"
                : "text-neutral-600 hover:text-black font-medium after:scale-x-0 hover:after:scale-x-100";
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-wide transition-colors duration-200 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-400 after:transition-transform after:duration-300 ${linkStyle}`}
                style={{
                  fontFamily:
                    "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </motion.nav>

        {/* Mobile Horizontal Links */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex md:hidden items-center gap-2 overflow-x-auto no-scrollbar py-1"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                  isDarkHero
                    ? isActive
                      ? "bg-white/20 text-white font-semibold"
                      : "text-neutral-300 hover:text-white"
                    : isActive
                    ? "bg-black text-white font-semibold"
                    : "text-neutral-700 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </motion.nav>

        {/* Right Action CTA with Entrance & Hover Spring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 16 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0 hidden sm:block"
        >
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 group ${
              isDarkHero
                ? "bg-white hover:bg-neutral-100 text-black shadow-none"
                : "bg-black hover:bg-neutral-800 text-white shadow-none"
            }`}
            style={{
              fontFamily:
                "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </header>
  );
}
