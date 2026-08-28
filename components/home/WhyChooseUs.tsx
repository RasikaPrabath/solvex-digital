"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Clock, Award, Code2, Lock } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const pillars = [
  {
    icon: Users,
    title: "100% Senior In-House Team",
    description:
      "No outsourced contractors or junior handoffs. You work directly with veteran software architects who design and write every single line of code.",
  },
  {
    icon: Clock,
    title: "Fixed-Timeline Sprint Delivery",
    description:
      "We operate in 2-week transparent agile sprints with live production builds, so you always see measurable progress without delays.",
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Security & NDA",
    description:
      "Strict data isolation, encryption at rest and in transit, role-based access control, and complete NDA protection from day one.",
  },
  {
    icon: Code2,
    title: "Complete Code & IP Ownership",
    description:
      "You retain 100% ownership of all source code, design systems, infrastructure blueprints, and intellectual property without vendor lock-in.",
  },
  {
    icon: ShieldCheck,
    title: "Production SLA & 24/7 Support",
    description:
      "Enterprise SLA guarantees with 99.9% uptime targets, continuous monitoring, and structured post-launch warranty maintenance.",
  },
  {
    icon: Award,
    title: "Modern Tech Architecture",
    description:
      "Engineered on battle-tested frameworks including Next.js, React, Node.js, .NET, PostgreSQL, and scalable AWS cloud infrastructure.",
  },
];

export default function WhyChooseUs() {
  return (
    <motion.section
      className="py-14 sm:py-18 bg-white border-t border-neutral-100"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeading
          eyebrow="Why Solvex"
          title="Engineered for high-stakes enterprise demands"
          subtitle="We combine the speed of an elite agile studio with the rigor and security required by enterprise organizations."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-7 rounded-2xl border border-neutral-200/80 bg-neutral-50/40 hover:bg-white hover:border-black/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mb-5 text-black group-hover:bg-black group-hover:text-white transition-all duration-200 shadow-2xs">
                  <pillar.icon className="w-4.5 h-4.5 transition-colors" />
                </div>
                <h3
                  className="text-base sm:text-lg font-semibold text-black mb-2 tracking-tight"
                  style={{
                    fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {pillar.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
