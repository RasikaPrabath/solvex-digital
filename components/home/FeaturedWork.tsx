"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import Button from "@/components/shared/Button";
import { projects } from "@/content/projects";

export default function FeaturedWork() {
  const featured = projects.slice(0, 2);

  return (
    <motion.section
      className="py-20 border-t border-line"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          eyebrow="Our work"
          title="Projects we've built"
          subtitle="Real problems, real solutions. Here's a look at what we've been working on."
        />

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/work" variant="ghost">
            View all projects
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
