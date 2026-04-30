"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const blocks = [
  {
    id: "web",
    title: "Web development",
    eyebrow: "Platforms",
    body: "Composable Next.js frontends, resilient API layers, and edge-aware routing — tuned for Core Web Vitals, accessibility, and measurable conversion lift.",
    bullets: [
      "Design systems codified in Storybook · tokens · accessibility audits.",
      "SSR/ISR strategies aligned with SEO + personalization requirements.",
      "Observability hooks from day one — OpenTelemetry, structured logs, traces.",
    ],
    glow: "34,211,238",
    accent: "from-cyan-500/15 to-sky-600/5",
  },
  {
    id: "mobile",
    title: "Mobile apps",
    eyebrow: "Product-grade",
    body: "Fluid native-grade experiences with realtime sync, resilient offline modes, and analytics instrumentation aligned with privacy commitments.",
    bullets: [
      "React Native / Kotlin / Swift — pragmatic picks per surface criticality.",
      "Push · deeplinks · feature flags baked into release trains.",
      "Crash analytics + performance budgets enforced in CI.",
    ],
    glow: "167,139,250",
    accent: "from-violet-500/15 to-fuchsia-600/5",
  },
  {
    id: "cloud",
    title: "Cloud",
    eyebrow: "Foundations",
    body: "Kubernetes platforms with Terraform-driven infra, progressive delivery, and FinOps-aware scaling policies — boring where it counts.",
    bullets: [
      "Multi-account hygiene · IAM least-privilege · secrets rotation.",
      "Golden paths for services — templates, paved-road CI/CD.",
      "Incident tooling — SLOs, paging policies, blameless reviews.",
    ],
    glow: "56,189,248",
    accent: "from-sky-500/15 to-cyan-600/5",
  },
  {
    id: "ai",
    title: "AI / Automation",
    eyebrow: "Operational intelligence",
    body: "Retrieval pipelines, AI copilots, and workflow automation that integrate cleanly with governance requirements — eval harnesses, red-teaming, audit trails.",
    bullets: [
      "Grounded answers with citation-aware UX — no mystery hallucinations in prod.",
      "Human-in-the-loop workflows where stakes demand oversight.",
      "Batch + realtime inference patterns sized for cost envelopes.",
    ],
    glow: "244,114,182",
    accent: "from-pink-500/15 to-violet-600/5",
  },
  {
    id: "ux",
    title: "UI / UX",
    eyebrow: "Signature craft",
    body: "Interfaces that feel cinematic yet restrained — motion systems, keyboard-first flows, and WCAG-aligned patterns shipped alongside engineering.",
    bullets: [
      "UX research slices embedded into weekly demos.",
      "Interaction prototypes — code-first where possible.",
      "Brand systems translated into resilient components.",
    ],
    glow: "52,211,153",
    accent: "from-emerald-500/15 to-cyan-600/5",
  },
];

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ServicesContent() {
  return (
    <div className="flex flex-1 flex-col py-20 md:py-28">
      <Container className="flex flex-col gap-20 md:gap-28">
        <SectionHeading
          eyebrow="Services"
          title="Capability depth — without the enterprise drag."
          subtitle="Each practice area pairs principal engineers with design partners so strategy, architecture, and UX evolve together."
        />

        <div className="flex flex-col gap-16 md:gap-20">
          {blocks.map((b) => (
            <section key={b.id} id={b.id} className="scroll-mt-28">
              <motion.div
                variants={cardReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              >
                <HolographicCard intensity={5} glowColor={b.glow} className="overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${b.accent}`} />
                  <div className="relative flex flex-col gap-6 p-8 md:p-12">
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400/90">{b.eyebrow}</span>
                    <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-[2.25rem] md:leading-[1.15]">
                      {b.title}
                    </h2>
                    <p className="max-w-3xl text-base leading-relaxed text-slate-400 md:text-lg">{b.body}</p>
                    <ul className="mt-4 flex max-w-3xl flex-col gap-4 border-t border-white/[0.08] pt-8">
                      {b.bullets.map((li) => (
                        <li
                          key={li}
                          className="flex gap-3 text-sm leading-relaxed text-slate-300 md:text-[15px]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </HolographicCard>
              </motion.div>
            </section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 py-8 text-center"
        >
          <p className="text-lg text-slate-400">Ready to scope your project with a senior architect?</p>
          <Button href="/contact" className="min-w-[220px]">
            Book a discovery session
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}
