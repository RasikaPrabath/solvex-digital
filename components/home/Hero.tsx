"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroProps {
  frameCount?: number;
  framePrefix?: string;
  frameExtension?: string;
}

export default function Hero({
  frameCount = 120,
  framePrefix = "/images/sequence/frame_",
  frameExtension = "webp",
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate current frame index (0 to frameCount - 1)
  const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // 1. Preload all video frames immediately
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `${framePrefix}${paddedIndex}.${frameExtension}`;

      img.onload = () => {
        if (!isMounted) return;
        setImagesLoaded((prev) => prev + 1);
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, [frameCount, framePrefix, frameExtension]);

  // 2. High-performance Canvas Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const frame = Math.min(
        Math.max(0, Math.floor(currentFrameIndex.get())),
        frameCount - 1
      );

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let targetImg: HTMLImageElement | null = null;
      if (
        imagesRef.current[frame] &&
        imagesRef.current[frame].complete &&
        imagesRef.current[frame].naturalWidth > 0
      ) {
        targetImg = imagesRef.current[frame];
      } else {
        // Fallback to closest available frame
        for (let i = 0; i < imagesRef.current.length; i++) {
          if (
            imagesRef.current[i] &&
            imagesRef.current[i].complete &&
            imagesRef.current[i].naturalWidth > 0
          ) {
            targetImg = imagesRef.current[i];
            break;
          }
        }
      }

      if (targetImg && targetImg.naturalWidth > 0) {
        const imgW = targetImg.naturalWidth;
        const imgH = targetImg.naturalHeight;

        const hRatio = canvas.width / imgW;
        const vRatio = canvas.height / imgH;
        const ratio = Math.max(hRatio, vRatio);

        const drawW = imgW * ratio;
        const drawH = imgH * ratio;
        const drawX = (canvas.width - drawW) / 2;
        const drawY = (canvas.height - drawH) / 2;

        ctx.drawImage(targetImg, drawX, drawY, drawW, drawH);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [currentFrameIndex, frameCount]);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative bg-black select-none overflow-clip h-[420vh]"
    >
      {/* ── Sticky Fullscreen Stage ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center z-10">

        {/* Real Consistent Developer Video Frames (Hardware Accelerated Canvas) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />

          {/* Subtle ambient overlay so video is bright & vivid while keeping text clear */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

        {/* ── HERO BRAND CONTENT (Fades out smoothly on scroll) ── */}
        {/* ── HERO BRAND CONTENT ── */}
        <motion.div
          className="relative z-20 flex flex-col items-center text-center px-4 pointer-events-auto"
        >
          {/* Modern Premium Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-950/60 hover:bg-neutral-950/80 border border-white/[0.12] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] mb-5 transition-all duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </span>
            <span
              className="text-xs sm:text-[13px] font-medium tracking-wide text-neutral-200"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              Crafting Exceptional Digital Experiences
            </span>
          </motion.div>

          {/* SOLVEX Brand Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-200 text-sm sm:text-base md:text-[17px] max-w-xl mx-auto leading-relaxed mt-3 sm:mt-5 mb-7 font-normal tracking-wide drop-shadow-md"
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            Crafting bold digital experiences that help brands grow and stand out.
          </motion.p>

          {/* CTAs with Smooth Entrance & Interactive Hover Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3.5"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6.5 py-2.5 bg-white hover:bg-neutral-100 text-black font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/[0.14] hover:bg-white/[0.22] backdrop-blur-xl text-white border border-white/35 hover:border-white/65 font-medium text-xs sm:text-sm rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.18)] group"
              >
                <span>Explore Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 text-[11px] font-mono tracking-widest text-cyan-400/90 animate-bounce"
          >
            ↓ SCROLL TO EXPLORE
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
