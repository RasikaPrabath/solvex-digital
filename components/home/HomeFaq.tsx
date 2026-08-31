"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const faqs = [
  {
    question: "How fast can we kick off and what is the typical delivery timeline?",
    answer:
      "We can usually initiate discovery within 3-5 business days. Typical MVPs and focused enterprise modules deploy to production within 4 to 8 weeks through iterative 2-week sprints with weekly live demo checkpoints.",
  },
  {
    question: "Do we own 100% of the code and intellectual property?",
    answer:
      "Yes, absolutely. Upon milestone completion, 100% of the source code, repository commits, design assets, and cloud infrastructure belong exclusively to your company. There are no licensing fees or proprietary locks.",
  },
  {
    question: "How do you ensure enterprise security and data privacy?",
    answer:
      "We adhere to strict SOC2 and GDPR compliance guidelines. All projects execute under mutual Non-Disclosure Agreements (NDAs), with isolated production environments, role-based access control (RBAC), and automated vulnerability testing.",
  },
  {
    question: "How does the engagement and pricing model work?",
    answer:
      "We offer milestone-based fixed pricing for clearly scoped deliverables, as well as dedicated monthly senior engineering retainers for continuous product scaling. You will never encounter hidden surprise costs.",
  },
  {
    question: "What happens after the product goes live in production?",
    answer:
      "Every project includes a comprehensive 30-day post-launch warranty and SLA support period. We also offer dedicated ongoing SLA maintenance, performance monitoring, and team onboarding.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <motion.section
      className="py-16 sm:py-24 bg-neutral-50/40 border-t border-neutral-100"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="max-w-[960px] mx-auto px-6">
        <SectionHeading
          eyebrow="Questions & Answers"
          title="Everything you need to know"
          subtitle="Clear answers regarding our delivery framework, security standards, and partnership terms."
          align="center"
        />

        <div className="space-y-3 mt-8">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.25, 1, 0.5, 1] }}
                className="rounded-2xl border border-neutral-200/80 bg-white overflow-hidden transition-all duration-300 shadow-2xs hover:border-black/20 hover:shadow-md"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-black cursor-pointer"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  }}
                >
                  <span className="text-[15px] sm:text-base font-bold">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-black" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div
                        className="px-6 pb-5 pt-1 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
