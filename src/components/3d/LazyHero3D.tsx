"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

function Hero3DPlaceholder() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-teal-100/45 via-cyan-50/80 to-violet-100/45 ring-1 ring-teal-200/40"
    />
  );
}

const Hero3DCanvas = dynamic(() => import("@/components/3d/Hero3D"), {
  ssr: false,
  loading: Hero3DPlaceholder,
});

/** Desktop lg+: loads WebGL after hero enters viewport. */
export function LazyHero3D({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!desktop || !rootRef.current) return;
    const node = rootRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "100px 0px 120px 0px", threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [desktop]);

  if (!desktop) {
    return null;
  }

  return (
    <div ref={rootRef} className={cn("relative isolate h-full min-h-[300px] w-full overflow-hidden lg:min-h-[400px]", className)}>
      {shouldLoad ? (
        <Suspense fallback={<Hero3DPlaceholder />}>
          <Hero3DCanvas />
        </Suspense>
      ) : (
        <Hero3DPlaceholder />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_80px_rgba(255,255,255,0.72)]"
      />
    </div>
  );
}
