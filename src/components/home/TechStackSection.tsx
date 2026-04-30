"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stack = [
  { label: "Next.js", hover: "hover:border-slate-900 hover:bg-slate-900 hover:text-white" },
  { label: "TypeScript", hover: "hover:border-blue-500 hover:bg-blue-500 hover:text-white" },
  { label: "Kubernetes", hover: "hover:border-cyan-500 hover:bg-cyan-500 hover:text-white" },
  { label: "Terraform", hover: "hover:border-violet-500 hover:bg-violet-500 hover:text-white" },
  { label: "PostgreSQL", hover: "hover:border-sky-500 hover:bg-sky-500 hover:text-white" },
  { label: "Redis", hover: "hover:border-red-500 hover:bg-red-500 hover:text-white" },
  { label: "AWS · GCP", hover: "hover:border-amber-500 hover:bg-amber-500 hover:text-white" },
  { label: "GraphQL · tRPC", hover: "hover:border-pink-500 hover:bg-pink-500 hover:text-white" },
  { label: "OpenTelemetry", hover: "hover:border-emerald-500 hover:bg-emerald-500 hover:text-white" },
  { label: "TensorFlow · PyTorch", hover: "hover:border-orange-500 hover:bg-orange-500 hover:text-white" },
  { label: "Figma", hover: "hover:border-fuchsia-500 hover:bg-fuchsia-500 hover:text-white" },
];

export function TechStackSection() {
  return (
    <section className="relative bg-white py-12 md:py-16 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(16,185,129,0.055),transparent_60%),radial-gradient(ellipse_40%_35%_at_8%_20%,rgba(52,211,153,0.06),transparent_50%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-200/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-200/30 to-transparent" />

      <Container className="flex flex-col gap-8 md:gap-10">
        <SectionHeading
          eyebrow="Engineering"
          title="Battle-tested stack. Opinionated where it matters."
          subtitle="We choose boring-at-scale primitives — then tune obsessively for latency, resilience, and developer velocity."
        />

        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2 md:gap-3 lg:gap-4">
          {stack.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-44px" }}
              transition={{ duration: 0.35, delay: Math.min(i, 6) * 0.04, ease: "easeOut" }}
              className={`cursor-default rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-700 shadow-sm transition-all duration-300 ${item.hover} md:px-5 md:py-2.5 md:text-xs md:tracking-[0.18em]`}
            >
              {item.label}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
