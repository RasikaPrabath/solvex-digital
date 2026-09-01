"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowRight, Code2, Layout, Rocket, Terminal, Sparkles, CheckCircle2, Play, Pause, Video } from "lucide-react";
import Link from "next/link";

export default function ScrollSequenceExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  // Track scroll through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Clean opacity curves for narrative cards
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.22, 0.32], [0, 0, -20]);

  const stage2Opacity = useTransform(scrollYProgress, [0.36, 0.52, 0.66], [0, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.36, 0.52, 0.66], [20, 0, -20]);

  const stage3Opacity = useTransform(scrollYProgress, [0.72, 0.88, 1], [0, 1, 1]);
  const stage3Y = useTransform(scrollYProgress, [0.72, 0.88, 1], [20, 0, 0]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Synchronize video timeline smoothly with scroll position
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is ready
    const handleLoaded = () => {
      video.playbackRate = 1.0;
    };
    video.addEventListener("loadedmetadata", handleLoaded);

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      // Update active timeline pill
      if (progress < 0.33) setActiveStep(0);
      else if (progress < 0.66) setActiveStep(1);
      else setActiveStep(2);

      // Scrub video time with smooth scroll sync when video is loaded
      if (video.duration && !isNaN(video.duration)) {
        // Target time based on scroll
        const targetTime = progress * video.duration;
        // Damp / smooth seek
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
          video.currentTime = targetTime;
        }
      }
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      unsubscribe();
    };
  }, [scrollYProgress]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[340vh] bg-black select-none overflow-clip border-y border-neutral-900"
    >
      {/* Sticky Fullscreen Video Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8 md:p-10 z-10">
        
        {/* Top Header Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-30 pt-1 sm:pt-2">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-neutral-800 text-xs font-medium text-white shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
            <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-200">
              Live Developer Video Stream // 1080p Full HD
            </span>
          </div>

          {/* Timeline Step Pills */}
          <div className="hidden sm:flex items-center gap-2 bg-neutral-950/85 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-neutral-800 text-xs">
            {[
              { label: "01. Architecture & Codebase", icon: Code2 },
              { label: "02. Responsive Dark UI", icon: Layout },
              { label: "03. Production Deployment", icon: Rocket },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <span
                  key={step.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-300 font-mono text-[11px] ${
                    activeStep === idx
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/30 text-cyan-300 font-semibold border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {step.label}
                </span>
              );
            })}
          </div>

          {/* Play/Pause Video Controls */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 text-xs font-mono transition-all pointer-events-auto"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-cyan-400" />
                <span className="hidden md:inline">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                <span className="hidden md:inline">PLAY</span>
              </>
            )}
          </button>
        </div>

        {/* Real Continuous Developer Coding Video Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <video
            ref={videoRef}
            src="/images/developer-coding.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.03] transition-transform duration-700"
          />

          {/* Softened Ambient Overlays & Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/45 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),rgba(0,0,0,0.45))] pointer-events-none" />
          
          {/* Subtle Cyber Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        </div>

        {/* Floating Narrative Content Cards */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 mb-4 sm:mb-8 pointer-events-none">
          <div className="relative min-h-[145px] flex items-end">
            
            {/* Stage 01 */}
            <motion.div
              style={{ opacity: stage1Opacity, y: stage1Y }}
              className="max-w-md bg-neutral-950/85 backdrop-blur-2xl border border-neutral-800/90 p-5 sm:p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.85)] border-l-4 border-l-cyan-500"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-semibold tracking-wider uppercase mb-2.5">
                <Code2 className="w-3 h-3" /> Stage 01 // Handcrafted Code
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                Real-Time Code Engineering
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Watch every component being crafted live. Clean Next.js server components, modular TypeScript logic, and custom micro-interactions.
              </p>
            </motion.div>

            {/* Stage 02 */}
            <motion.div
              style={{ opacity: stage2Opacity, y: stage2Y }}
              className="absolute left-0 max-w-md bg-neutral-950/85 backdrop-blur-2xl border border-neutral-800/90 p-5 sm:p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.85)] border-l-4 border-l-purple-500"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono font-semibold tracking-wider uppercase mb-2.5">
                <Sparkles className="w-3 h-3" /> Stage 02 // Dark Mode UI & Testing
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                Multi-Monitor Precision
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Simultaneous multi-screen debugging, browser devtools inspection, and responsive design testing for flawless execution.
              </p>
            </motion.div>

            {/* Stage 03 */}
            <motion.div
              style={{ opacity: stage3Opacity, y: stage3Y }}
              className="absolute left-0 max-w-md bg-neutral-950/85 backdrop-blur-2xl border border-neutral-800/90 p-5 sm:p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.85)] border-l-4 border-l-emerald-500 pointer-events-auto"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold tracking-wider uppercase mb-2.5">
                <CheckCircle2 className="w-3 h-3" /> Stage 03 // Production Deployed
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                Ready for the World
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                Automated CI/CD pipelines, zero-downtime edge caching, and 100/100 Lighthouse performance delivered directly to production.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-full shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all group"
              >
                <span>Start Your Web Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Bottom Interactive Scroll Progress Indicator */}
        <div className="max-w-xl mx-auto w-full z-30 pb-1 flex flex-col items-center gap-1.5">
          <div className="w-full bg-neutral-900/90 border border-neutral-800/60 h-1.5 rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.5)]"
            />
          </div>
          <div className="flex items-center justify-between w-full text-[10px] font-mono text-neutral-400">
            <span className="flex items-center gap-1 text-cyan-400">
              <Terminal className="w-3 h-3" />
              SCROLL TO SCRUB VIDEO
            </span>
            <span className="flex items-center gap-1 text-neutral-400">
              <Video className="w-3 h-3 text-emerald-400" />
              REAL DEVELOPER FOOTAGE // DARK VIBE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
