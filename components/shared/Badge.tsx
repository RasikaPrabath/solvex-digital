import { ProjectTier } from "@/lib/types";

interface BadgeProps {
  tier: ProjectTier;
  className?: string;
}

const tierConfig: Record<ProjectTier, { label: string; classes: string }> = {
  client: {
    label: "Client Work",
    classes: "bg-accent text-white",
  },
  internal: {
    label: "Internal Product",
    classes: "bg-accent-soft text-accent border border-accent/20",
  },
  concept: {
    label: "Concept Project",
    classes: "bg-transparent text-muted border border-line font-mono",
  },
};

export default function Badge({ tier, className = "" }: BadgeProps) {
  const config = tierConfig[tier];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md tracking-wide uppercase ${config.classes} ${className}`}
    >
      {config.label}
    </span>
  );
}
