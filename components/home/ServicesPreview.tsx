"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceCard from "@/components/shared/ServiceCard";
import { services } from "@/content/services";

export default function ServicesPreview() {
  const previewServices = services.slice(0, 3);

  return (
    <motion.section
      className="py-8 sm:py-16 md:py-20 bg-white"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
