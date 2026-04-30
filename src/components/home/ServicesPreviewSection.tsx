"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Cloud, Code2, Cpu, Layers, Smartphone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cards = [
  {
    title: "Web platforms",
    desc: "Composable Next.js frontends, edge-ready APIs, and measurable Core Web Vitals.",
    icon: Code2,
    href: "/services/web",
    glow: "34,211,238",
    accent: "text-cyan-700",
    iconBg: "bg-cyan-50 border-cyan-200 text-cyan-600",
  },
  {
    title: "Mobile experiences",
    desc: "Fluid native-grade apps with realtime sync and resilient offline modes.",
    icon: Smartphone,
    href: "/services/mobile",
    glow: "167,139,250",
    accent: "text-violet-700",
    iconBg: "bg-violet-50 border-violet-200 text-violet-600",
  },
  {
    title: "Cloud foundations",
    desc: "Kubernetes, IaC, observability, and cost-aware scaling patterns.",
    icon: Cloud,
    href: "/services/cloud",
    glow: "56,189,248",
    accent: "text-sky-700",
    iconBg: "bg-sky-50 border-sky-200 text-sky-600",
  },
  {
    title: "AI & automation",
    desc: "Agents, retrieval pipelines, and safe rollout with eval harnesses.",
    icon: Brain,
    href: "/services/ai",
    glow: "236,72,153",
    accent: "text-pink-700",
    iconBg: "bg-pink-50 border-pink-200 text-pink-600",
  },
  {
    title: "Product UX",
    desc: "Design systems, motion, and accessibility baked into every surface.",
    icon: Layers,
    href: "/services/ux",
    glow: "52,211,153",
    accent: "text-emerald-700",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
  },
  {
    title: "Platform engineering",
    desc: "Golden paths, CI/CD hardening, and developer portals teams love.",
    icon: Cpu,
    href: "/services",
    glow: "251,191,36",
    accent: "text-amber-700",
    iconBg: "bg-amber-50 border-amber-200 text-amber-600",
  },
];

export function ServicesPreviewSection() {
  return (
    <section className="relative bg-white py-14 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <Container className="flex flex-col gap-10 md:gap-16 lg:gap-20">
        <SectionHeading
          eyebrow="Capabilities"
          title="Full-stack craft — from silicon to screen."
          subtitle="Click any capability to dive into the discipline. Each pairs senior engineers with design partners."
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={card.href} className="block h-full outline-none">
                <HolographicCard className="h-full" intensity={5} glowColor={card.glow}>
                  <div className="flex h-full flex-col gap-3 p-5 md:p-7">
                    <div
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${card.iconBg}`}
                    >
                      <card.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{card.desc}</p>
                    <span
                      className={`mt-auto inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-[0.18em] ${card.accent}`}
                    >
                      Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </HolographicCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
