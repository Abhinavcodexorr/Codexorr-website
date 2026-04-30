"use client";

import { useRef } from "react";
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
    glow: "6,182,212",
    accent: "text-cyan-400",
  },
  {
    body: "Their AI workflow integrated cleanly with SOC2 controls — rare combo of speed and governance discipline.",
    name: "Priya Deshmukh",
    role: "Chief Product Officer, Lattice Freight",
    glow: "124,58,237",
    accent: "text-violet-400",
  },
  {
    body: "Feels like hiring a product team and a cloud SWAT unit at once — exceptional communication cadence.",
    name: "Mateo Silva",
    role: "Founder, Harborloom",
    glow: "236,72,153",
    accent: "text-pink-400",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-slate-950 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_0%,rgba(236,72,153,0.07),transparent),radial-gradient(ellipse_45%_35%_at_5%_95%,rgba(167,139,250,0.06),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container className="flex flex-col gap-14 md:gap-16">
        <SectionHeading
          eyebrow="Proof"
          title="Teams ship faster when engineering feels unfairly good."
          subtitle="A snapshot of partner feedback — anonymized details available under NDA."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <HolographicCard className="flex h-full flex-col" glowColor={q.glow} intensity={7}>
                <div className="relative flex h-full flex-col gap-6 p-8">
                  <Quote className={`h-7 w-7 opacity-60 ${q.accent}`} aria-hidden />
                  <p className="flex-1 text-sm leading-relaxed text-slate-400 md:text-[15px]">
                    &ldquo;{q.body}&rdquo;
                  </p>
                  <div className="flex flex-col gap-1 border-t border-white/10 pt-5">
                    <span className="text-sm font-semibold text-slate-100">{q.name}</span>
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
