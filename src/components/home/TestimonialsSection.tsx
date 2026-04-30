"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const quotes = [
  {
    body: "CodeXorr replaced six months of stalled roadmap with a launch-ready platform — telemetry, billing, and UX polish included.",
    name: "Jordan Avery",
    role: "VP Engineering, Northshore Analytics",
    glow: "52,211,153",
    accent: "text-emerald-600",
  },
  {
    body: "Their AI workflow integrated cleanly with SOC2 controls — rare combo of speed and governance discipline.",
    name: "Priya Deshmukh",
    role: "Chief Product Officer, Lattice Freight",
    glow: "124,58,237",
    accent: "text-violet-600",
  },
  {
    body: "Feels like hiring a product team and a cloud SWAT unit at once — exceptional communication cadence.",
    name: "Mateo Silva",
    role: "Founder, Harborloom",
    glow: "236,72,153",
    accent: "text-pink-600",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-x-hidden bg-slate-50 py-12 md:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_0%,rgba(236,72,153,0.06),transparent),radial-gradient(ellipse_45%_35%_at_5%_95%,rgba(167,139,250,0.06),transparent),radial-gradient(ellipse_38%_30%_at_92%_88%,rgba(52,211,153,0.07),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-200/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-200/25 to-transparent" />

      <Container className="flex flex-col gap-8 md:gap-10 lg:gap-11">
        <SectionHeading
          eyebrow="Proof"
          title="Teams ship faster when engineering feels unfairly good."
          subtitle="A snapshot of partner feedback — anonymized details available under NDA."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(i, 2) * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <HolographicCard className="flex h-full flex-col" glowColor={q.glow} intensity={5}>
                <div className="relative flex h-full flex-col gap-5 p-6 md:p-8">
                  <Quote className={`h-7 w-7 opacity-70 ${q.accent}`} aria-hidden />
                  <p className="flex-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                    &ldquo;{q.body}&rdquo;
                  </p>
                  <div className="flex flex-col gap-1 border-t border-slate-200 pt-4">
                    <span className="text-sm font-semibold text-slate-900">{q.name}</span>
                    <span className="text-xs text-slate-500">{q.role}</span>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
