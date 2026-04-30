"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactContent() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="flex flex-1 flex-col py-8 md:py-12 lg:py-16">
      <Container className="flex flex-col gap-8 md:gap-10 lg:gap-12">
        <SectionHeading
          eyebrow="Contact"
          title="Tell us what you're building — we'll meet you with clarity."
          subtitle="Expect a thoughtful reply within two business days: suggested architecture slices, collaboration options, and next steps."
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <HolographicCard intensity={5} glowColor="34,211,238">
              <div className="relative p-5 sm:p-8 md:p-10">
                {sent ? (
                  <div className="flex flex-col items-center gap-5 py-8 text-center">
                    <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
                    <h3 className="font-heading text-2xl font-semibold text-slate-900">Brief received!</h3>
                    <p className="max-w-xs text-slate-600">
                      We&apos;ll review and reply within two business days with a sane plan.
                    </p>
                    <Button href="/services" variant="outline">
                      Explore our services
                    </Button>
                  </div>
                ) : (
                  <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                        Name
                        <input
                          required
                          name="name"
                          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                          placeholder="Jordan Avery"
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                        Work email
                        <input
                          required
                          type="email"
                          name="email"
                          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                          placeholder="you@company.com"
                        />
                      </label>
                    </div>
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                      Company
                      <input
                        name="company"
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                        placeholder="Northshore Analytics"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                      Project outline
                      <textarea
                        required
                        name="message"
                        rows={5}
                        className="resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                        placeholder="Roadmap, constraints, timelines, success metrics..."
                      />
                    </label>
                    <div className="pt-1">
                      <Button type="submit">Send message</Button>
                    </div>
                  </form>
                )}
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.07 }}
            className="flex flex-col gap-8"
          >
            <HolographicCard intensity={5} glowColor="167,139,250">
              <div className="relative flex flex-col gap-5 p-5 sm:p-8 md:p-10">
                <h2 className="font-heading text-lg font-semibold text-slate-900 md:text-xl">Studio coordinates</h2>
                <div className="flex flex-col gap-5 text-sm text-slate-600">
                  <div className="flex gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
                    <div>
                      <p className="font-medium text-slate-900">Global remote-first</p>
                      <p className="mt-1 leading-relaxed">
                        Pods in San Francisco · Toronto · Berlin · Singapore — aligned scheduling for every partner.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
                    <a
                      href="mailto:hello@codexorr.com"
                      className="font-medium text-cyan-700 transition-colors hover:text-cyan-900"
                    >
                      hello@codexorr.com
                    </a>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
                    <span className="text-slate-700">+1 (415) 555-0198</span>
                  </div>
                </div>
              </div>
            </HolographicCard>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[16/11] w-full bg-slate-100">
                <iframe
                  title="Map — San Francisco"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4318%2C37.7617%2C-122.3896%2C37.7984&layer=mapnik&marker=37.7801%2C-122.4107"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
