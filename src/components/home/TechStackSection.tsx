"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stack = [
  { label: "Next.js", hover: "hover:bg-slate-900 hover:text-white hover:border-slate-900" },
  { label: "TypeScript", hover: "hover:bg-blue-600 hover:text-white hover:border-blue-600" },
  { label: "Kubernetes", hover: "hover:bg-cyan-600 hover:text-white hover:border-cyan-600" },
  { label: "Terraform", hover: "hover:bg-violet-600 hover:text-white hover:border-violet-600" },
  { label: "PostgreSQL", hover: "hover:bg-sky-600 hover:text-white hover:border-sky-600" },
  { label: "Redis", hover: "hover:bg-red-600 hover:text-white hover:border-red-600" },
  { label: "AWS · GCP", hover: "hover:bg-amber-500 hover:text-white hover:border-amber-500" },
  { label: "GraphQL · tRPC", hover: "hover:bg-pink-600 hover:text-white hover:border-pink-600" },
  { label: "OpenTelemetry", hover: "hover:bg-emerald-600 hover:text-white hover:border-emerald-600" },
  { label: "TensorFlow · PyTorch", hover: "hover:bg-orange-600 hover:text-white hover:border-orange-600" },
  { label: "Figma", hover: "hover:bg-fuchsia-600 hover:text-white hover:border-fuchsia-600" },
];

export function TechStackSection() {
  const pillsRef = useRef<(HTMLLIElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      pillsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: i * 0.04,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-slate-50 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <Container className="flex flex-col gap-12 md:gap-14">
        <SectionHeading
          theme="light"
          eyebrow="Engineering"
          title="Battle-tested stack. Opinionated where it matters."
          subtitle="We choose boring-at-scale primitives — then tune obsessively for latency, resilience, and developer velocity."
        />
        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 md:gap-4">
          {stack.map((item, i) => (
            <li
              key={item.label}
              ref={(el) => {
                pillsRef.current[i] = el;
              }}
              style={{ opacity: 0 }}
              className={`group relative cursor-default overflow-hidden rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-700 shadow-sm transition-all duration-300 ${item.hover} md:text-sm`}
            >
              <span className="relative">{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
