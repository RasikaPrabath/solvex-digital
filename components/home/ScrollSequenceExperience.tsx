"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowRight, Layers, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

interface ScrollSequenceExperienceProps {
  frameCount?: number;
  framePrefix?: string;
  frameExtension?: string;
}

export default function ScrollSequenceExperience({
  frameCount = 60,
  framePrefix = "/images/sequence/frame_",
  frameExtension = "webp",
}: ScrollSequenceExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Track scroll through the 350vh tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate current frame index (0 to frameCount - 1)
  const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Clean non-overlapping opacity curves for the 3 stages
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.28], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.18, 0.28], [0, 0, -20]);

  const stage2Opacity = useTransform(scrollYProgress, [0.34, 0.48, 0.62], [0, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.34, 0.48, 0.62], [20, 0, -20]);

  const stage3Opacity = useTransform(scrollYProgress, [0.70, 0.85, 1], [0, 1, 1]);
  const stage3Y = useTransform(scrollYProgress, [0.70, 0.85, 1], [20, 0, 0]);

  // Progress Bar Width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // 1. Preload all 60 frames immediately
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
      const progress = scrollYProgress.get();
      const frame = Math.min(
        Math.max(0, Math.floor(currentFrameIndex.get())),
        frameCount - 1
      );

      // Update active timeline pill
      if (progress < 0.33) setActiveStep(0);
      else if (progress < 0.66) setActiveStep(1);
      else setActiveStep(2);

      // Sync canvas resolution with display size & DPR
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Find the best available frame (target frame or closest loaded frame)
      let targetImg: HTMLImageElement | null = null;
      if (
        imagesRef.current[frame] &&
        imagesRef.current[frame].complete &&
        imagesRef.current[frame].naturalWidth > 0
      ) {
        targetImg = imagesRef.current[frame];
      } else {
        // Fallback to first available loaded frame
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

        // Cover widescreen display cleanly without distortion
        const hRatio = canvas.width / imgW;
        const vRatio = canvas.height / imgH;
        const ratio = Math.max(hRatio, vRatio);

        const drawW = imgW * ratio;
        const drawH = imgH * ratio;
        const drawX = (canvas.width - drawW) / 2;
        const drawY = (canvas.height - drawH) / 2;

        // Draw full-size landscape frame
        ctx.drawImage(targetImg, drawX, drawY, drawW, drawH);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [currentFrameIndex, scrollYProgress, frameCount]);

  return (
    <section
      ref={containerRef}
      className="relative h-[340vh] bg-black select-none overflow-clip border-y border-neutral-800"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8 md:p-10 z-10">
        
        {/* Top Header Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-30 pt-1 sm:pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-xl border border-neutral-800/90 text-xs font-medium text-white shadow-xl">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-300">
              Full-Width 3D Mockup Experience
            </span>
          </div>

          {/* Timeline Step Pills */}
          <div className="hidden sm:flex items-center gap-2 bg-neutral-950/80 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-neutral-800/90 text-xs">
            {["01. Web Platform", "02. Mobile Duo", "03. Enterprise Launch"].map(
              (label, idx) => (
                <span
                  key={label}
                  className={`px-3 py-1 rounded-full transition-all duration-300 font-mono text-[11px] ${
                    activeStep === idx
                      ? "bg-blue-600 text-white font-semibold shadow-[0_0_15px_rgba(54,84,255,0.6)]"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>

        {/* Full-bleed 16:9 Widescreen Landscape 3D Canvas Stage */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient vignette at top and bottom to blend with content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Floating Narrative Content Cards (Positioned at bottom-left/center to never block the 3D product) */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 mb-4 sm:mb-8 pointer-events-none">
          <div className="relative min-h-[140px] flex items-end">
            
            {/* Stage 01 */}
            <motion.div
              style={{ opacity: stage1Opacity, y: stage1Y }}
              className="max-w-md bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/90 p-5 rounded-2xl shadow-2xl"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-semibold tracking-wider uppercase mb-2">
                <Layers className="w-3 h-3" /> Stage 01 // SaaS & Web Platform
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                Modern Web Architecture
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Ultra-fast, responsive web applications engineered with precision design and real-time data sync.
              </p>
            </motion.div>

            {/* Stage 02 */}
            <motion.div
              style={{ opacity: stage2Opacity, y: stage2Y }}
              className="absolute left-0 max-w-md bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/90 p-5 rounded-2xl shadow-2xl"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono font-semibold tracking-wider uppercase mb-2">
                <Cpu className="w-3 h-3" /> Stage 02 // Multi-Device Duo
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                Mobile & Desktop Harmony
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Native performance on iOS, Android, and web with unified state management and cloud backend.
              </p>
            </motion.div>

            {/* Stage 03 */}
            <motion.div
              style={{ opacity: stage3Opacity, y: stage3Y }}
              className="absolute left-0 max-w-md bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/90 p-5 rounded-2xl shadow-2xl pointer-events-auto"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold tracking-wider uppercase mb-2">
                <ShieldCheck className="w-3 h-3" /> Stage 03 // Enterprise Flagship
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                Complete Digital Ecosystem
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                Scalable cloud infrastructure, automated CI/CD pipelines, and high-impact user experiences.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-full shadow-[0_0_20px_rgba(54,84,255,0.5)] transition-all group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Bottom Interactive Scroll Progress Indicator */}
        <div className="max-w-xl mx-auto w-full z-30 pb-1 flex flex-col items-center gap-1.5">
          <div className="w-full bg-neutral-800/90 h-1.5 rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 rounded-full"
            />
          </div>
          <div className="flex items-center justify-between w-full text-[10px] font-mono text-neutral-400">
            <span>SCROLL TO EXPLORE</span>
            <span>60 REAL 3D FRAMES</span>
          </div>
        </div>

      </div>
    </section>
  );
}
