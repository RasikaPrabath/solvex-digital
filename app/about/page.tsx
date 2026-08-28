import type { Metadata } from "next";
import { Users, Zap, Shield } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Solvex | Enterprise Engineering Studio",
  description:
    "Solvex is a senior software engineering studio. Process-first methodology, no junior outsourcing, rapid enterprise execution.",
};

const differentiators = [
  {
    icon: Users,
    title: "100% In-House Senior Engineers",
    description:
      "Every line of production code is written by our core team. We do not subcontract to junior freelancers or unknown offshore shops. You work directly with us.",
  },
  {
    icon: Zap,
    title: "Domain & Process First",
    description:
      "We take the time to understand your operational workflows and bottlenecks before writing a single line of code, ensuring the software solves the actual problem.",
  },
  {
    icon: Shield,
    title: "Enterprise Rigor & Speed",
    description:
      "No unnecessary layers of middle management. Decisions and architectural changes happen in hours with transparent sprint velocity.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Page Header */}
        <div className="mb-12 max-w-3xl">
          <span
            className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-2.5"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            About Us
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-black tracking-[-0.025em] mb-4 leading-snug"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
            }}
          >
            Engineering mission-critical digital systems
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
            We are a focused team of senior software engineers dedicated to turning complex business challenges into reliable, high-performance software.
          </p>
        </div>

        {/* Studio Image Showcase */}
        <div className="relative w-full h-[280px] sm:h-[420px] md:h-[500px] rounded-3xl overflow-hidden mb-16 border border-neutral-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
          <Image
            src="/images/about-studio.jpg"
            alt="Solvex Engineering Studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-xs sm:text-sm font-medium flex items-center justify-between">
            <span>Solvex Engineering Studio — Colombo, Sri Lanka</span>
            <span className="hidden sm:inline opacity-80">Process-First Software Architecture</span>
          </div>
        </div>

        {/* Origin Story */}
        <div className="grid lg:grid-cols-2 gap-10 mb-18 p-7 sm:p-10 rounded-3xl bg-neutral-50/50 border border-neutral-200/80">
          <div>
            <h2
              className="text-xl font-semibold text-black mb-3.5 tracking-tight"
              style={{
                fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
              }}
            >
              Why we started Solvex
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3.5 text-sm sm:text-[15px] font-normal">
              Traditional software agencies often overpromise, delegate work to inexperienced contractors, and deliver brittle code. Solvex was founded to change this.
            </p>
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-[15px] font-normal">
              We operate as a high-velocity extension of your executive leadership team — combining strategic domain architecture with flawless full-stack engineering.
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs">
              <h3
                className="text-sm sm:text-base font-semibold text-black mb-1.5 tracking-tight"
                style={{
                  fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                }}
              >
                Our Vision
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                To be the most trusted technology engineering partner for organizations that demand precision, reliability, and security.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs">
              <h3
                className="text-sm sm:text-base font-semibold text-black mb-1.5 tracking-tight"
                style={{
                  fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                }}
              >
                Our Delivery Commitment
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                Deliver robust, clean software that scales seamlessly, respecting your time, budget, and strategic milestones.
              </p>
            </div>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div>
          <div className="mb-8">
            <span
              className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-2.5"
              style={{
                fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Enterprise Standards
            </span>
            <h2
              className="text-2xl sm:text-3xl font-semibold text-black tracking-tight"
              style={{
                fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
              }}
            >
              What sets Solvex apart
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="p-7 rounded-2xl border border-neutral-200/80 bg-white hover:border-black/20 hover:shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-5 shadow-xs">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <h3
                    className="text-base sm:text-lg font-semibold text-black mb-2 tracking-tight"
                    style={{
                      fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
