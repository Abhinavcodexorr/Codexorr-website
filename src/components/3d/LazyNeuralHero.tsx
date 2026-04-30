"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";

const NeuralNetworkHero = dynamic(
  () => import("./NeuralNetworkHero").then((m) => m.NeuralNetworkHero),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-[680px] w-full bg-slate-950/60" aria-hidden />,
  },
);

function MobileGradient() {
  return (
    <div
      className="h-full w-full min-h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(34,211,238,0.14),transparent),radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(15,23,42,0.95),#020617)]"
      aria-hidden
    />
  );
}

function DesktopPlaceholder() {
  return (
    <div
      className="h-full min-h-[680px] w-full bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgba(34,211,238,0.1),transparent),#020617]"
      aria-hidden
    />
  );
}

/**
 * Loads react-three-fiber only on md+ viewports and when the hero enters the viewport.
 * Mobile never downloads the three.js chunk.
 */
export function LazyNeuralHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (isDesktop !== true || !rootRef.current) return;
    const node = rootRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "180px 0px 220px 0px", threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [isDesktop]);

  if (isDesktop === false) {
    return <MobileGradient />;
  }

  return (
    <div ref={rootRef} className="h-full w-full">
      {isDesktop === true && shouldLoad ? (
        <Suspense fallback={<DesktopPlaceholder />}>
          <NeuralNetworkHero />
        </Suspense>
      ) : (
        <DesktopPlaceholder />
      )}
    </div>
  );
}
