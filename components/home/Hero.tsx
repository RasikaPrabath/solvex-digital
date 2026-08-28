"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  // Smooth responsive mouse parallax & 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 140, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 140, damping: 22 });

  // 3D Perspective Tilt for Text
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  // Floating parallax transformations for cards
  const card1X = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const card1Y = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const card2X = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const card2Y = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  const card3X = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const card3Y = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Letter positions with pristine enterprise geometry
  const letterItems = [
    { char: "S", x: 160, delay: 0.04 },
    { char: "O", x: 350, delay: 0.08 },
    { char: "L", x: 540, delay: 0.12 },
    { char: "V", x: 730, delay: 0.16 },
    { char: "E", x: 920, delay: 0.20 },
    { char: "X", x: 1110, delay: 0.24 },
  ];

  return (
    <section
      className="relative pt-20 pb-4 sm:pt-32 sm:pb-12 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16 overflow-hidden bg-white select-none min-h-0 sm:min-h-[85vh] flex flex-col justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1400px" }}
    >
      <div className="w-full relative z-10 flex flex-col items-center">

        {/* ── HERO DISPLAY STAGE ── */}
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full max-w-[100vw] flex items-center justify-center my-0 mt-0 sm:mt-1 min-h-[160px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-[380px] overflow-visible"
        >

          {/* ── CARD 1: LEFT 3D GLASS CARD ── */}
          <motion.div
            style={{
              x: card1X,
              y: card1Y,
              transform: "translateZ(-30px)",
            }}
            initial={{ opacity: 0, scale: 0.75, rotate: -42, y: 35 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: -30,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1, ease: "easeOut" },
              scale: { duration: 0.7, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] },
              rotate: { duration: 0.7, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            }}
            whileHover={{ scale: 1.05, rotate: -24, transform: "translateZ(25px)" }}
            className="absolute left-[15%] sm:left-[19%] md:left-[21%] lg:left-[22%] top-[6%] sm:top-[4%] z-10 w-[85px] h-[85px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] lg:w-[205px] lg:h-[205px] cursor-pointer pointer-events-auto group"
          >
            <div className="w-full h-full rounded-[20px] sm:rounded-[36px] p-1.5 sm:p-3 bg-gradient-to-br from-blue-100/70 via-white/50 to-white/30 backdrop-blur-xl border border-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-200 relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-transparent to-transparent pointer-events-none" />
              <div className="w-full h-full rounded-[14px] sm:rounded-[28px] overflow-hidden relative opacity-95 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/images/hero-card-1.jpg"
                  alt="3D Crystal Bloom"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 140px, 205px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* ── CARD 2: CENTER 3D TRANSLUCENT CARD ── */}
          <motion.div
            style={{
              x: card2X,
              y: card2Y,
              transform: "translateZ(-15px)",
            }}
            initial={{ opacity: 0, scale: 0.75, y: 40 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: [0, 8, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.2, ease: "easeOut" },
              scale: { duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
            }}
            whileHover={{ scale: 1.05, rotate: 0, transform: "translateZ(30px)" }}
            className="absolute left-[41%] sm:left-[43%] lg:left-[44%] top-[16%] sm:top-[18%] z-10 w-[75px] h-[100px] sm:w-[120px] sm:h-[160px] md:w-[150px] md:h-[200px] lg:w-[180px] lg:h-[240px] cursor-pointer pointer-events-auto group"
          >
            <div className="w-full h-full rounded-[18px] sm:rounded-[32px] p-1.5 sm:p-2.5 bg-white/40 backdrop-blur-2xl border border-white/95 shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-200 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 to-transparent pointer-events-none" />
              <div className="w-full h-full rounded-[12px] sm:rounded-[24px] overflow-hidden relative opacity-90 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/images/hero-card-2.jpg"
                  alt="3D Fluid Mesh"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 120px, 180px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* ── CARD 3: RIGHT 3D AMBER CARD ── */}
          <motion.div
            style={{
              x: card3X,
              y: card3Y,
              transform: "translateZ(-30px)",
            }}
            initial={{ opacity: 0, scale: 0.75, rotate: 32, y: 35 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 20,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.15, ease: "easeOut" },
              scale: { duration: 0.7, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] },
              rotate: { duration: 0.7, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] },
              y: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
            }}
            whileHover={{ scale: 1.05, rotate: 14, transform: "translateZ(25px)" }}
            className="absolute right-[15%] sm:right-[19%] md:right-[21%] lg:right-[22%] top-[10%] sm:top-[8%] z-10 w-[85px] h-[85px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] lg:w-[205px] lg:h-[205px] cursor-pointer pointer-events-auto group"
          >
            <div className="w-full h-full rounded-[20px] sm:rounded-[36px] p-1.5 sm:p-3 bg-gradient-to-br from-amber-100/70 via-stone-100/50 to-white/30 backdrop-blur-xl border border-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-200 relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-white/40 to-transparent pointer-events-none" />
              <div className="w-full h-full rounded-[14px] sm:rounded-[28px] overflow-hidden relative opacity-95 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/images/hero-card-3.jpg"
                  alt="3D Amber Sculpture"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 140px, 205px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* ── PRISTINE ENTERPRISE TYPOGRAPHY ── */}
          <div
            className="relative z-20 w-full px-2 sm:px-6 flex justify-center items-center pointer-events-none"
            style={{ transform: "translateZ(20px)" }}
          >
            <svg
              viewBox="0 0 1300 240"
              className="w-full h-auto max-h-[38vh] sm:max-h-[44vh] select-none overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Crisp per-letter gradient */}
                <linearGradient id="cleanPerLetterFade" gradientUnits="objectBoundingBox" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                  <stop offset="46%" stopColor="#000000" stopOpacity="0.96" />
                  <stop offset="78%" stopColor="#000000" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
                </linearGradient>

                {/* Clean depth gradient */}
                <linearGradient id="cleanDepthGradient" gradientUnits="objectBoundingBox" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#111115" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#111115" stopOpacity="0.04" />
                </linearGradient>
              </defs>

              {/* 3D Depth Layer */}
              {letterItems.map((item, idx) => (
                <motion.text
                  key={`3d-depth-${idx}`}
                  x={item.x + 1.2}
                  y="88%"
                  textAnchor="middle"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: item.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 700,
                    fontSize: "245px",
                    letterSpacing: "-0.035em",
                    fill: "url(#cleanDepthGradient)",
                  }}
                >
                  {item.char}
                </motion.text>
              ))}

              {/* Front Face: Pristine Clean Enterprise Typography */}
              {letterItems.map((item, idx) => (
                <motion.text
                  key={`3d-front-${idx}`}
                  x={item.x}
                  y="87%"
                  textAnchor="middle"
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: item.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 700,
                    fontSize: "245px",
                    letterSpacing: "-0.035em",
                    fill: "url(#cleanPerLetterFade)",
                  }}
                >
                  {item.char}
                </motion.text>
              ))}
            </svg>
          </div>

        </motion.div>

        {/* ── CLEAN SUBTITLE & CALL TO ACTION ── */}
        <div className="text-center max-w-xl mx-auto mt-2 sm:mt-3 pb-1 relative z-30 px-4">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-neutral-700 text-xs sm:text-base md:text-[16.5px] leading-relaxed font-normal mb-3 sm:mb-5"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Crafting bold digital experiences that help brands grow and stand out. From strategy into impactful digital solutions.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm rounded-full transition-all duration-200 shadow-md hover:-translate-y-0.5 group"
              style={{
                fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-neutral-50 text-black border border-neutral-200 font-medium text-xs sm:text-sm rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-2xs"
              style={{
                fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              <span>Explore Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
