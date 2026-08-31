"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ── Scroll-reveal detail items ── */
const details = [
  {
    label: "Web Development",
    text: "High-performance Next.js applications with pixel-perfect design and blazing-fast load times.",
  },
  {
    label: "Mobile Apps",
    text: "Native & cross-platform mobile experiences built with React Native and Flutter.",
  },
  {
    label: "UI / UX Design",
    text: "Research-driven interfaces that delight users and drive measurable business outcomes.",
  },
  {
    label: "Cloud & DevOps",
    text: "Scalable infrastructure on AWS, GCP & Azure with CI/CD pipelines that ship faster.",
  },
];

interface HeroProps {
  frameCount?: number;
  framePrefix?: string;
  frameExtension?: string;
}

export default function Hero({
  frameCount = 60,
  framePrefix = "/images/sequence/frame_",
  frameExtension = "webp",
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  /* Subtitle & CTAs fade out, SOLVEX stays */
  const subContentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const subContentY = useTransform(scrollYProgress, [0, 0.35], [0, -30]);

  /* Detail text blocks fade in at different scroll milestones */
  const d1Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.48, 0.52], [0, 1, 1, 0]);
  const d1Y = useTransform(scrollYProgress, [0.3, 0.4], [30, 0]);

  const d2Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.63, 0.67], [0, 1, 1, 0]);
  const d2Y = useTransform(scrollYProgress, [0.45, 0.55], [30, 0]);

  const d3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.78, 0.82], [0, 1, 1, 0]);
  const d3Y = useTransform(scrollYProgress, [0.6, 0.7], [30, 0]);

  const d4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const d4Y = useTransform(scrollYProgress, [0.75, 0.85], [30, 0]);

  const detailAnimations = [
    { opacity: d1Opacity, y: d1Y },
    { opacity: d2Opacity, y: d2Y },
    { opacity: d3Opacity, y: d3Y },
    { opacity: d4Opacity, y: d4Y },
  ];

  // 1. Preload frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${framePrefix}${String(i).padStart(3, "0")}.${frameExtension}`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, [frameCount, framePrefix, frameExtension]);

  // 2. Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const frame = Math.min(Math.max(0, Math.floor(currentFrameIndex.get())), frameCount - 1);

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let targetImg: HTMLImageElement | null = null;
      if (imagesRef.current[frame]?.complete && imagesRef.current[frame].naturalWidth > 0) {
        targetImg = imagesRef.current[frame];
      } else {
        for (const img of imagesRef.current) {
          if (img?.complete && img.naturalWidth > 0) { targetImg = img; break; }
        }
      }

      if (targetImg && targetImg.naturalWidth > 0) {
        const hRatio = canvas.width / targetImg.naturalWidth;
        const vRatio = canvas.height / targetImg.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);
        const drawW = targetImg.naturalWidth * ratio;
        const drawH = targetImg.naturalHeight * ratio;
        ctx.drawImage(targetImg, (canvas.width - drawW) / 2, (canvas.height - drawH) / 2, drawW, drawH);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [currentFrameIndex, frameCount]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black select-none overflow-clip"
      style={{ height: "450vh" }}
    >
      {/* ── Sticky Fullscreen Stage ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center z-10">

        {/* 3D Canvas Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />
        </div>

        {/* ── SOLVEX — ALWAYS VISIBLE ── */}
        <div className="relative z-20 text-center pointer-events-none">
          <h1
            className="select-none"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(52px, 11vw, 150px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            SOLVEX
          </h1>
        </div>

        {/* ── SUBTITLE + CTAs — ALWAYS VISIBLE ── */}
        <div
          className="relative z-20 max-w-5xl mx-auto w-full text-center px-4 pointer-events-auto mt-3 sm:mt-5"
        >
          <p className="text-neutral-300 text-sm sm:text-base md:text-[17px] max-w-xl mx-auto leading-relaxed mb-7">
            Crafting bold digital experiences that help brands grow and stand out.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white hover:bg-neutral-100 text-black font-medium text-xs sm:text-sm rounded-full transition-all duration-200 shadow-lg hover:-translate-y-0.5 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-medium text-xs sm:text-sm rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Explore Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300" />
            </Link>
          </div>

          <div className="mt-10 text-[11px] font-mono text-neutral-400/80 animate-bounce">
            ↓ SCROLL TO EXPLORE
          </div>
        </div>

        {/* ── SCROLL-REVEAL DETAIL TEXTS ── */}
        {details.map((item, i) => (
          <motion.div
            key={item.label}
            style={{ opacity: detailAnimations[i].opacity, y: detailAnimations[i].y }}
            className="absolute z-20 bottom-[15%] left-0 right-0 px-6 sm:px-12 md:px-20 pointer-events-none"
          >
            <div className="max-w-3xl mx-auto">
              <span
                className="block text-[10px] sm:text-xs uppercase tracking-[0.25em] text-blue-400/80 mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 600 }}
              >
                {item.label}
              </span>
              <p
                className="text-white text-lg sm:text-2xl md:text-3xl leading-snug"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
