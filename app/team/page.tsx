import type { Metadata } from "next";
import TeamCard from "@/components/shared/TeamCard";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Engineering Leadership | Solvex",
  description:
    "Meet the Solvex senior engineering team — veteran software architects and full-stack engineers dedicated to building custom enterprise systems.",
};

export default function TeamPage() {
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
            Engineering Team
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-black tracking-[-0.025em] mb-4 leading-snug"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
            }}
          >
            The engineers behind Solvex
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
            A small, senior studio. No junior handoffs or account managers in the way — you work directly with the architects who design the systems and write the code.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
