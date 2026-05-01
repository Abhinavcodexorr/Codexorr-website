"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Kubernetes",
  "Terraform",
  "AWS · GCP · Azure",
  "LangGraph · OpenAI SDK",
  "OpenTelemetry · Grafana",
];

function BadgeMotion({ label, variant = "dark" }: { label: string; variant?: "dark" | "light" }) {
  const isDark = variant === "dark";
  return (
    <motion.li
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "shrink-0 rounded-full border px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm transition-colors",
        isDark
          ? "border-white/[0.12] bg-white/[0.05] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-cyan-400/40 hover:text-cyan-200"
          : "border-slate-200/95 bg-white/95 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_14px_40px_-38px_rgba(15,23,42,0.2)] hover:border-teal-200 hover:text-teal-800",
      )}
    >
      {label}
    </motion.li>
  );
}

export function HomeTechStripSection() {
  const loop = [...stack, ...stack];

  return (
    <section className="section-band-dark relative overflow-hidden border-b border-white/10 py-[72px] md:py-[92px] lg:py-[104px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] dot-grid-dark" />

      <Container className="relative flex flex-col gap-12 lg:gap-14">
        <SectionHeading
          eyebrow="Stack"
          title="Toolkit we converge on early — swaps happen with intent."
          subtitle="We standardise thoughtfully: boring primitives that scale; sharp edges confined to differentiated layers."
          align="center"
          theme="dark"
        />

        <div className="relative pb-2 pt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0b1220] to-transparent md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0b1220] to-transparent md:hidden" />

          <div className="overflow-hidden md:hidden">
            <ul className="motion-safe:home-tech-marquee flex w-max shrink-0 gap-3 pr-14" aria-label="Technology badges">
              {loop.map((label, idx) => (
                <BadgeMotion key={`m-${label}-${idx}`} label={label} variant="dark" />
              ))}
            </ul>
          </div>

          <ul className="hidden flex-wrap justify-center gap-3 md:flex lg:gap-4" aria-label="Technology badges">
            {stack.map((label) => (
              <BadgeMotion key={label} label={label} variant="dark" />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
