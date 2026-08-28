"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = icons[service.icon] || LucideIcons.Code;

  return (
    <Link
      href={`/services#${service.slug}`}
      className="group block p-7 rounded-2xl border border-neutral-200/80 bg-white hover:border-black/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 relative flex flex-col justify-between h-full"
    >
      <div>
        <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center mb-5 group-hover:bg-black group-hover:text-white transition-all duration-200 text-neutral-800">
          <IconComponent className="w-5 h-5 transition-colors" />
        </div>
        <h3
          className="text-lg font-semibold mb-2 text-black tracking-tight"
          style={{
            fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 600,
          }}
        >
          {service.title}
        </h3>
        <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-normal">
          {service.tagline}
        </p>
      </div>

      <span
        className="inline-flex items-center gap-1.5 text-black text-xs sm:text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
        style={{
          fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <span>Learn more</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
