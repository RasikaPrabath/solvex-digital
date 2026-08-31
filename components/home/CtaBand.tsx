"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          className="rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-neutral-50 via-white to-neutral-50/80 px-8 py-12 sm:px-12 sm:py-16 text-center relative overflow-hidden border border-neutral-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Subtle light ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-md h-[130px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 0, 0, 0.025), transparent 80%)",
            }}
          />

          <h2
            className="text-black text-2xl sm:text-3xl font-bold tracking-[-0.03em] mb-2.5 relative z-10"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            Have a project in mind?
          </h2>

          <p
            className="text-neutral-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed relative z-10 font-normal"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
            }}
          >
            Tell us what you're working on. We'll figure out the best way to help — no commitment, no sales pitch.
          </p>

          <div className="relative z-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6.5 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              }}
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
