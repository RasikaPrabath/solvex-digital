import type { Metadata } from "next";
import { processSteps } from "@/content/process";

export const metadata: Metadata = {
  title: "Engineering Process | Solvex",
  description:
    "How Solvex works — our 5-step development methodology from discovery through production deployment. Transparent, predictable, and sprint-based.",
};

export default function ProcessPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Page Header */}
        <div className="mb-14 max-w-2xl">
          <span
            className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-2.5"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Delivery Methodology
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-black tracking-[-0.025em] mb-4 leading-snug"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
            }}
          >
            How we engineer software
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
            Predictable sprints, transparent checkpoints, and zero guesswork. Here is our end-to-end framework from strategic discovery to enterprise deployment.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-0">
          {processSteps.map((step, i) => (
            <div key={step.number} className="relative">
              {i > 0 && <div className="border-t border-neutral-200/80" />}
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 py-10 items-start">
                {/* Step number & Title */}
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3.5 lg:flex-col lg:items-start">
                    <div className="w-10 h-10 rounded-full border border-neutral-300 bg-white flex items-center justify-center shadow-2xs">
                      <span
                        className="text-black text-xs sm:text-sm font-semibold"
                        style={{
                          fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        {String(step.number).padStart(2, "0")}
                      </span>
                    </div>
                    <h2
                      className="text-lg sm:text-xl font-semibold text-black lg:mt-3 tracking-tight"
                      style={{
                        fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {step.title}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-8 lg:pt-2">
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
