import type { Metadata } from "next";
import { services } from "@/content/services";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Services | Solvex",
  description:
    "Custom enterprise software engineering services — business process automation, cloud systems, mobile apps, API architecture, and UI/UX engineering.",
};

const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;

export default function ServicesPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Page Header */}
        <div className="mb-14 max-w-2xl">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-3"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Engineering Capabilities
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-[38px] font-semibold text-black tracking-[-0.02em] mb-4 leading-snug"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
            }}
          >
            Software engineered for real business outcomes
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
            We focus on custom high-performance architecture. Every engagement starts with deep domain analysis, followed by rapid sprint execution.
          </p>
        </div>

        {/* Services List with Visual Previews */}
        <div className="space-y-10">
          {services.map((service, i) => {
            const IconComponent = icons[service.icon] || LucideIcons.Code;

            return (
              <section
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 p-6 sm:p-9 rounded-3xl border border-neutral-200/80 bg-neutral-50/30 hover:bg-white hover:border-black/20 hover:shadow-[0_12px_35px_rgba(0,0,0,0.03)] transition-all duration-300 overflow-hidden"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Title + Problem (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-xs">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                      <h2
                        className="text-xl font-semibold text-black tracking-tight"
                        style={{
                          fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                      {service.problem}
                    </p>

                    {/* Image Preview */}
                    {service.image && (
                      <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-neutral-200 shadow-2xs">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                    )}

                    <div className="p-2.5 px-3.5 bg-white border border-neutral-200/80 rounded-xl inline-block">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                        Typical Timeline
                      </span>
                      <p className="text-black font-medium text-xs sm:text-sm">{service.timeline}</p>
                    </div>
                  </div>

                  {/* Right: Deliverables + Stack (7 cols) */}
                  <div className="lg:col-span-7 lg:pl-4">
                    <div className="grid sm:grid-cols-2 gap-6 bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/80 shadow-2xs">
                      <div>
                        <h3
                          className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3"
                          style={{
                            fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                          }}
                        >
                          What&apos;s Included
                        </h3>
                        <ul className="space-y-2">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-neutral-700 font-normal"
                            >
                              <span className="w-3.5 h-3.5 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2 h-2" />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3
                          className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3"
                          style={{
                            fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                          }}
                        >
                          Production Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {service.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-medium text-neutral-700 bg-neutral-50 rounded-full border border-neutral-200 shadow-2xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
