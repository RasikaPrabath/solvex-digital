import type { Metadata } from "next";
import { Mail, MessageCircle, ShieldCheck, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Initiate Consultation | Solvex",
  description:
    "Schedule an enterprise software consultation with Solvex. Tell us about your project requirements and we will respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Page Header */}
        <div className="mb-14 max-w-2xl">
          <span
            className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-2.5"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Start an Engagement
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-black tracking-[-0.025em] mb-4 leading-snug"
            style={{
              fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
            }}
          >
            Let&apos;s talk about your project
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
            Fill out the consultation form below or reach out directly. No sales push — just a strategic discussion regarding your requirements and architecture.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">
          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-7 rounded-3xl border border-neutral-200/80 bg-neutral-50/50 sticky top-28 space-y-5">
              <h3
                className="text-base font-semibold text-black tracking-tight"
                style={{
                  fontFamily: "'Inter Tight', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                }}
              >
                Direct Channels
              </h3>

              <div className="space-y-3">
                <a
                  href="mailto:hello@solvex.dev"
                  className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-neutral-200/80 hover:border-black transition-colors group shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Email
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-black">hello@solvex.dev</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-neutral-200/80 hover:border-black transition-colors group shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block">
                      WhatsApp
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-black">Direct Chat</span>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 space-y-2.5 text-xs text-neutral-600 font-normal">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Guaranteed response within 24 hours.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Mutual NDA protected inquiry.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
