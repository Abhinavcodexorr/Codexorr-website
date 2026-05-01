"use client";

import { Cpu, LineChart, ShieldCheck, Sparkles, Timer, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const CELLS = [
  {
    icon: Cpu,
    title: "Architecture with receipts",
    body: "Every decision logged — observable systems, reproducible deployments, humane on-call posture.",
    className: "md:col-span-2 lg:col-span-2 md:min-h-[196px]",
  },
  {
    icon: LineChart,
    title: "Metrics anchored to ROI",
    body: "We instrument before we decorate — KPIs ladders from activation to infra spend clarity.",
    className: "",
  },
  {
    icon: ShieldCheck,
    title: "Security-informed craft",
    body: "SOC-friendly defaults: identity, secrets, tenancy, audit trails wired into delivery.",
    className: "",
  },
  {
    icon: Sparkles,
    title: "AI that survives Monday",
    body: "Evaluation harnesses, grounded UX, escalation paths — not demo-only hallucination theatre.",
    className: "md:col-span-2",
  },
  {
    icon: Timer,
    title: "Predictable pacing",
    body: "Bands not brittle dates — leadership sees trade-offs weekly, churn drops.",
    className: "",
  },
  {
    icon: Users,
    title: "Pods, not outsiders",
    body: "Senior engineers pairing in your repos, rituals, paging policies — KT is the deliverable.",
    className: "md:col-span-2 lg:col-span-1",
  },
] as const;

export function WhyUsBentoSection() {
  return (
    <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-slate-50/92 via-white to-slate-50/75 py-[88px] md:py-24 lg:py-[120px]">
      <Container className="flex flex-col gap-14 md:gap-16 lg:gap-[4.75rem]">
        <SectionHeading
          eyebrow="Why CodeXorr"
          title="The premium difference is restraint + rigor."
          subtitle="Quiet confidence from senior ownership — luminous interfaces backed by infra thinking, evaluations, and operator empathy."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-52px", amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CELLS.map((cell, i) => {
            const Icon = cell.icon;
            return (
              <motion.article
                key={cell.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
                  },
                }}
                whileHover={{ y: -4, transition: { duration: 0.26 } }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-slate-200/92 bg-white/98 p-7 shadow-[0_26px_80px_-54px_rgba(15,23,42,0.18)]",
                  "backdrop-blur-sm transition-[box-shadow,border-color] duration-300 hover:border-teal-200 hover:shadow-[0_42px_100px_-48px_rgba(20,184,166,0.16)]",
                  cell.className,
                )}
              >
                <Icon className="mb-4 h-[22px] w-[22px] text-teal-600" aria-hidden />
                <h3 className="font-heading text-lg font-semibold text-slate-900">{cell.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{cell.body}</p>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-28 -right-28 h-[200px] w-[200px] rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-110"
                  style={{
                    background:
                      i % 2 === 0
                        ? "radial-gradient(circle at center,rgba(34,211,238,0.15),transparent 68%)"
                        : "radial-gradient(circle at center,rgba(167,139,250,0.15),transparent 68%)",
                  }}
                />
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
