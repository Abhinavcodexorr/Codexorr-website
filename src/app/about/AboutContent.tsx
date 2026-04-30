"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const timelineRef = useRef<HTMLUListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-1 flex-col py-20 md:py-28">
      <Container className="flex flex-col gap-16 md:gap-24">
        <SectionHeading
          eyebrow="Company"
          title="Precision engineering for ambitious roadmaps."
          subtitle="We're not a volume shop — each engagement gets architects who've shipped under pressure and refuse to hide behind tickets."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <HolographicCard intensity={6} glowColor="34,211,238">
              <div className="relative flex flex-col gap-5 p-8 md:p-10">
                <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                  Mission
                </h2>
                <p className="text-base leading-relaxed text-slate-400 md:text-lg">
                  Empower organizations to launch differentiated digital products — with reliability,
                  accessibility, and measurable outcomes baked into every release.
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
              <div className="relative flex flex-col gap-5 p-8 md:p-10">
                <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                  Vision
                </h2>
                <p className="text-base leading-relaxed text-slate-400 md:text-lg">
                  Become the default engineering partner for teams who ship AI-native experiences
                  without sacrificing trust — security, observability, and craft on day one.
                </p>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-10 md:gap-14">
          <SectionHeading
            eyebrow="Timeline"
            title="A steady arc — no overnight hype."
            subtitle="Milestones from our journey building resilient platforms with partner teams across industries."
          />

          <div className="relative mx-auto w-full max-w-3xl">
            {/* animated vertical line */}
            <div
              ref={lineRef}
              className="absolute left-[11px] top-2 hidden h-[calc(100%-16px)] w-px origin-top bg-gradient-to-b from-cyan-400/80 via-violet-400/70 to-pink-400/80 md:block"
              style={{ transform: "scaleY(0)" }}
            />

            <ul ref={timelineRef} className="flex flex-col gap-10 md:gap-12">
              {milestones.map((m, i) => (
                <li
                  key={m.year}
                  className="timeline-item relative grid gap-4 opacity-0 md:grid-cols-[92px_1fr] md:gap-10"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-start gap-4 md:block">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-400/70 bg-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.5)] md:mx-auto" />
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300 md:text-center">
                      {m.year}
                    </span>
                  </div>
                  <HolographicCard
                    intensity={5}
                    glowColor={m.glow}
                    className={`opacity-${i === 0 ? 100 : 100}`}
                  >
                    <div className="relative flex flex-col gap-2 p-6 md:p-8">
                      <h3 className="font-heading text-lg font-semibold text-white md:text-xl">
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-400 md:text-[15px]">
                        {m.body}
                      </p>
                    </div>
                  </HolographicCard>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
