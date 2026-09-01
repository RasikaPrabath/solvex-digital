"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ── Scroll-reveal detail items ── */
const details = [
  {
    label: "Web Architecture & Code",
    text: "High-performance Next.js full-stack applications engineered with clean TypeScript, modular components, and blazing-fast load times.",
  },
  {
    label: "Interactive UI & Micro-Interactions",
    text: "Ultra-responsive dark interfaces crafted with fluid animations, dynamic data charts, and precision design.",
  },
  {
    label: "Cloud & DevOps Automation",
    text: "Automated CI/CD deployment pipelines on edge networks achieving 100/100 Lighthouse performance scores.",
  },
  {
    label: "Enterprise Launch & Scale",
    text: "End-to-end digital solutions built to elevate modern brands, drive conversions, and scale effortlessly.",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade out hero title/buttons during scroll
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const heroContentScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.96]);

  /* Detail text blocks fade in at different scroll milestones */
  const d1Opacity = useTransform(scrollYProgress, [0.22, 0.34, 0.42, 0.46], [0, 1, 1, 0]);
  const d1Y = useTransform(scrollYProgress, [0.22, 0.34], [30, 0]);

  const d2Opacity = useTransform(scrollYProgress, [0.46, 0.56, 0.64, 0.68], [0, 1, 1, 0]);
  const d2Y = useTransform(scrollYProgress, [0.46, 0.56], [30, 0]);

  const d3Opacity = useTransform(scrollYProgress, [0.68, 0.78, 0.86, 0.9], [0, 1, 1, 0]);
  const d3Y = useTransform(scrollYProgress, [0.68, 0.78], [30, 0]);

  const d4Opacity = useTransform(scrollYProgress, [0.9, 0.96, 1, 1], [0, 1, 1, 1]);
  const d4Y = useTransform(scrollYProgress, [0.9, 0.96], [30, 0]);

  const detailAnimations = [
    { opacity: d1Opacity, y: d1Y },
    { opacity: d2Opacity, y: d2Y },
    { opacity: d3Opacity, y: d3Y },
    { opacity: d4Opacity, y: d4Y },
  ];

  // Scrub video playback time smoothly with scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video playback
    video.play().catch(() => {});

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (video.duration && !isNaN(video.duration)) {
        const targetTime = progress * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime = targetTime;
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black select-none overflow-clip h-[420vh]"
    >
      {/* ── Sticky Fullscreen Stage ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center z-10">

        {/* Real Continuous Developer Coding Video Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <video
            ref={videoRef}
            src="/images/developer-coding.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-[1.02]"
          />

          {/* Deep Dark Ambient Vignettes for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),rgba(0,0,0,0.85))] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        </div>

        {/* ── HERO BRAND CONTENT (Fades out smoothly on scroll) ── */}
        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY, scale: heroContentScale }}
          className="relative z-20 flex flex-col items-center text-center px-4 pointer-events-auto"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 text-xs font-medium text-white shadow-2xl mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-300">
              SOLVEX DIGITAL // LIVE CODE ARCHITECTURE
            </span>
          </div>

          {/* SOLVEX Brand Title */}
          <h1
            className="select-none uppercase"
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro', 'Helvetica Neue', 'Inter', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(64px, 14vw, 195px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              textShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
            }}
          >
            SOLVEX
          </h1>

          {/* Subtitle */}
          <p
            className="text-neutral-200 text-sm sm:text-base md:text-[17px] max-w-xl mx-auto leading-relaxed mt-3 sm:mt-5 mb-7 font-normal tracking-wide drop-shadow-md"
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            Crafting bold digital experiences that help brands grow and stand out.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6.5 py-2.5 bg-white hover:bg-neutral-100 text-black font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_35px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/[0.14] hover:bg-white/[0.22] backdrop-blur-xl text-white border border-white/35 hover:border-white/65 font-medium text-xs sm:text-sm rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.18)] group"
            >
              <span>Explore Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 text-[11px] font-mono tracking-widest text-cyan-400/90 animate-bounce">
            ↓ SCROLL TO EXPLORE ARCHITECTURE
          </div>
        </motion.div>

        {/* ── SCROLL-REVEAL DETAIL NARRATIVE CARDS ── */}
        <div className="w-full">
          {details.map((item, i) => (
            <motion.div
              key={item.label}
              style={{ opacity: detailAnimations[i].opacity, y: detailAnimations[i].y }}
              className="absolute z-20 bottom-[12%] left-0 right-0 px-6 sm:px-12 md:px-20 pointer-events-none"
            >
              <div className="max-w-3xl mx-auto bg-neutral-950/80 backdrop-blur-2xl border border-neutral-800/90 p-6 sm:p-8 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.9)] border-l-4 border-l-cyan-400">
                <span
                  className="block text-[11px] sm:text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono font-semibold mb-2"
                >
                  0{i + 1} // {item.label}
                </span>
                <p
                  className="text-neutral-100 text-lg sm:text-2xl md:text-3xl leading-snug font-medium"
                  style={{
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro', 'Inter', system-ui, sans-serif",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
