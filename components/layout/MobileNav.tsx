"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.nav
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white border-l border-neutral-100 lg:hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Close button */}
            <div className="flex items-center justify-between h-18 px-6 border-b border-neutral-100">
              <Link href="/" onClick={onClose} className="flex items-center gap-1">
                <span
                  className="text-[23px] font-black text-black tracking-[-0.04em]"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 900,
                  }}
                >
                  Solvex
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-black ml-0.5 translate-y-[3px]" />
              </Link>
              <button
                onClick={onClose}
                className="p-2 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 px-6 py-8 flex flex-col gap-2">
              {links.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block py-3 text-base transition-colors duration-200 ${
                        isActive
                          ? "text-black font-semibold"
                          : "font-medium text-neutral-600 hover:text-black"
                      }`}
                      style={{
                        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="px-6 pb-8">
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-black hover:bg-neutral-800 text-white font-medium text-sm rounded-full transition-all duration-200 shadow-md group"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
