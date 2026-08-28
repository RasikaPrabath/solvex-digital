export type ProjectTier = "client" | "internal" | "concept";

export interface Service {
  slug: string;
  icon: string; // lucide-react icon name
  title: string;
  tagline: string;
  problem: string;
  deliverables: string[];
  stack: string[];
  timeline: string;
  image?: string;
}

export interface Project {
  slug: string;
  title: string;
  tier: ProjectTier;
  tagline: string;
  challenge: string;
  approach: string;
  result: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  skill: string;
  image: string;
  linkedin?: string;
  github?: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}
