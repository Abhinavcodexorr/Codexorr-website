"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services";
import { cn } from "@/lib/cn";

const cardReveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ServicesContent() {
  return (
    <div className="relative flex flex-1 flex-col bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] py-10 md:py-14 lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <Container className="flex flex-col gap-10 md:gap-12 lg:gap-[4.75rem]">
        <SectionHeading
          eyebrow="Services"
          title="Architecting measurable digital outcomes across every frontier."
          subtitle="Web, native mobile, AI & ML, orchestration automation, cloud reliability, disciplined UX/UI, actionable analytics, strategic discovery — distilled from years powering ventures, regulated programs, and marketplaces."
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((s) => (
            <motion.article
              key={s.slug}
              variants={cardReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px" }}
            >
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="h-full">
                <Link href={`/services/${s.slug}`} className="group block h-full outline-none">
                  <div
                    className={cn(
                      "relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-slate-200/92 bg-white/98 p-7 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.2)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 md:p-10",
                      "hover:border-teal-200 hover:shadow-[0_52px_120px_-62px_rgba(20,184,166,0.16)]",
                    )}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `radial-gradient(120% 80% at -5% -5%,rgba(${s.glow},0.11),transparent 58%)` }}
                    />

                    <div className="relative flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-sm ${s.iconBg}`}>
                          <s.icon className="h-5 w-5" aria-hidden />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-teal-700">{s.eyebrow}</p>
                          <h2 className="font-heading mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
                            {s.title}
                          </h2>
                        </div>
                      </div>
                      <p className="text-[15px] leading-relaxed text-slate-600 md:text-[1.05rem]">{s.summary}</p>
                      <ul className="mt-1 flex flex-col gap-2.5 border-t border-slate-100 pt-5">
                        {s.bullets.slice(0, 3).map((li) => (
                          <li key={li} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-teal-500 to-indigo-500" />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                      <span
                        className={cn(
                          "mt-auto inline-flex items-center gap-2 pt-4 text-[11px] font-semibold uppercase tracking-[0.2em]",
                          s.accent,
                        )}
                      >
                        View Details <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 py-6 text-center"
        >
          <p className="max-w-lg text-[15px] text-slate-600 md:text-[1.0625rem]">
            Need sequencing across lanes? Brief us holistically — we&apos;ll converge on a phased map with pragmatic trade-offs.
          </p>
          <Button href="/contact">
            Speak with architects <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}
