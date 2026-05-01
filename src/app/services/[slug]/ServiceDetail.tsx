"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { Button } from "@/components/ui/Button";
import { services, getService, type ServiceSlug } from "@/lib/services";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug);
  if (!service) return null;
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-x-hidden bg-white py-8 md:py-14 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(34,211,238,0.10),transparent_60%)]"
        />
        <Container className="relative flex flex-col gap-10 lg:grid lg:grid-cols-[1.06fr_minmax(0,0.96fr)] lg:items-start lg:gap-14 xl:gap-16">
          <motion.div initial="hidden" animate="show" variants={fade} className="flex flex-col items-start gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-cyan-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All services
            </Link>
            <div className="flex items-center gap-3">
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${service.iconBg}`}>
                <service.icon className="h-5 w-5" aria-hidden />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">{service.eyebrow}</span>
            </div>
            <h1 className="font-heading flex max-w-3xl flex-col gap-2 text-balance pb-[0.12em] text-3xl font-semibold tracking-tight text-slate-900 sm:gap-2.5 sm:text-4xl md:gap-3 md:text-5xl lg:text-[3.25rem] lg:leading-[1.4] md:leading-[1.42] sm:leading-[1.44] leading-normal">
              <span className="block pb-[0.06em]">{service.title}.</span>
              <span className="gradient-text-animated block pb-[0.08em]">{service.tagline}</span>
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">{service.description}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Button href="/contact">
                Start a project <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/portfolio" variant="outline">
                See related work
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fade}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden min-h-[280px] w-full overflow-hidden rounded-[1.85rem] border border-teal-100/90 bg-[linear-gradient(145deg,#ffffff_0%,#eefbff_52%,#f4f8ff_100%)] shadow-[0_52px_120px_-74px_rgba(15,23,42,0.18)] lg:block"
            aria-hidden
          >
            <div className="mesh-blob-a absolute -left-12 top-[8%] h-48 w-48 rounded-full bg-cyan-200/55 blur-[48px]" />
            <div className="mesh-blob-b absolute -right-14 bottom-[4%] h-52 w-52 rounded-full bg-violet-200/45 blur-[52px]" />
            <div className="relative flex h-full min-h-[280px] flex-col justify-end p-8">
              <div className="rounded-2xl border border-white/90 bg-white/88 p-5 shadow-lg backdrop-blur-md">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-700">Live blueprint</p>
                <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-slate-100 to-white ring-1 ring-slate-200/90" />
                <div className="mt-4 flex gap-2">
                  <span className="h-9 flex-[1] rounded-lg bg-teal-100/90" />
                  <span className="h-9 w-16 rounded-lg bg-indigo-100/90" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-5 rounded-2xl border border-slate-200/92 bg-white/98 p-5 shadow-[0_26px_80px_-62px_rgba(15,23,42,0.15)] lg:col-span-2 lg:gap-6 lg:p-8"
          >
            {service.outcomes.map((o) => (
              <div
                key={o.label}
                className="flex min-w-[140px] flex-1 flex-col items-center gap-1 text-center sm:min-w-[160px]"
              >
                <span className="font-heading text-xl font-bold text-slate-900 md:text-2xl">{o.value}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 md:text-xs">{o.label}</span>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="relative bg-slate-50 py-8 md:py-14 lg:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <Container className="flex flex-col gap-7">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">What we offer</span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2.25rem]">
              Structured delivery across design, build, and launch surfaces.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2">
            {service.capabilities.map((c) => (
              <motion.div
                key={c.title}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                <HolographicCard intensity={4} glowColor={service.glow}>
                  <div className="flex h-full flex-col gap-3 p-5 md:p-7">
                    <h3 className="font-heading text-lg font-semibold text-slate-900">{c.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{c.body}</p>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <CheckCircle2 className={`h-5 w-5 shrink-0 ${service.accent}`} aria-hidden />
                <span className="text-sm leading-relaxed text-slate-700">{b}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section className="relative bg-white py-8 md:py-14 lg:py-16">
        <Container className="flex flex-col gap-7">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">Process</span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2.25rem]">
              Design → develop → deploy — with measurable gates at every hand-off.
            </h2>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p) => (
              <motion.li
                key={p.step}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">{p.step}</span>
                <h3 className="font-heading text-base font-semibold text-slate-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{p.body}</p>
              </motion.li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Why choose us */}
      <section className="relative border-y border-slate-200/80 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_52%,#f3fbf9_100%)] py-10 md:py-[4.75rem]">
        <Container className="flex flex-col gap-9">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">
              Why choose CodeXorr
            </span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2.25rem]">
              Benefits stitched into delivery — not slide filler.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.whyChooseUs.map((w) => (
              <motion.article
                key={w.title}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-44px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.28 }}
                className="flex flex-col gap-3 rounded-2xl border border-white/95 bg-white/94 p-6 shadow-[0_28px_76px_-58px_rgba(15,23,42,0.18)] backdrop-blur-sm"
              >
                <h3 className="font-heading text-lg font-semibold text-slate-900">{w.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{w.body}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* Stack */}
      <section className="relative bg-slate-50 py-8 md:py-14 lg:py-16">
        <Container className="flex flex-col gap-6">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">Stack</span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2.25rem]">
              Tools we reach for in this practice.
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2 md:gap-3">
            {service.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-700 shadow-sm md:px-5 md:py-2.5 md:text-xs md:tracking-[0.18em]"
              >
                {tool}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative bg-white py-8 md:py-14 lg:py-16">
        <Container className="flex flex-col gap-7">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">FAQ</span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2.25rem]">
              Common questions before kickoff.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.faq.map((f) => (
              <div key={f.q} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-heading text-base font-semibold text-slate-900">{f.q}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="relative bg-slate-50 py-8 md:py-14 lg:py-16">
          <Container className="flex flex-col gap-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Related services
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/services/${r.slug}`} className="block h-full">
                  <HolographicCard className="h-full" intensity={4} glowColor={r.glow}>
                    <div className="flex h-full flex-col gap-3 p-5 md:p-6">
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${r.iconBg}`}>
                        <r.icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-slate-900">{r.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600">{r.tagline}</p>
                      <span className={`mt-auto inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-[0.18em] ${r.accent}`}>
                        Open <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
                  </HolographicCard>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="relative bg-white py-8 md:py-14 lg:py-16">
        <Container>
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center md:p-10">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Ready to engage on {service.title.toLowerCase()}?
            </h2>
            <p className="max-w-xl text-sm text-slate-600 md:text-base">
              Tell us your goals and constraints — we&apos;ll come back with architecture options, timelines, and a senior team.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button href="/contact">
                Book a discovery call <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/services" variant="outline">
                Explore other services
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
