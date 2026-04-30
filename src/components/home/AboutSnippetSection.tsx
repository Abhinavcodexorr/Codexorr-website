"use client";

import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/Parallax";

export function AboutSnippetSection() {
  return (
    <section className="relative overflow-x-hidden bg-slate-50 py-10 md:py-14 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_10%,rgba(167,139,250,0.10),transparent),radial-gradient(ellipse_50%_35%_at_10%_90%,rgba(34,211,238,0.10),transparent),radial-gradient(ellipse_42%_32%_at_50%_50%,rgba(52,211,153,0.06),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-200/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-200/25 to-transparent" />

      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0 self-start lg:pt-1">
            <SectionHeading
              align="left"
              eyebrow="About"
              title="We build technology that feels inevitable."
              subtitle="CodeXorr is a specialist studio for enterprise platforms — pairing architectural rigor with product intuition. From cloud foundations to AI copilots, we ship systems your teams operate with confidence."
            />
          </div>

          <FadeUp className="min-w-0">
            <HolographicCard intensity={5} glowColor="52,211,153">
              <div className="relative flex flex-col gap-5 p-6 md:p-10">
                <p className="text-base leading-relaxed text-slate-700 md:text-lg md:leading-relaxed">
                  Quality is non-negotiable: observability-first builds, accessible interfaces, and migrations that never strand
                  your users.
                </p>
                <ul className="flex flex-col gap-3 text-sm leading-relaxed text-slate-600">
                  {[
                    { color: "bg-emerald-500", text: "Embedded solution architects on every engagement." },
                    { color: "bg-teal-500", text: "Weekly demos — zero black-box delivery." },
                    { color: "bg-pink-500", text: "Playbooks for reliability, security, and compliance readiness." },
                  ].map((item) => (
                    <li key={item.text} className="flex gap-3">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.color}`} />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                  <Button href="/about">Our story</Button>
                  <Button href="/contact" variant="outline">
                    Talk to us
                  </Button>
                </div>
              </div>
            </HolographicCard>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
