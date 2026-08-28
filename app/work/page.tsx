import type { Metadata } from "next";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Featured Case Studies | Solvex",
  description:
    "Case studies and enterprise systems engineered by Solvex — custom business platforms, scalable cloud web apps, and mobile systems.",
};

export default function WorkPage() {
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
            Client Work & Case Studies
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-black tracking-[-0.025em] mb-4 leading-snug"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
            }}
          >
            Projects engineered for scale
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
            A portfolio of production platforms, enterprise internal tools, and high-impact digital systems. Every solution built to solve measurable operational bottlenecks.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
