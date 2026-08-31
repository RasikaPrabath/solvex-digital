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
      className="py-20 border-t border-neutral-100 bg-white"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeading
          eyebrow="Our work"
          title="Projects we've built"
          subtitle="Real problems, real solutions. Here's a look at what we've been working on."
        />

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
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
