"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";

const NeuralNetworkHero = dynamic(
  () => import("./NeuralNetworkHero").then((m) => m.NeuralNetworkHero),
  {
    ssr: false,
    loading: () => (
      <div className="pointer-events-none absolute inset-0 min-h-full bg-transparent" aria-hidden />
    ),
  },
);

/**
 * WebGL layer only on md+ after confirm + in-view. Initial `desktop=false` matches SSR and avoids hydration mismatch.
 * HeroSection supplies its own CSS backdrop so mobile never depends on this layer.
 */
export function LazyNeuralHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  /* false on server & first paint — aligns with SSR; avoids showing wrong branch on phones */
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
      { rootMargin: "140px 0px 160px 0px", threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [desktop]);

  if (!desktop) {
    return null;
  }

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-0 min-h-full min-h-[min(100%,680px)] w-full">
      {shouldLoad ? (
        <Suspense fallback={<div className="min-h-full w-full bg-transparent" aria-hidden />}>
          <NeuralNetworkHero />
        </Suspense>
      ) : null}
    </div>
  );
}
