"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Cloud,
  Code2,
  Cpu,
  Layers,
  Smartphone,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";

const ServicesPreview3D = dynamic(
  () =>
    import("@/components/three/ServicesPreview3D").then((m) => m.ServicesPreview3D),
  { ssr: false },
);

const cards = [
  {
    title: "Web platforms",
    desc: "Composable Next.js frontends, edge-ready APIs, and measurable Core Web Vitals.",
    icon: Code2,
    href: "/services#web",
    glow: "34,211,238",
    accent: "text-cyan-600",
    iconBg: "bg-cyan-50 border-cyan-200 text-cyan-600",
  },
  {
    title: "Mobile experiences",
    desc: "Fluid native-grade apps with realtime sync and resilient offline modes.",
    icon: Smartphone,
    href: "/services#mobile",
    glow: "167,139,250",
    accent: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-200 text-violet-600",
  },
  {
    title: "Cloud foundations",
    desc: "Kubernetes, IaC, observability, and cost-aware scaling patterns.",
    icon: Cloud,
    href: "/services#cloud",
    glow: "56,189,248",
    accent: "text-sky-600",
    iconBg: "bg-sky-50 border-sky-200 text-sky-600",
  },
  {
    title: "AI & automation",
    desc: "Agents, retrieval pipelines, and safe rollout with eval harnesses.",
    icon: Brain,
    href: "/services#ai",
    glow: "236,72,153",
    accent: "text-pink-600",
    iconBg: "bg-pink-50 border-pink-200 text-pink-600",
  },
  {
    title: "Product UX",
    desc: "Design systems, motion, and accessibility baked into every surface.",
    icon: Layers,
    href: "/services#ux",
    glow: "52,211,153",
    accent: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
  },
  {
    title: "Platform engineering",
    desc: "Golden paths, CI/CD hardening, and developer portals teams love.",
    icon: Cpu,
    href: "/services",
    glow: "251,191,36",
    accent: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-200 text-amber-600",
  },
];

export function ServicesPreviewSection() {
  return (
    <section className="relative bg-white py-28 md:py-36">
      {/* top border line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      {/* bottom border line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <Container className="flex flex-col gap-16 md:gap-20">
        <SectionHeading
          theme="light"
          eyebrow="Capabilities"
          title="Full-stack craft — from silicon to screen."
          subtitle="Hover the canvas, tilt the cards, and click to jump into each capability. Every shape is a discipline."
        />

        {/* 3D canvas in a dark window panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg"
        >
          <ServicesPreview3D />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link href={card.href} className="block h-full outline-none">
                <HolographicCard
                  className="h-full overflow-hidden"
                  theme="light"
                  intensity={7}
                  glowColor={card.glow}
                >
                  <div className="relative flex flex-col gap-4 p-6 md:p-7">
                    <div
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${card.iconBg} transition-all duration-300`}
                    >
                      <card.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {card.desc}
                    </p>
                    <span
                      className={`mt-auto inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${card.accent}`}
                    >
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
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
