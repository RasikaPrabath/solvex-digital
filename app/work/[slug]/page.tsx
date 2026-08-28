import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowRight } from "lucide-react";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import { projects } from "@/content/projects";
import Link from "next/link";

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Enterprise Case Study | Solvex`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Hero */}
        <div className="mb-12">
          <div className="mb-3.5">
            <Badge tier={project.tier} />
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-black tracking-[-0.025em] mb-4 leading-tight"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
            }}
          >
            {project.title}
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            {project.tagline}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium text-neutral-800 bg-neutral-100 rounded-full border border-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-6">
            {project.liveUrl && (
              <Button href={project.liveUrl} size="small">
                <ExternalLink className="w-3.5 h-3.5" />
                Live Platform Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="ghost" size="small">
                <GithubIcon />
                View Repository
              </Button>
            )}
          </div>
        </div>

        {/* Hero Showcase Image */}
        <div className="relative w-full h-[280px] sm:h-[450px] lg:h-[540px] rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.05)] mb-16 bg-neutral-100">
          <Image
            src={project.image}
            alt={`${project.title} Production Architecture & UI`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Case Study Content */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2 space-y-12">
            {/* Challenge */}
            <section className="p-8 rounded-3xl bg-neutral-50/50 border border-neutral-200/80">
              <h2
                className="text-xl font-semibold text-black mb-3 tracking-tight"
                style={{
                  fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                }}
              >
                The Operational Challenge
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                {project.challenge}
              </p>
            </section>

            {/* Approach */}
            <section className="p-8 rounded-3xl bg-neutral-50/50 border border-neutral-200/80">
              <h2
                className="text-xl font-semibold text-black mb-3 tracking-tight"
                style={{
                  fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                }}
              >
                Our Engineering Approach
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                {project.approach}
              </p>
            </section>

            {/* Result */}
            <section className="p-8 rounded-3xl bg-neutral-50/50 border border-neutral-200/80">
              <h2
                className="text-xl font-semibold text-black mb-3 tracking-tight"
                style={{
                  fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                }}
              >
                Measurable Impact & Result
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                {project.result}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-7 rounded-3xl border border-neutral-200/80 bg-neutral-50/50 space-y-6">
              <h3
                className="text-base font-semibold text-black tracking-tight"
                style={{
                  fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                }}
              >
                Project Specification
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                    Engagement Type
                  </span>
                  <Badge tier={project.tier} />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                    Production Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium text-neutral-800 bg-white rounded-full border border-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200/60">
                <p className="text-neutral-600 text-xs sm:text-sm mb-4 font-normal">
                  Need a custom solution engineered for your business?
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm rounded-full transition-all duration-200 shadow-xs group"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
