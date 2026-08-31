"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { processSteps } from "@/content/process";

export default function ProcessTeaser() {
  return (
    <motion.section
      className="py-16 sm:py-22 border-t border-neutral-100 bg-white"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <span
              className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-2.5"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              }}
            >
              How we work
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-black"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Our process
            </h2>
          </div>
          <Link
            href="/process"
            className="inline-flex items-center gap-1.5 text-black text-sm font-semibold hover:gap-2.5 transition-all duration-200"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
            }}
          >
            <span>See full process</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Desktop: horizontal row */}
        <div className="hidden md:grid md:grid-cols-5 gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-5 left-[10%] right-[10%] h-[1px] bg-neutral-200 z-0" />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative text-center px-4 group"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="w-10 h-10 rounded-full border border-neutral-300 bg-white flex items-center justify-center mx-auto mb-3.5 relative z-10 shadow-2xs group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-200">
                <span
                  className="text-xs font-bold tracking-tight text-neutral-800 group-hover:text-white transition-colors"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {String(step.number).padStart(2, "0")}
                </span>
              </div>
              <h3
                className="text-sm sm:text-base font-bold mb-1.5 text-black tracking-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  fontWeight: 700,
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed line-clamp-3 font-normal"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                }}
              >
                {step.description.split(".")[0]}.
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden space-y-5">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex gap-3.5 items-start"
              initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="w-9 h-9 rounded-full border border-neutral-300 bg-white flex items-center justify-center shrink-0 shadow-2xs">
                <span
                  className="text-xs font-bold text-black"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {String(step.number).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3
                  className="text-sm sm:text-base font-bold mb-1 text-black tracking-tight"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {step.description.split(".")[0]}.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
