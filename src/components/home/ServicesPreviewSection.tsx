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
    href: "/services#web",
    glow: "34,211,238",
    accent: "text-cyan-400",
    iconBg: "bg-cyan-500/15 border-cyan-400/30 text-cyan-300",
  },
  {
    title: "Mobile experiences",
    desc: "Fluid native-grade apps with realtime sync and resilient offline modes.",
    icon: Smartphone,
    href: "/services#mobile",
    glow: "167,139,250",
    accent: "text-violet-400",
    iconBg: "bg-violet-500/15 border-violet-400/30 text-violet-300",
  },
  {
    title: "Cloud foundations",
    desc: "Kubernetes, IaC, observability, and cost-aware scaling patterns.",
    icon: Cloud,
    href: "/services#cloud",
    glow: "56,189,248",
    accent: "text-sky-400",
    iconBg: "bg-sky-500/15 border-sky-400/30 text-sky-300",
  },
  {
    title: "AI & automation",
    desc: "Agents, retrieval pipelines, and safe rollout with eval harnesses.",
    icon: Brain,
    href: "/services#ai",
    glow: "236,72,153",
    accent: "text-pink-400",
    iconBg: "bg-pink-500/15 border-pink-400/30 text-pink-300",
  },
  {
    title: "Product UX",
    desc: "Design systems, motion, and accessibility baked into every surface.",
    icon: Layers,
    href: "/services#ux",
    glow: "52,211,153",
    accent: "text-emerald-400",
    iconBg: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
  },
  {
    title: "Platform engineering",
    desc: "Golden paths, CI/CD hardening, and developer portals teams love.",
    icon: Cpu,
    href: "/services",
    glow: "251,191,36",
    accent: "text-amber-400",
    iconBg: "bg-amber-500/15 border-amber-400/30 text-amber-300",
  },
];

export function ServicesPreviewSection() {
  return (
    <section className="relative bg-slate-950 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container className="flex flex-col gap-16 md:gap-20">
        <SectionHeading
          eyebrow="Capabilities"
          title="Full-stack craft — from silicon to screen."
          subtitle="Click any capability to learn more. Every card is a discipline."
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={card.href} className="block h-full outline-none">
                <HolographicCard className="h-full" intensity={6} glowColor={card.glow}>
                  <div className="flex flex-col gap-4 p-6 md:p-7">
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${card.iconBg}`}>
                      <card.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-slate-50">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{card.desc}</p>
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
