"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/shared/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const projectTypes = [
  "Business Process Software",
  "Custom Web Application",
  "Mobile App Development",
  "API & Cloud Architecture",
  "UI/UX Design System",
  "Enterprise Maintenance & SLA",
  "Other / Custom Inquiry",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure / Discuss scope",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl border border-neutral-200/80 bg-neutral-50/50 text-center">
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3
          className="text-xl font-semibold mb-2 text-black tracking-tight"
          style={{
            fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 600,
          }}
        >
          Consultation Request Received
        </h3>
        <p className="text-neutral-600 text-sm max-w-md mx-auto leading-relaxed font-normal">
          Thank you for reaching out. A senior software architect will review your project requirements and respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name & Email Row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1.5"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 bg-white text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1.5"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Work Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 bg-white text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            placeholder="john@company.com"
          />
        </div>
      </div>

      {/* Project Type & Budget Row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="project-type"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1.5"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Project Type
          </label>
          <select
            id="project-type"
            name="project-type"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 bg-white text-black text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all cursor-pointer appearance-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select project scope
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="budget"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1.5"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Anticipated Budget
          </label>
          <select
            id="budget"
            name="budget"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 bg-white text-black text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all cursor-pointer appearance-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select estimated budget
            </option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1.5"
          style={{
            fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          Project Details & Objectives
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 bg-white text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none"
          placeholder="Briefly describe your business process or the software you want to build..."
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          style={{
            fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <span>Submit Consultation Request</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}
