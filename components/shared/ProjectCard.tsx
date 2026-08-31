import Link from "next/link";
import Image from "next/image";
import Badge from "./Badge";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-2xl border border-neutral-200/80 bg-white overflow-hidden hover:border-black/20 hover:shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-neutral-100">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6">
        <div className="mb-3">
          <Badge tier={project.tier} />
        </div>
        <h3
          className="text-lg font-bold mb-1.5 text-black tracking-tight"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
            fontWeight: 700,
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-neutral-600 text-sm leading-relaxed mb-4 font-normal"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
          }}
        >
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs font-medium text-neutral-700 bg-neutral-50 rounded-full border border-neutral-200 shadow-2xs"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
