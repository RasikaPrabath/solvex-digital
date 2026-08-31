"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceCard from "@/components/shared/ServiceCard";
import { services } from "@/content/services";

export default function ServicesPreview() {
  const previewServices = services.slice(0, 3);

  return (
    <motion.section
      className="py-12 sm:py-18 md:py-22 bg-white"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Software that fits your business"
          subtitle="We don't sell hours. We solve problems. Here's where we focus."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewServices.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
