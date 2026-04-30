"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const milestones = [
  {
    year: "2018",
    title: "Foundations",
    body: "Senior engineers band together after scaling infra at hyperscale — CodeXorr born as a specialist delivery unit.",
    glow: "34,211,238",
  },
  {
    year: "2020",
    title: "Cloud-native maturity",
    body: "Kubernetes + IaC engagements replace lift-and-shift chaos — golden paths become our signature.",
    glow: "56,189,248",
  },
  {
    year: "2022",
    title: "AI copilots arrive",
    body: "Retrieval pipelines with governance harnesses — enterprise AI without mystery outages.",
    glow: "167,139,250",
  },
  {
    year: "2025",
    title: "Global studio footprint",
    body: "Distributed pods across NA · EU · APAC — follow-the-sun delivery without hero culture burnout.",
    glow: "244,114,182",
  },
];

export function AboutContent() {
  return (
    <div className="flex flex-1 flex-col py-8 md:py-12 lg:py-16">
      <Container className="flex flex-col gap-8 md:gap-12 lg:gap-16">
        <SectionHeading
          eyebrow="Company"
          title="Precision engineering for ambitious roadmaps."
          subtitle="We're not a volume shop — each engagement gets architects who've shipped under pressure and refuse to hide behind tickets."
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <HolographicCard intensity={6} glowColor="34,211,238">
              <div className="relative flex flex-col gap-5 p-6 md:p-10">
                <h2 className="font-heading text-2xl font-semibold text-slate-900 md:text-3xl">Mission</h2>
                <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                  Empower organizations to launch differentiated digital products — with reliability, accessibility, and measurable
                  outcomes baked into every release.
                </p>
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.07 }}
          >
            <HolographicCard intensity={6} glowColor="167,139,250">
              <div className="relative flex flex-col gap-5 p-6 md:p-10">
                <h2 className="font-heading text-2xl font-semibold text-slate-900 md:text-3xl">Vision</h2>
                <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                  Become the default engineering partner for teams who ship AI-native experiences without sacrificing trust —
                  security, observability, and craft on day one.
                </p>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 md:gap-10">
          <SectionHeading
            eyebrow="Timeline"
            title="A steady arc — no overnight hype."
            subtitle="Milestones from our journey building resilient platforms with partner teams across industries."
          />

          <div className="relative mx-auto w-full max-w-3xl">
            <motion.div
              aria-hidden
              className="absolute left-[11px] top-2 hidden h-[calc(100%-16px)] w-px origin-top bg-gradient-to-b from-cyan-400/80 via-violet-400/70 to-pink-400/80 md:block"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            />

            <ul className="flex flex-col gap-8 md:gap-10">
              {milestones.map((m, i) => (
                <motion.li
                  key={m.year}
                  className="relative grid gap-4 md:grid-cols-[92px_1fr] md:gap-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-4 md:block">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-400/70 bg-white shadow-[0_0_20px_rgba(34,211,238,0.4)] md:mx-auto">
                      <span className="h-2 w-2 rounded-full bg-cyan-500" />
                    </span>
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 md:text-center">
                      {m.year}
                    </span>
                  </div>
                  <HolographicCard intensity={5} glowColor={m.glow}>
                    <div className="relative flex flex-col gap-2 p-5 md:p-8">
                      <h3 className="font-heading text-lg font-semibold text-slate-900 md:text-xl">{m.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">{m.body}</p>
                    </div>
                  </HolographicCard>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
