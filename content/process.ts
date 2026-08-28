import { ProcessStep } from "@/lib/types";

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Discover",
    description:
      "We start by understanding your business — not just your feature wishlist. We map your current workflows, identify bottlenecks, and figure out where software can make the biggest impact. This phase includes stakeholder interviews, process documentation, and a clear project brief that both sides agree on before any code is written.",
  },
  {
    number: 2,
    title: "Design",
    description:
      "We translate the discovery findings into wireframes, user flows, and a visual design that matches your brand. You'll see interactive prototypes and have the chance to test the interface before we build it. We iterate quickly here — it's far cheaper to change a Figma file than production code.",
  },
  {
    number: 3,
    title: "Develop",
    description:
      "We build your product in focused sprints, shipping working software every one to two weeks. You'll have access to a staging environment from day one, so you can see real progress — not just status updates. Our stack is modern but proven: React, Next.js, .NET, Node.js, and PostgreSQL.",
  },
  {
    number: 4,
    title: "Test",
    description:
      "Every feature is tested before it reaches you. We run automated tests, manual QA, and cross-device checks to catch bugs early. We also do a structured user acceptance testing phase where your team validates that the software actually works in your real-world environment.",
  },
  {
    number: 5,
    title: "Deploy",
    description:
      "We handle the full deployment pipeline — cloud infrastructure, CI/CD, SSL, monitoring, and backups. Your software goes live with confidence, not crossed fingers. After launch, we provide a support period to handle any issues and ensure a smooth handover to your team.",
  },
];
