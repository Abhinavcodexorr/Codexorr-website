"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stack = [
  { label: "Next.js", hover: "hover:bg-cyan-500/20 hover:text-cyan-100 hover:border-cyan-400/40" },
  { label: "TypeScript", hover: "hover:bg-blue-500/20 hover:text-blue-100 hover:border-blue-400/40" },
  { label: "Kubernetes", hover: "hover:bg-cyan-500/20 hover:text-cyan-100 hover:border-cyan-400/40" },
  { label: "Terraform", hover: "hover:bg-violet-500/20 hover:text-violet-100 hover:border-violet-400/40" },
  { label: "PostgreSQL", hover: "hover:bg-sky-500/20 hover:text-sky-100 hover:border-sky-400/40" },
  { label: "Redis", hover: "hover:bg-red-500/20 hover:text-red-100 hover:border-red-400/40" },
  { label: "AWS · GCP", hover: "hover:bg-amber-500/20 hover:text-amber-100 hover:border-amber-400/40" },
  { label: "GraphQL · tRPC", hover: "hover:bg-pink-500/20 hover:text-pink-100 hover:border-pink-400/40" },
  { label: "OpenTelemetry", hover: "hover:bg-emerald-500/20 hover:text-emerald-100 hover:border-emerald-400/40" },
  { label: "TensorFlow · PyTorch", hover: "hover:bg-orange-500/20 hover:text-orange-100 hover:border-orange-400/40" },
  { label: "Figma", hover: "hover:bg-fuchsia-500/20 hover:text-fuchsia-100 hover:border-fuchsia-400/40" },
];

export function TechStackSection() {
  return (
    <section className="relative bg-slate-950 py-14 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(34,211,238,0.05),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading
          eyebrow="Engineering"
          title="Battle-tested stack. Opinionated where it matters."
          subtitle="We choose boring-at-scale primitives — then tune obsessively for latency, resilience, and developer velocity."
        />

        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 md:gap-4">
          {stack.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.03, ease: "easeOut" }}
              className={`cursor-default rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-300 shadow-none transition-all duration-250 ${item.hover} md:px-5 md:py-2.5 md:text-xs md:tracking-[0.18em]`}
            >
              {item.label}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
